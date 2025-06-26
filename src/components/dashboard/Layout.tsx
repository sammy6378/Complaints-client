import Sidebar from './components/Sidebar'
import TobBar from './components/TobBar'
import { useState } from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* TopBar */}
        <TobBar onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-x-hidden">{children}</div>
      </div>
    </div>
  )
}

export default Layout
