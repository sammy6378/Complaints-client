
import StatCard from '@/lib/statCard'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  User,
  ChevronRight,
  Star,
  Timer,
} from 'lucide-react'
import { useComplaintMetrics } from '../hooks/useComplaints'



// Activity Item Component
const ActivityItem = ({ icon, title, description, time, status }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div
      className={`p-2 rounded-full ${
        status === 'resolved'
          ? 'bg-green-100 text-green-600'
          : status === 'pending'
            ? 'bg-yellow-100 text-yellow-600'
            : status === 'in-progress'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600'
      }`}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600 truncate">{description}</p>
    </div>
    <div className="text-right">
      <p className="text-xs text-gray-500">{time}</p>
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          status === 'resolved'
            ? 'bg-green-100 text-green-800'
            : status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'in-progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    </div>
  </motion.div>
)

// Quick Action Card Component
const QuickActionCard = ({ icon, title, description, onClick, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 ${color}`}
  >
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  </motion.div>
)

function UserDashboard() {
  const {total,pending,resolved,highPriority} = useComplaintMetrics()
  const stats = [
    {
      title: 'My Complaints',
      value: total,
      icon: <MessageSquare className="text-blue-600" />,
      color: 'border-blue-600',
      trend: 'up',
      trendValue: '+2 this month',
    },
    {
      title: 'Pending Review',
      value: pending,
      icon: <Clock className="text-yellow-600" />,
      color: 'border-yellow-600',
      trend: 'down',
      trendValue: '-1 from last week',
    },
    {
      title: 'Resolved',
      value: resolved,
      icon: <CheckCircle className="text-green-600" />,
      color: 'border-green-600',
      trend: 'up',
      trendValue: '+3 this month',
    },
    {
      title: 'High Priority',
      value: highPriority,
      icon: <AlertTriangle className="text-red-600" />,
      color: 'border-red-600',
    },
  ]

  const recentActivity = [
    {
      icon: <CheckCircle className="w-4 h-4" />,
      title: 'Complaint #1024 Resolved',
      description: 'Billing discrepancy issue has been resolved',
      time: '2 hours ago',
      status: 'resolved',
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      title: 'New Response Received',
      description: 'Support team responded to complaint #1023',
      time: '4 hours ago',
      status: 'in-progress',
    },
    {
      icon: <FileText className="w-4 h-4" />,
      title: 'Complaint Submitted',
      description: 'Product quality issue submitted for review',
      time: '1 day ago',
      status: 'pending',
    },
    {
      icon: <Star className="w-4 h-4" />,
      title: 'Feedback Requested',
      description: 'Please rate your experience with complaint #1022',
      time: '2 days ago',
      status: 'resolved',
    },
    {
      icon: <Timer className="w-4 h-4" />,
      title: 'Follow-up Required',
      description: 'Additional information needed for complaint #1021',
      time: '3 days ago',
      status: 'pending',
    },
  ]

  const quickActions = [
    {
      icon: <MessageSquare className="text-blue-600" />,
      title: 'Submit New Complaint',
      description: 'Report a new issue or concern',
      color: 'border-blue-600',
      onClick: () => console.log('Submit complaint'),
    },
    {
      icon: <FileText className="text-green-600" />,
      title: 'View All Complaints',
      description: 'See your complaint history',
      color: 'border-green-600',
      onClick: () => console.log('View complaints'),
    },
    {
      icon: <User className="text-purple-600" />,
      title: 'Update Profile',
      description: 'Manage your account settings',
      color: 'border-purple-600',
      onClick: () => console.log('Update profile'),
    },
  ]

  const complaintsByCategory = [
    { category: 'Billing', count: 5, color: 'bg-blue-500' },
    { category: 'Product Quality', count: 3, color: 'bg-green-500' },
    { category: 'Service', count: 2, color: 'bg-yellow-500' },
    { category: 'Technical', count: 2, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your complaints and activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {recentActivity.map((activity, idx) => (
                  <ActivityItem key={idx} {...activity} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, idx) => (
                  <QuickActionCard key={idx} {...action} />
                ))}
              </div>
            </motion.div>

            {/* Complaints by Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Complaints by Category
              </h3>
              <div className="space-y-3">
                {complaintsByCategory.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Average Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Timer className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Avg. Response Time</h3>
              </div>
              <p className="text-3xl font-bold">2.4 hours</p>
              <p className="text-blue-100 text-sm mt-1">
                15% faster than last month
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Monthly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              This Month's Overview
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>June 2025</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Total Submitted</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">67%</p>
              <p className="text-sm text-gray-600">Resolution Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserDashboard
