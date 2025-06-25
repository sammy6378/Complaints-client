import SignIn from '@/components/auth/Signin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <SignIn />
  </div>
}
