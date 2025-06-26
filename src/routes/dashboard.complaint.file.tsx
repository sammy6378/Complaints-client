import CreateComplaint from '@/dashboard/pages/CreateComplaint'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/complaint/file')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateComplaint />
}
