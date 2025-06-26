import Categories from '@/dashboard/pages/Categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Categories />
}
