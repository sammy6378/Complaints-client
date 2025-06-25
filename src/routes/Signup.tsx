import SignUp from '@/components/auth/Signup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <SignUp />
  </div>
}
