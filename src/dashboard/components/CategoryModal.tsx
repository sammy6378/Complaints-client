import { validateCategory } from '@/lib/validateCategory'
import { useForm } from '@tanstack/react-form'
import { AlertCircle, Plus, X } from 'lucide-react'
import type { z } from 'zod'
import { motion } from 'framer-motion'
import { usecreateCategory } from '../hooks/useCategories'
import { toast } from 'sonner'
import { useState } from 'react'

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

function CategoryModal({ onClose }: { onClose: () => void }) {
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [currentSubcategory, setCurrentSubcategory] = useState('')

  const create = usecreateCategory()

  const { Field, reset, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      category_name: '',
      description: '',
      sub_categories: [] as string[],
    },
    onSubmit: async ({ value }) => {
      // Include subcategories in the form data
      const formData = {
        ...value,
        sub_categories: subcategories,
      }

      const validate = validateCategory.safeParse(formData)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        toast.error('Please fix the validation errors')
        return
      }
      try {
        await create.mutateAsync(formData)
        toast.success('Category created successfully')
        reset()
        setSubcategories([])
        setCurrentSubcategory('')
        onClose()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Failed to create category')
      }
    },
  })

  const addSubcategory = () => {
    if (
      currentSubcategory.trim() &&
      !subcategories.includes(currentSubcategory.trim())
    ) {
      setSubcategories([...subcategories, currentSubcategory.trim()])
      setCurrentSubcategory('')
    }
  }

  const removeSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index))
  }

  const handleSubcategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSubcategory()
    }
  }
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.label}
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={config.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {field.state.meta.errors[0] && (
                      <div className="flex items-center mt-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {field.state.meta.errors[0]}
                      </div>
                    )}
                  </div>
                )}
              />
            ))}

            {/* Subcategories Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategories (Optional)
              </label>

              {/* Add Subcategory Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentSubcategory}
                  onChange={(e) => setCurrentSubcategory(e.target.value)}
                  onKeyPress={handleSubcategoryKeyPress}
                  placeholder="Enter subcategory name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSubcategory}
                  disabled={!currentSubcategory.trim()}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                    currentSubcategory.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Display Added Subcategories */}
              {subcategories.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 mb-2">
                    Added subcategories ({subcategories.length}):
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {subcategories.map((subcategory, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                      >
                        <span className="text-blue-800 text-sm font-medium">
                          {subcategory}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSubcategory(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Remove subcategory"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 mt-2">
                Press Enter or click Add to add a subcategory. You can add
                multiple subcategories.
              </div>
            </div>
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
