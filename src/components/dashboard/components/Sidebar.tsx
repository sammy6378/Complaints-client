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
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/dashboard/complaints', label: 'Complaints', icon: FolderKanban },
  { to: '/dashboard/my-complaints', label: 'My Complaints', icon: FileText },
  { to: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
  { to: '/dashboard/help-center', label: 'Help Center', icon: HelpCircle },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  { to: '/dashboard/logout', label: 'Logout', icon: LogOut },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`
        h-screen w-72 bg-[#455A64] text-white p-4 flex flex-col gap-6
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
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center px-3 py-2 rounded-md text-white hover:bg-gray-800 transition-colors"
            onClick={() => {
              // Close sidebar on mobile when a link is clicked
              if (window.innerWidth < 1024) {
                onClose()
              }
            }}
          >
            <Icon className="mr-2 h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
