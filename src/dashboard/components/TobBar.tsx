import { Button } from '@/components/ui/button'
import { Bell, User, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TopBarProps {
  onToggleSidebar: () => void
}

function TopBar({ onToggleSidebar }: TopBarProps) {
  const notificationCount = 3 // You can make this dynamic

  return (
    <div className="flex justify-between items-center gap-4 p-4 bg-white shadow-md z-10 lg:justify-end">
      {/* Mobile Menu Button - only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Spacer for mobile - pushes content to the right */}
      <div className="flex-1 lg:hidden" />

      {/* Right side content */}
      <div className="flex items-center gap-4">
        {/* Notification Bell with Count */}
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/user-avatar.png" alt="User" />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' onClick={() => console.log('Account Clicked')}>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Logout Clicked')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TopBar
