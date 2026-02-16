// =============================================================================
// NOTIFICATIONS PAGE
// =============================================================================
//
// PURPOSE:
// - Display all notifications to the doctor
// - Filter by read/unread status
// - Mark notifications as read
// - Delete notifications
//
// NOTIFICATION TYPES:
// - New patient registered
// - Session completed
// - SOAP note generated
// - System updates
//
// BACKEND INTEGRATION:
// - Line 75: fetchNotifications() - GET /api/notifications
// - Line 105: markAsRead() - PUT /api/notifications/:id/read
// - Line 125: deleteNotification() - DELETE /api/notifications/:id
//
// =============================================================================

import React, { useState, useEffect } from 'react'
import { Bell, Check, Trash2, Filter } from 'lucide-react'
import Header from '../components/Header'

function Notifications() {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // All notifications
  const [notifications, setNotifications] = useState([])
  
  // Filter: 'all', 'unread', 'read'
  const [filter, setFilter] = useState('all')
  
  // Loading state
  const [loading, setLoading] = useState(true)

  // ==========================================================================
  // EFFECT: FETCH NOTIFICATIONS ON MOUNT
  // ==========================================================================
  useEffect(() => {
    fetchNotifications()
  }, [])

  // ==========================================================================
  // FUNCTION: FETCH NOTIFICATIONS
  // ==========================================================================
  /**
   * Fetches all notifications for current user
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: GET /api/notifications
   * - Expected response: Array of notification objects
   * - Sort by date descending (newest first)
   */
  const fetchNotifications = async () => {
    try {
      setLoading(true)

      // TODO BACKEND: Replace with actual API call
      // const response = await fetch('/api/notifications')
      // const data = await response.json()
      // setNotifications(data.results)

      // DUMMY DATA
      setNotifications([
        {
          id: '1',
          type: 'session_completed',
          title: 'Session Completed',
          message: 'Consultation with Malik Fernando has been completed.',
          timestamp: '2026-02-16T10:30:00',
          read: false
        },
        {
          id: '2',
          type: 'soap_generated',
          title: 'SOAP Note Generated',
          message: 'AI has generated SOAP note for patient Shiman Perera.',
          timestamp: '2026-02-16T09:15:00',
          read: false
        },
        {
          id: '3',
          type: 'new_patient',
          title: 'New Patient Registered',
          message: 'New patient Aisha Khan has been added to your records.',
          timestamp: '2026-02-15T16:45:00',
          read: true
        },
        {
          id: '4',
          type: 'system',
          title: 'System Update',
          message: 'TECNOT has been updated to version 1.0.1 with bug fixes.',
          timestamp: '2026-02-15T08:00:00',
          read: true
        },
        {
          id: '5',
          type: 'session_completed',
          title: 'Session Completed',
          message: 'Consultation with Ibrahim Hussain has been completed.',
          timestamp: '2026-02-14T14:20:00',
          read: true
        }
      ])

    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // ==========================================================================
  // FUNCTION: MARK AS READ
  // ==========================================================================
  /**
   * Marks a notification as read
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: PUT /api/notifications/:id/read
   * - Request body: { read: true }
   * - Expected response: Updated notification object
   */
  const markAsRead = async (id) => {
    try {
      // TODO BACKEND: Replace with actual API call
      // await fetch(`/api/notifications/${id}/read`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ read: true })
      // })

      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      )

    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  // ==========================================================================
  // FUNCTION: DELETE NOTIFICATION
  // ==========================================================================
  /**
   * Deletes a notification
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: DELETE /api/notifications/:id
   * - Expected response: { success: true }
   */
  const deleteNotification = async (id) => {
    if (!window.confirm('Delete this notification?')) return

    try {
      // TODO BACKEND: Replace with actual API call
      // await fetch(`/api/notifications/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })

      // Update local state
      setNotifications(prev => prev.filter(notif => notif.id !== id))

    } catch (error) {
      console.error('Error deleting notification:', error)
      alert('Failed to delete notification.')
    }
  }

  // ==========================================================================
  // FUNCTION: MARK ALL AS READ
  // ==========================================================================
  /**
   * Marks all notifications as read
   * 
   * BACKEND INTEGRATION:
   * - Endpoint: PUT /api/notifications/mark-all-read
   * - Expected response: { success: true }
   */
  const markAllAsRead = async () => {
    try {
      // TODO BACKEND: Replace with actual API call
      // await fetch('/api/notifications/mark-all-read', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })

      // Update local state
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      )

    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  // ==========================================================================
  // FILTERED NOTIFICATIONS
  // ==========================================================================
  /**
   * Filters notifications based on selected filter
   */
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  // ==========================================================================
  // FUNCTION: GET NOTIFICATION ICON COLOR
  // ==========================================================================
  /**
   * Returns color class based on notification type
   */
  const getIconColor = (type) => {
    switch (type) {
      case 'session_completed':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
      case 'soap_generated':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
      case 'new_patient':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
      case 'system':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      default:
        return 'bg-tecnot-light dark:bg-tecnot-primary text-tecnot-primary dark:text-tecnot-light'
    }
  }

  // ==========================================================================
  // FUNCTION: FORMAT TIME AGO
  // ==========================================================================
  /**
   * Formats timestamp to relative time (e.g., "2 hours ago")
   */
  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now - time) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return time.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Notifications" subtitle="Stay updated with your practice" />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">
        
        {/* ====================================================================
            FILTER TABS & ACTIONS
            ==================================================================== */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 mb-4 sm:mb-6">
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 xs:flex-none px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth text-xs xs:text-sm ${
                filter === 'all'
                  ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 xs:flex-none px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth text-xs xs:text-sm ${
                filter === 'unread'
                  ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`flex-1 xs:flex-none px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth text-xs xs:text-sm ${
                filter === 'read'
                  ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Read
            </button>
          </div>

          {/* Mark All as Read Button */}
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-white dark:bg-gray-800 
                       text-tecnot-primary dark:text-tecnot-light border-2 border-tecnot-primary dark:border-tecnot-light 
                       rounded-lg font-medium hover:bg-tecnot-light/20 dark:hover:bg-tecnot-primary/20 transition-smooth text-xs xs:text-sm"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* ====================================================================
            NOTIFICATIONS LIST
            ==================================================================== */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-tecnot-primary dark:border-tecnot-light border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base">
              {filter === 'all' 
                ? 'No notifications yet.' 
                : filter === 'unread'
                ? 'No unread notifications.'
                : 'No read notifications.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border 
                         ${notification.read 
                           ? 'border-gray-100 dark:border-gray-700' 
                           : 'border-tecnot-primary/30 dark:border-tecnot-light/30 bg-tecnot-light/5 dark:bg-tecnot-light/5'
                         } 
                         p-3 xs:p-4 transition-colors`}
              >
                <div className="flex items-start gap-3">
                  
                  {/* Notification Icon */}
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                    <Bell className="w-5 h-5 xs:w-6 xs:h-6" />
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-tecnot-primary dark:bg-tecnot-light rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-500">
                      {formatTimeAgo(notification.timestamp)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 xs:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 dark:text-green-400" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 xs:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-smooth"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 xs:w-5 xs:h-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications