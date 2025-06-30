import { TPriority } from '@/types/complaints'
import { z } from 'zod'

export const validateComplaint = z.object({
  complaint_title: z.string().min(6, 'Title should be more than 6 characters'),
  complaint_description: z
    .string()
    .min(10, 'description must be more than 10 characters'),
  priority: z.enum(
    [TPriority.LOW, TPriority.MEDIUM, TPriority.HIGH, TPriority.CRITICAL],
    {
      errorMap: () => ({ message: 'Priority is required' }),
    },
  ),
  location: z.string().min(4, 'Location must be more than 4 characters'),
  category_id: z.string().min(1, 'Category is required'),
  sub_categories: z.array(z.string()).optional(),
})
