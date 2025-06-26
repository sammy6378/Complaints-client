import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import {
  usedeleteComplaint,
  usegetCompaints,
  useupdateComplaint,
} from '@/dashboard/hooks/useComplaints'
import type { TComplaint } from '@/types/complaints'

function Complaints() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })
  const { data: complaints, isLoading, error } = usegetCompaints()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    { field: 'location', headerName: 'Location', width: 150 },
  ]

  // Extract the actual complaints array from the API response
  const complaintsData = complaints?.data?.data || []

  const rows = Array.isArray(complaintsData)
    ? complaintsData.map((complaint: TComplaint) => ({
        id: complaint.complaint_id,
        title: complaint.complaint_title,
        description: complaint.complaint_description,
        status: complaint.complaint_status,
        priority: complaint.priority,
        location: complaint.location,
      }))
    : []

  // delete complaint
  const deleteComplaint = usedeleteComplaint()

  // update complaint
  const updateComplaint = useupdateComplaint()

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='p-4'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          loading={isLoading}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.id}
        />
      </Paper>
    </div>
  )
}

export default Complaints
