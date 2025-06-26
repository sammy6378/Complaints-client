import handleApiResponse from '@/lib/ApiResponse'

const baseUrl = 'https://resolveit.onrender.com/api/complaints?limit=50'
// const baseUrl = 'http://localhost:8000/api/complaints?limit=20'

type TComplaintData = {
  data: TComplaint[]
}

export interface TComplaint {
  complaint_id: string
  complaint_title: string
  complaint_description: string
  complaint_status: string
  priority: string
  location: string
  data: TComplaintData
}

// get complaints
export const getComplaints = async () => {
  const res = await fetch(baseUrl)
  await handleApiResponse(res)
  const data = await res.json()
  console.log('complaints', data)
  return data
}

// get one complaint
export const getComplaint = async (id: string) => {
  const res = await fetch(`${baseUrl}/${id}`)
  await handleApiResponse(res)
  return res.json()
}
