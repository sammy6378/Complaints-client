import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  MapPin,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { usegetComplaint } from '@/dashboard/hooks/useComplaints'
import { Route } from '@/routes/dashboard.my-complaints.$complaintId'

function ComplaintActivity() {
  const { complaintId } = Route.useParams()
  console.log('Viewing complaint:', complaintId)
  const {
    data: complaintResponse,
    isLoading,
    error,
  } = usegetComplaint(complaintId)

  // Extract complaint from API response
  const complaint = complaintResponse?.data

  console.log('complaint', complaint, complaintResponse)

  const statusConfig = {
    pending: {
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      color: 'bg-yellow-100 text-yellow-800',
    },
    in_progress: {
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-100 text-blue-800',
    },
    resolved: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      color: 'bg-green-100 text-green-800',
    },
    rejected: {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      color: 'bg-red-100 text-red-800',
    },
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/dashboard/complaints"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to complaints
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading complaint. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/dashboard/complaints"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to complaints
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-4 pt-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      ) : complaint ? (
        <>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {complaint.complaint_title}
              </h1>
              <p className="text-gray-600 mt-2">
                {complaint.complaint_description}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge
                  className={`${statusConfig[complaint.complaint_status as keyof typeof statusConfig]?.color} flex items-center gap-1`}
                >
                  {
                    statusConfig[
                      complaint.complaint_status as keyof typeof statusConfig
                    ]?.icon
                  }
                  {complaint.complaint_status.replace('_', ' ')}
                </Badge>

                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {complaint.location}
                </Badge>

                <Badge variant="outline" className="capitalize">
                  Priority: {complaint.priority}
                </Badge>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Complaint ID: {complaint.complaint_id}
            </div>
          </div>

          {/* Since TComplaint doesn't include activities/timeline data, show a simpler view */}
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Complaint Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Title
                    </label>
                    <p className="text-gray-900">{complaint.complaint_title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Description
                    </label>
                    <p className="text-gray-900">
                      {complaint.complaint_description}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <p className="text-gray-900">{complaint.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status & Priority
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Current Status
                    </label>
                    <div className="mt-1">
                      <Badge
                        className={`${statusConfig[complaint.complaint_status as keyof typeof statusConfig]?.color} flex items-center gap-1 w-fit`}
                      >
                        {
                          statusConfig[
                            complaint.complaint_status as keyof typeof statusConfig
                          ]?.icon
                        }
                        {complaint.complaint_status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Priority Level
                    </label>
                    <div className="mt-1">
                      <Badge variant="outline" className="capitalize w-fit">
                        {complaint.priority}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Complaint ID
                    </label>
                    <p className="text-gray-900 font-mono text-sm">
                      {complaint.complaint_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for future activity timeline */}
          <div className="mt-8 bg-gray-50 border rounded-lg p-6">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Activity Timeline
              </h3>
              <p className="text-gray-500">
                Activity tracking is not yet available. Check back later for
                updates on this complaint.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Complaint Not Found
          </h3>
          <p className="text-gray-500">
            The complaint you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/dashboard/complaints"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Complaints
          </Link>
        </div>
      )}
    </div>
  )
}

export default ComplaintActivity
