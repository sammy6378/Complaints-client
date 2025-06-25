import {
  Home,
  FileText,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  FolderKanban,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

const links = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/complaints', label: 'Complaints', icon: FolderKanban },
  { to: '/my-complaints', label: 'My Complaints', icon: FileText },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/help-center', label: 'Help Center', icon: HelpCircle },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/logout', label: 'Logout', icon: LogOut },
]

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 flex flex-col gap-6">
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
