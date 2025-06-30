import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Check,
  Shield,
  X,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react'
import { pageVariants } from './Settings'
import {
  usegetALLMessages,
  useMarkMessageAsRead,
  useDeleteMessage,
} from '../hooks/useNotifications'
import { Type } from '@/types/notifications'
import { Skeleton } from '@/components/ui/skeleton'
import '../../styles.css'

export const NotificationsPage = () => {
  const { data: messagesResponse, isLoading, error } = usegetALLMessages()
  const markAsReadMutation = useMarkMessageAsRead()
  const deleteMessageMutation = useDeleteMessage()

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  )
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  // Extract messages from API response
  const messages = messagesResponse?.data || []

  // Filter messages based on selected filter
  const filteredMessages = messages.filter((m) =>
    filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read,
  )

  const selectedMessage = messages.find((m) => m.id === selectedMessageId)

  const markAsRead = async (id: string) => {
    try {
      await markAsReadMutation.mutateAsync(id)
    } catch (error) {
      console.error('Failed to mark message as read:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await deleteMessageMutation.mutateAsync(id)
      if (selectedMessageId === id) setSelectedMessageId(null)
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const markAllAsRead = async () => {
    const unreadMessages = messages.filter((m) => !m.is_read)
    try {
      await Promise.all(
        unreadMessages.map((m) => markAsReadMutation.mutateAsync(m.id)),
      )
    } catch (error) {
      console.error('Failed to mark all messages as read:', error)
    }
  }

  const getMessageIcon = (type: Type) => {
    switch (type) {
      case Type.SYSTEM:
        return <Check className="w-5 h-5 text-green-500" />
      case Type.COMPLAINT:
        return <MessageSquare className="w-5 h-5 text-blue-500" />
      case Type.FEEDBACK:
        return <Bell className="w-5 h-5 text-blue-500" />
      case Type.WARNING:
        return <Shield className="w-5 h-5 text-yellow-500" />
      case Type.ALERT:
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    )

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6 h-full"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button
            onClick={markAllAsRead}
            disabled={isLoading || markAsReadMutation.isPending}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {markAsReadMutation.isPending ? 'Marking...' : 'Mark All Read'}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Failed to load messages. Please try again later.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Sidebar - Scrollable Message List */}
          <div className="space-y-4 border-r pr-4 flex flex-col min-h-0">
            <div className="flex space-x-2 flex-shrink-0">
              {['all', 'unread', 'read'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Scrollable Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[calc(100vh-200px)] hidden-scrollbar">              
              {isLoading ? (
                // Loading Skeleton
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="w-5 h-5 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No messages found</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={() => {
                        setSelectedMessageId(message.id)
                        if (!message.is_read) markAsRead(message.id)
                      }}
                      className={`
                        cursor-pointer p-3 rounded-lg border transition-all duration-200
                        ${!message.is_read ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}
                        ${
                          message.id === selectedMessageId
                            ? 'ring-2 ring-blue-500 border-blue-500'
                            : 'hover:bg-gray-50 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getMessageIcon(message.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p
                              className={`font-medium truncate ${!message.is_read ? 'text-gray-900' : 'text-gray-700'}`}
                            >
                              {message.title}
                            </p>
                            {!message.is_read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {message.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
          {/* Main Content - Scrollable Details */}
          <div className="md:col-span-2 rounded-lg border flex flex-col overflow-hidden">
            {selectedMessage ? (
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    {getMessageIcon(selectedMessage.type)}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedMessage.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    disabled={deleteMessageMutation.isPending}
                    className="text-red-500 hover:bg-red-100 p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Message Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Replies Section */}
                  {selectedMessage.replies &&
                    selectedMessage.replies.length > 0 && (
                      <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Replies
                        </h3>
                        <div className="space-y-4">
                          {selectedMessage.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <p className="text-gray-700">{reply.message}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                {formatDate(reply.created_at)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* Read Status Indicator */}
                <div className="flex-shrink-0 mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${selectedMessage.is_read ? 'bg-gray-400' : 'bg-blue-500'}`}
                    ></div>
                    <span className="text-sm text-gray-500">
                      {selectedMessage.is_read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">
                    Select a message to view details
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Choose from the messages on the left to read the full
                    content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
