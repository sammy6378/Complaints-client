import {
  Home,
  FileText,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  FolderKanban,
  X,
} from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/dashboard/complaint/file', label: 'Complaints', icon: FolderKanban },
  { to: '/dashboard/my-complaints', label: 'My Complaints', icon: FileText },
  { to: '/dashboard/categories', label: 'Categories', icon: FileText },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/dashboard/help-center', label: 'Help Center', icon: HelpCircle },
  { to: '/dashboard/logout', label: 'Logout', icon: LogOut },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  // Function to check if a link is active
  const isLinkActive = (linkPath: string) => {
    if (linkPath === '/dashboard') {
      // For dashboard, check exact match or if we're on dashboard root
      return (
        location.pathname === '/dashboard' ||
        location.pathname === '/dashboard/'
      )
    }
    // For other links, check if current path starts with the link path
    return location.pathname.startsWith(linkPath)
  }

  return (
    <div
      className={`
        h-screen w-72 bg-[#ffffff] shadow-lg p-4 flex flex-col gap-6
        fixed lg:static lg:translate-x-0 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Mobile Close Button - only visible on mobile */}
      <div className="flex justify-between items-center lg:hidden">
        <span className="text-xl font-bold">Menu</span>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Brand */}
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Link>
        <span className="text-2xl font-bold">ResolveIt</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-4">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = isLinkActive(to)

          return (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium
                ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              onClick={() => {
                // Close sidebar on mobile when a link is clicked
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
              />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
