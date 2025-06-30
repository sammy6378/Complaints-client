import { usecreateComplaint } from '@/dashboard/hooks/useComplaints'
import { validateComplaint } from '@/lib/validateComplaint'
import { TPriority } from '@/types/complaints'
import { useForm } from '@tanstack/react-form'
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import type { z } from 'zod'
import { usegetCategories } from '../hooks/useCategories'
import { useState } from 'react'

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
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  const saveComplaint = usecreateComplaint()
  const { data: categoriesResponse } = usegetCategories()
  const categoriesData = categoriesResponse?.data || []

  const [currentFormValues, setCurrentFormValues] = useState({
    complaint_title: '',
    complaint_description: '',
    location: '',
    priority: TPriority.LOW,
    category_id: '',
    sub_categories: [] as string[],
  })

  const { Field, reset, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      complaint_title: '',
      complaint_description: '',
      location: '',
      priority: TPriority.LOW,
      category_id: '',
      sub_categories: [] as string[],
    },
    onSubmit: async ({ value }) => {
      const validate = validateComplaint.safeParse(value)
      if (!validate.success) {
        console.error('Validation failed:', validate.error.issues)
        toast.error('Please fix the validation errors')
        return
      }
      try {
        // Remove sub_categories if it's empty to avoid sending empty array
        const submitData: any = { ...value }
        if (
          !submitData.sub_categories ||
          submitData.sub_categories.length === 0
        ) {
          const { sub_categories, ...dataWithoutSubcategories } = submitData
          await saveComplaint.mutateAsync(dataWithoutSubcategories)
        } else {
          await saveComplaint.mutateAsync(submitData)
        }

        toast.success('Complaint created successfully!')
        reset()
        setCurrentStep(1)
        setSelectedCategoryId('')
        setCurrentFormValues({
          complaint_title: '',
          complaint_description: '',
          location: '',
          priority: TPriority.LOW,
          category_id: '',
          sub_categories: [],
        })
      } catch (err) {
        console.error('Error creating complaint:', err)
        toast.error('Failed to create complaint. Please try again.')
      }
    },
  })

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${
              currentStep >= step
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }
          `}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`
              w-12 h-0.5 mx-2
              ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
            `}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Basic Information
      </h2>

      {fieldConfigs.map((config) => (
        <Field
          key={config.name as string}
          name={config.name}
          validators={{
            onChange: ({ value }) =>
              validateField(value, validateComplaint.shape[config.name]),
          }}
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {config.label}
              </label>
              <input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  setCurrentFormValues((prev) => ({
                    ...prev,
                    [config.name]: e.target.value,
                  }))
                }}
                placeholder={config.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      <Field
        name="priority"
        validators={{
          onChange: ({ value }) =>
            validateField(value, validateComplaint.shape.priority),
        }}
        children={(field) => {
          const priorities = [
            { label: 'Low', value: TPriority.LOW },
            { label: 'Medium', value: TPriority.MEDIUM },
            { label: 'High', value: TPriority.HIGH },
            { label: 'Critical', value: TPriority.CRITICAL },
          ]
          return (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex gap-2 flex-wrap">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    className={`px-4 py-2 rounded-md border font-medium transition-colors focus:outline-none ${
                      field.state.value === p.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      field.handleChange(p.value)
                      setCurrentFormValues((prev) => ({
                        ...prev,
                        priority: p.value,
                      }))
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {field.state.meta.errors[0] && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {field.state.meta.errors[0]}
                </div>
              )}
            </div>
          )
        }}
      />
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Category Selection
      </h2>

      <Field
        name="category_id"
        validators={{
          onChange: ({ value }) =>
            validateField(value, validateComplaint.shape.category_id),
        }}
        children={(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {categoriesData.map((category) => (
                <button
                  key={category.category_id}
                  type="button"
                  className={`p-4 text-left border rounded-lg transition-all ${
                    field.state.value === category.category_id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    field.handleChange(category.category_id)
                    setSelectedCategoryId(category.category_id)
                    setCurrentFormValues((prev) => ({
                      ...prev,
                      category_id: category.category_id,
                      sub_categories: [], // Reset subcategories when category changes
                    }))
                  }}
                >
                  <div className="font-medium">{category.category_name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </div>
                  {category.sub_categories &&
                    category.sub_categories.length > 0 && (
                      <div className="text-xs text-gray-500 mt-2">
                        {category.sub_categories.length} subcategories available
                      </div>
                    )}
                </button>
              ))}
            </div>
            {field.state.meta.errors[0] && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {field.state.meta.errors[0]}
              </div>
            )}
          </div>
        )}
      />
    </div>
  )

  const renderStep3 = () => {
    const selectedCategory = categoriesData.find(
      (c) => c.category_id === selectedCategoryId,
    )
    const availableSubcategories = selectedCategory?.sub_categories || []

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Subcategories (Optional)
        </h2>

        <Field
          name="sub_categories"
          children={(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subcategories (Optional)
              </label>
              {availableSubcategories.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-3">
                    You can select multiple subcategories that apply to your
                    complaint, or skip this step.
                  </div>

                  {/* Skip option */}
                  <div className="p-3 border rounded-lg border-gray-200 hover:border-gray-300 transition-all">
                    <button
                      type="button"
                      className={`w-full text-left ${
                        field.state.value.length === 0
                          ? 'text-blue-700'
                          : 'text-gray-700'
                      }`}
                      onClick={() => {
                        field.handleChange([])
                        setCurrentFormValues((prev) => ({
                          ...prev,
                          sub_categories: [],
                        }))
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${
                            field.state.value.length === 0
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {field.state.value.length === 0 && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">No Subcategory</div>
                          <div className="text-sm text-gray-600">
                            Proceed without selecting subcategories
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Subcategory options */}
                  <div className="grid grid-cols-1 gap-3">
                    {availableSubcategories.map((subcategory, index) => {
                      const isSelected = field.state.value.includes(subcategory)
                      return (
                        <div
                          key={`${selectedCategoryId}-${index}`}
                          className={`p-3 border rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            const currentSelection = field.state.value
                            let newSelection

                            if (isSelected) {
                              // Remove from selection
                              newSelection = currentSelection.filter(
                                (item) => item !== subcategory,
                              )
                            } else {
                              // Add to selection
                              newSelection = [...currentSelection, subcategory]
                            }

                            field.handleChange(newSelection)
                            setCurrentFormValues((prev) => ({
                              ...prev,
                              sub_categories: newSelection,
                            }))
                          }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="font-medium text-gray-900">
                              {subcategory}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {field.state.value.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 mb-1">
                        Selected Subcategories ({field.state.value.length}):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {field.state.value.map((subcategory, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {subcategory}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No subcategories available for the selected category.</p>
                  <p className="text-sm mt-1">
                    You can proceed to create your complaint.
                  </p>
                </div>
              )}
            </div>
          )}
        />

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">
            Review Your Complaint
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Title:</span>{' '}
              {currentFormValues.complaint_title || 'Not entered'}
            </div>
            <div>
              <span className="font-medium">Priority:</span>{' '}
              {currentFormValues.priority}
            </div>
            <div>
              <span className="font-medium">Location:</span>{' '}
              {currentFormValues.location || 'Not entered'}
            </div>
            <div>
              <span className="font-medium">Category:</span>{' '}
              {categoriesData.find(
                (c) => c.category_id === currentFormValues.category_id,
              )?.category_name || 'Not selected'}
            </div>
            {currentFormValues.sub_categories.length > 0 && (
              <div>
                <span className="font-medium">Subcategories:</span>{' '}
                {currentFormValues.sub_categories.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Create Complaint
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Follow the steps below to submit your complaint
        </p>

        {renderStepIndicator()}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-6 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      canSubmit
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-400 cursor-not-allowed text-gray-200'
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Complaint'}
                  </button>
                )}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateComplaint
