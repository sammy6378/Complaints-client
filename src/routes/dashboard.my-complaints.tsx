import Complaints from '@/dashboard/pages/Complaints'
import { usegetComplaint } from '@/dashboard/hooks/useComplaints'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/my-complaints')({
  component: RouteComponent,
})

function RouteComponent() {
  // const getComplaints = usegetComplaint();
  return (
    <div>
      <Complaints />
    </div>
  )
}
