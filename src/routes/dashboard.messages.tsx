import { NotificationsPage } from '@/dashboard/pages/Messages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><NotificationsPage /></div>
}
