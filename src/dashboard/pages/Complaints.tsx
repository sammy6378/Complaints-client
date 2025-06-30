import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { LayoutGrid, Table } from 'lucide-react'
import ComplaintsGrid from '../components/ComplaintsGrid'
import {
  usegetCompaints,
} from '@/dashboard/hooks/useComplaints'
import type { TComplaint } from '@/types/complaints'

function Complaints() {
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  })
  const { data: complaints, isLoading, error } = usegetCompaints()

  const complaintsData = complaints?.data || []

  const rows = complaintsData.map((complaint: TComplaint) => ({
    id: complaint.complaint_id,
    title: complaint.complaint_title,
    description: complaint.complaint_description,
    status: complaint.complaint_status,
    priority: complaint.priority,
    location: complaint.location,
  }))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 120 },
    { field: 'location', headerName: 'Location', width: 150 },
  ]

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Complaints</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-full ${
              view === 'table'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Table View"
          >
            <Table className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-full ${
              view === 'grid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="Card/Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'table' ? (
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
      ) : (
        <ComplaintsGrid complaints={complaintsData} isLoading={isLoading} />
      )}
    </div>
  )
}

export default Complaints
