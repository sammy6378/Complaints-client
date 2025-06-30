import {
  Pencil,
  Trash2,
  MapPin,
  AlertTriangle,
  Flag,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import type { TComplaint } from '@/types/complaints'
import { usedeleteComplaint } from '@/dashboard/hooks/useComplaints'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Route } from '@/routes/dashboard.my-complaints.$complaintId'

type Props = {
  complaints: TComplaint[]
  isLoading: boolean
}

const statusIcons = {
  pending: <Clock className="w-4 h-4" />,
  resolved: <CheckCircle className="w-4 h-4" />,
  rejected: <XCircle className="w-4 h-4" />,
  in_progress: <Clock className="w-4 h-4" />,
}

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
}

const statusColors = {
  pending: 'text-yellow-600',
  resolved: 'text-green-600',
  rejected: 'text-red-600',
  in_progress: 'text-blue-600',
}

function ComplaintsGrid({ complaints, isLoading }: Props) {
  const deleteComplaint = usedeleteComplaint()

  const handleDelete = async (id: string) => {
    try {
      await deleteComplaint.mutateAsync(id)
      toast.success('Complaint deleted successfully')
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete complaint')
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg w-full" />
          ))
        : complaints.map((complaint) => (
            <div
              key={complaint.complaint_id}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 relative group transition-all hover:shadow-md hover:border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {complaint.complaint_title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {complaint.complaint_description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      'flex items-center gap-1',
                      statusColors[
                        complaint.complaint_status as keyof typeof statusColors
                      ] || 'text-gray-600',
                    )}
                  >
                    {statusIcons[
                      complaint.complaint_status as keyof typeof statusIcons
                    ] || <Flag className="w-4 h-4" />}
                    <span className="capitalize">
                      {complaint.complaint_status.replace('_', ' ')}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      'flex items-center gap-1',
                      priorityColors[
                        complaint.priority as keyof typeof priorityColors
                      ] || 'text-gray-600',
                    )}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="capitalize">{complaint.priority}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{complaint.location}</span>
                </div>
              </div>
              {/* view activities */}
              <div className="mt-4">
                <Link
                  to={Route.to}
                  params={{ complaintId: complaint.complaint_id }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  <Flag className="w-4 h-4" />
                  View Activity
                </Link>
              </div>

              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-gray-100">
                <button
                  title="Edit complaint"
                  onClick={() => {
                    toast.info('Open update modal here')
                    // TODO: trigger modal
                  }}
                  className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  title="Delete complaint"
                  onClick={() => handleDelete(complaint.complaint_id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
    </div>
  )
}

export default ComplaintsGrid
