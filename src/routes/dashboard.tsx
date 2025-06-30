import Layout from '@/dashboard/Layout'
import { authStore } from '@/store/store'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({location}) =>{
    const isAuthenticated = authStore.state.isAuthenticated
    if(!isAuthenticated) {
      throw redirect({
        to: '/Signin',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
