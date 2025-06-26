import {
  ChevronRight,
  CreditCard,
  MessageCircle,
  Search,
  Shield,
  Smartphone,
  User,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { pageVariants } from './Settings'
import { useState } from 'react'

export const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <User className="w-6 h-6" />,
      articles: [
        'How to create an account',
        'Setting up your profile',
        'First steps guide',
      ],
    },
    {
      title: 'Account & Security',
      icon: <Shield className="w-6 h-6" />,
      articles: [
        'Password security',
        'Two-factor authentication',
        'Account recovery',
      ],
    },
    {
      title: 'Billing & Payments',
      icon: <CreditCard className="w-6 h-6" />,
      articles: ['Payment methods', 'Billing history', 'Refund policy'],
    },
    {
      title: 'Technical Support',
      icon: <Smartphone className="w-6 h-6" />,
      articles: ['Troubleshooting', 'App not working', 'Contact support'],
    },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-6"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Help Center</h1>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {helpCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <button
                    key={articleIndex}
                    className="flex items-center justify-between w-full p-2 text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <span>{article}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <button className="flex items-center space-x-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
