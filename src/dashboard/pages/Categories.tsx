import { usedeleteCategory, usegetCategories, useGetCategoryMetrics } from '../hooks/useCategories'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import CategoryModal from '../components/CategoryModal'

function Categories() {
  const { data: categories, isPending, error } = usegetCategories()
  const {total} = useGetCategoryMetrics();
  const deleteCategory = usedeleteCategory()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState<null | {
    type: 'category'
    id?: string
  }>(null)


  const categoriesData = categories?.data || []

  // Filtered and paginated categories
  const filteredCategories = useMemo(() => {
    return categoriesData.filter((cat) =>
      cat.category_name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [categoriesData, search])

  const itemsPerPage = 20
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id)
      toast.success('Category deleted successfully')
    } catch (err: any) {
      console.error('Delete category error:', err)
      toast.error(err.message || 'Failed to delete category')
    }
  }

  const handleCreate = () => {
    setModal({ type: 'category' })
  }
  

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Error loading categories
          </h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">
          Browse and filter by complaint categories. Use the search below.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
          <input
            type="text"
            placeholder="Search categories..."
            className="mt-4 w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
          <button
            onClick={handleCreate}
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Create Category
          </button>
        </div>
      </div>

      {filteredCategories.length > 0 && (
        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Total Categories
            </h4>
            <p className="text-3xl font-bold text-blue-600">
              {total}
            </p>
          </div>
        </div>
      )}

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCategories.map((category) => {

            return (
              <div
                key={category.category_id}
                className={`
                  relative group p-6 rounded-xl border-2 bg-white 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                  transform hover:scale-[1.02] active:scale-[0.98]`}>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-gray-700">
                  {category.category_name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>

                <div className="absolute top-3 right-3 flex flex-row gap-2">
                  {/* Delete icon on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(category.category_id)
                    }}
                    title="Delete category"
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* No categories */}
      {!isPending && filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            No categories found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try changing the search term or check back later.
          </p>
        </div>
      )}

      {/* modal */}
      {modal?.type === 'category' && (
        <CategoryModal onClose={() => setModal(null)} />
      )}
    </div>
  )
}

export default Categories
