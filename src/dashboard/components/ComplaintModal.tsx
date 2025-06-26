// components/EditComplaintModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import type { TComplaint } from '@/dashboard/services/complaints'

type EditComplaintModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: Partial<TComplaint>) => void
  complaint: TComplaint | null
}

export function EditComplaintModal({
  open,
  onClose,
  onSubmit,
  complaint,
}: EditComplaintModalProps) {
  const [formData, setFormData] = useState({
    complaint_title: '',
    complaint_description: '',
    priority: '',
    location: '',
  })

  useEffect(() => {
    if (complaint) {
      setFormData({
        complaint_title: complaint.complaint_title,
        complaint_description: complaint.complaint_description,
        priority: complaint.priority,
        location: complaint.location,
      })
    }
  }, [complaint])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="complaint_title"
            value={formData.complaint_title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Textarea
            name="complaint_description"
            value={formData.complaint_description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            placeholder="Priority"
          />
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
