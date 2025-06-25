import Layout from '@/components/dashboard/Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Layout />
  </div>
}
