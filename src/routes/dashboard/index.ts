import { createFileRoute } from '@tanstack/react-router'
import Stats from '@/dashboard/pages/Stats'

export const Route = createFileRoute('/dashboard/')({
  component: Stats,
})
