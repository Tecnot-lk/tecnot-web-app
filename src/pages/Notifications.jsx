// ====================
// NOTIFICATIONS PAGE - FULLY RESPONSIVE
// View system notifications
// ====================

import React from 'react'
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import Header from '../components/Header'

function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      title: 'SOAP Note Generated',
      message: 'SOAP note for Malik / 001 has been successfully generated',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      title: 'New Feature Available',
      message: 'Multi-language support is now active! Record in Sinhala, Tamil, or English',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      title: 'Session Reminder',
      message: 'You have 3 pending SOAP notes to review',
      time: '2 days ago'
    },
  ]
  
  return (
    <div className="animate-fadeIn">
      <Header 
        title="Notifications" 
        subtitle="Stay updated with your practice activities"
      />
      
      {/* Main Content - Responsive padding */}
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        
        {/* Mark all as read */}
        <div className="flex justify-end mb-3 xs:mb-4">
          <button className="text-xs xs:text-sm text-tecnot-primary hover:underline font-medium">
            Mark all as read
          </button>
        </div>
        
        {/* Notifications List - Responsive */}
        <div className="space-y-3 xs:space-y-4">
          {notifications.map((notif) => {
            const Icon = notif.icon
            return (
              <div
                key={notif.id}
                className="bg-white rounded-lg sm:rounded-xl 
                         p-4 xs:p-5 sm:p-6 
                         shadow-sm border border-gray-100 
                         card-hover"
              >
                <div className="flex items-start gap-3 xs:gap-4">
                  <div className={`w-10 h-10 xs:w-12 xs:h-12 
                                 ${notif.bg} rounded-lg 
                                 flex items-center justify-center 
                                 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 xs:w-6 xs:h-6 ${notif.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm xs:text-base truncate">
                      {notif.title}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 mb-2 line-clamp-2">
                      {notif.message}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-400">{notif.time}</p>
                  </div>
                  
                  <button className="text-tecnot-primary hover:text-tecnot-dark 
                                   text-xs xs:text-sm font-medium 
                                   flex-shrink-0
                                   hidden xs:block">
                    View
                  </button>
                </div>
                
                {/* View button for mobile - Full width */}
                <button className="xs:hidden w-full mt-3 
                                 text-center text-tecnot-primary hover:text-tecnot-dark 
                                 text-xs font-medium 
                                 py-2 border-t border-gray-100">
                  View Details
                </button>
              </div>
            )
          })}
        </div>
        
        {/* Empty State - Responsive */}
        {notifications.length === 0 && (
          <div className="text-center py-12 xs:py-16">
            <Bell className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 mx-auto mb-3 xs:mb-4" />
            <h3 className="text-lg xs:text-xl font-semibold text-gray-700 mb-2">
              No notifications
            </h3>
            <p className="text-sm xs:text-base text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications