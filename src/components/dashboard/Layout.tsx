import Sidebar from './components/Sidebar'
import TobBar from './components/TobBar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* TopBar */}
        <TobBar />

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </div>
    </div>
  )
}

export default Layout
