import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, Shield, X } from 'lucide-react'
import { pageVariants } from './Settings'

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new dashboard analytics feature.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Password Expiring Soon',
      message: 'Your password will expire in 7 days. Consider updating it.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      title: 'Failed Login Attempt',
      message: 'Someone tried to access your account from an unknown device.',
      time: '1 day ago',
      read: true,
    },
  ])

  const [selectedNotificationId, setSelectedNotificationId] = useState<
    number | null
  >(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filteredNotifications = notifications.filter((n) =>
    filter === 'all' ? true : filter === 'unread' ? !n.read : n.read,
  )

  const selectedNotification = notifications.find(
    (n) => n.id === selectedNotificationId,
  )

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    if (selectedNotificationId === id) setSelectedNotificationId(null)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />
      case 'error':
        return <X className="w-5 h-5 text-red-500" />
      case 'warning':
        return <Shield className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true })),
              )
            }
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Mark All Read
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4 border-r pr-4">
            <div className="flex space-x-2">
              {['all', 'unread', 'read'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => {
                    setSelectedNotificationId(notification.id)
                    if (!notification.read) markAsRead(notification.id)
                  }}
                  className={`
                    ${notification.read ? ' border-blue-300' : 'border border-gray-200'}
                    cursor-pointer p-3 rounded-lg border ${
                    notification.id === selectedNotificationId
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  } hover:bg-gray-50`}
                >
                  <div className="flex items-center space-x-2">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 rounded-lg border p-6 min-h-[200px]">
            {selectedNotification ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    {getNotificationIcon(selectedNotification.type)}
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedNotification.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => deleteNotification(selectedNotification.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700 mb-2">
                  {selectedNotification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedNotification.time}
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Select a notification to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
