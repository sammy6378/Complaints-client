import { createFileRoute } from '@tanstack/react-router'
import ComplaintActivity from '@/dashboard/pages/ComplaintActivity'

export const Route = createFileRoute('/dashboard/my-complaints/$complaintId')({
  component: RouteComponent,
})

function RouteComponent() {
    return <ComplaintActivity />
}