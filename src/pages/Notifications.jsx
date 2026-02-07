import React, { useState } from 'react'
import { Bell, Check, Trash2, Calendar, FileText, Users } from 'lucide-react'
import Header from '../components/Header'

function Notifications() {
  const [filter, setFilter] = useState('all') // all, unread, read

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'session',
      title: 'New session completed',
      message: 'SOAP note generated for Malik Fernando',
      time: '2 hours ago',
      read: false,
      icon: Calendar
    },
    {
      id: '2',
      type: 'patient',
      title: 'New patient added',
      message: 'Shiman Perera has been added to your patient list',
      time: '5 hours ago',
      read: false,
      icon: Users
    },
    {
      id: '3',
      type: 'soap',
      title: 'SOAP note updated',
      message: 'You edited the SOAP note for Ibrahim Hassan',
      time: '1 day ago',
      read: true,
      icon: FileText
    },
    {
      id: '4',
      type: 'session',
      title: 'Session reminder',
      message: 'Follow-up session with Aisha Khan tomorrow at 10:00 AM',
      time: '2 days ago',
      read: true,
      icon: Bell
    },
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([])
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="animate-fadeIn w-full">
      <Header 
        title="Notifications" 
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
      />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* Filter Tabs + Actions */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 p-3 xs:p-4 border-b border-gray-200">
            
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap text-xs xs:text-sm
                          ${filter === 'all' 
                            ? 'bg-tecnot-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap text-xs xs:text-sm
                          ${filter === 'unread' 
                            ? 'bg-tecnot-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap text-xs xs:text-sm
                          ${filter === 'read' 
                            ? 'bg-tecnot-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
              >
                Read ({notifications.length - unreadCount})
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 px-3 xs:px-4 py-2 bg-tecnot-primary 
                           text-white rounded-lg font-medium hover:bg-tecnot-dark 
                           transition-smooth text-xs xs:text-sm whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 px-3 xs:px-4 py-2 bg-red-500 
                           text-white rounded-lg font-medium hover:bg-red-600 
                           transition-smooth text-xs xs:text-sm whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm xs:text-base">
                  {filter === 'unread' ? 'No unread notifications' : 
                   filter === 'read' ? 'No read notifications' : 
                   'No notifications yet'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const Icon = notif.icon
                return (
                  <div
                    key={notif.id}
                    className={`p-4 xs:p-5 sm:p-6 hover:bg-gray-50 transition-smooth
                              ${!notif.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-3 xs:gap-4">
                      
                      {/* Icon */}
                      <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center 
                                    justify-center flex-shrink-0
                                    ${!notif.read ? 'bg-tecnot-primary' : 'bg-gray-200'}`}>
                        <Icon className={`w-5 h-5 xs:w-6 xs:h-6 ${!notif.read ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-semibold text-sm xs:text-base truncate
                                       ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-tecnot-primary rounded-full flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-xs xs:text-sm text-gray-600 mb-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] xs:text-xs text-gray-400">
                          {notif.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col xs:flex-row gap-2 flex-shrink-0">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-smooth"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-smooth"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 xs:w-5 xs:h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications