
import Complaints from '@/components/dashboard/pages/Complaints'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/complaints')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container mx-auto p-4'>
      <Complaints />
    </div>
  )
 
  
}
