import { validateCategory } from '@/lib/validateCategory'
import { useForm } from '@tanstack/react-form'
import { AlertCircle } from 'lucide-react'
import type { z } from 'zod'
import { motion } from 'framer-motion'
import { usecreateCategory } from '../hooks/useCategories'
import { toast } from 'sonner'

type CategoryFormData = z.infer<typeof validateCategory>

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value)
  if (!result.success) {
    return result.error.issues[0]?.message || 'Validation error'
  }
  return undefined
}

const fieldConfigs = [
  {
    name: 'category_name' as keyof CategoryFormData,
    label: 'Category Name',
    placeholder: 'Enter Category Name',
    validator: (value: string) => {
      const result = validateCategory.shape.category_name.safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    },
  },
  {
    name: 'description' as keyof CategoryFormData,
    label: 'Description',
    placeholder: 'Enter Description',
    validator: (value: string) => {
      const result = validateCategory.shape.description.safeParse(value)
      return result.success ? undefined : result.error.issues[0]?.message
    },
  },
]

function CategoryModal({onClose}: { onClose: () => void }) {
    const create = usecreateCategory();
  const { Field, reset, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      category_name: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      const validate = validateCategory.safeParse(value)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        return
      }
      try {
        await create.mutateAsync(value)
        toast.success('Category created successfully')
        reset()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Failed to create category')
      }
    },
  })
  return (
    <div className="fixed inset-0 bg-[#546e7a93] bg-opacity-40 z-10 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white p-4 rounded shadow-lg"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Category
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit()
            }}
            className="space-y-4"
          >
            {fieldConfigs.map((config) => (
              <Field
                key={config.name as string}
                name={config.name}
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, validateCategory.shape[config.name]),
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
                    {isSubmitting ? 'Submitting...' : 'Create Category'}
                  </button>
                )}
              />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CategoryModal
