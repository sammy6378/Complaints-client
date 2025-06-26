import { SettingsPage } from '@/dashboard/pages/Settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><SettingsPage /></div>
}
