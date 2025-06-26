import { usecreateComplaint } from '@/dashboard/hooks/useComplaints'
import { validateComplaint } from '@/lib/validateComplaint'
import { TPriority } from '@/types/complaints'
import { useForm } from '@tanstack/react-form'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { z } from 'zod'

type ComplaintFormData = z.infer<typeof validateComplaint>

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message || 'Validation error'
  }
  return undefined
}

const fieldConfigs = [
  {
    name: 'complaint_title' as keyof ComplaintFormData,
    label: 'Complaint Title',
    placeholder: 'Enter Complaint Title',
    validator: (value: string) => {
      const result = validateComplaint.shape.complaint_title.safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    },
  },
  {
    name: 'complaint_description' as keyof ComplaintFormData,
    label: 'Complaint Description',
    placeholder: 'Enter Complaint Description',
    validator: (value: string) => {
      const result =
        validateComplaint.shape.complaint_description.safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    },
  },
  {
    name: 'location' as keyof ComplaintFormData,
    label: 'Location',
    placeholder: 'Enter Location',
    validator: (value: string) => {
      const result = validateComplaint.shape.location.safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    },
  },
]

function CreateComplaint() {
  const saveComplaint = usecreateComplaint()

  const { Field, reset, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      complaint_title: '',
      complaint_description: '',
      location: '',
      priority: TPriority.LOW, // Default priority
    },
    onSubmit: async ({ value }) => {
      const validate = validateComplaint.safeParse(value)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        return
      }
      try {
        await saveComplaint.mutateAsync(value)
        toast.success('Complaint created successfully!')
        reset()
      } catch (err) {
        console.error('Error creating complaint:', err)
        toast.error('Failed to create complaint. Please try again.')
      }
    },
  })

  return (
    <div className="min-h-screen bg-white shadow-lg rounded flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Complaint
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
        >
          <div>
            {fieldConfigs.map((config) => (
              <Field
                key={config.name as string}
                name={config.name}
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, validateComplaint.shape[config.name]),
                }}
                children={(field) => (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      {config.label}
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={config.placeholder}
                      className="w-full px-4 py-3 bg-white/10 border border-gray/20 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2"
                    />
                    {field.state.meta.errors[0] && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )}
              />
            ))}

            <Field
              name="priority"
              validators={{
                onChange: ({ value }) =>
                  validateField(value, validateComplaint.shape.priority),
                onBlur: ({ value }) =>
                  validateField(value, validateComplaint.shape.priority),
              }}
              children={(field) => {
                const priorities = [
                  { label: 'Low', value: TPriority.LOW },
                  { label: 'Medium', value: TPriority.MEDIUM },
                  { label: 'High', value: TPriority.HIGH },
                ]
                return (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {priorities.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          className={`px-4 py-2 rounded-md border font-medium transition-colors focus:outline-none ${
                            field.state.value === p.value
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                          onClick={() => field.handleChange(p.value)}
                          aria-pressed={field.state.value === p.value}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                    {field.state.meta.errors[0] && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )
              }}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    canSubmit
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed text-gray-200'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Create Complaint'}
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateComplaint
