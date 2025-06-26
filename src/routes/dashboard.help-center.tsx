import { HelpCenterPage } from '@/dashboard/pages/Helpcenter'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/help-center')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><HelpCenterPage /></div>
}
