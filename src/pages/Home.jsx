// ====================
// HOME PAGE - FIXED RESPONSIVE
// ====================

import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import Header from '../components/Header'

function Home() {
  const stats = [
    { label: 'Total Patients', value: '248', icon: Users, color: 'bg-blue-500' },
    { label: "Today's Sessions", value: '12', icon: Calendar, color: 'bg-tecnot-primary' },
    { label: 'SOAP Notes', value: '186', icon: FileText, color: 'bg-purple-500' },
    { label: 'Avg Session Time', value: '8m', icon: Clock, color: 'bg-orange-500' },
  ]
  
  const recentActivities = [
    { patient: 'Malik / 001', action: 'Consultation completed', time: '2 hours ago' },
    { patient: 'Shiman / 021', action: 'SOAP note generated', time: '4 hours ago' },
    { patient: 'Ibrahim / 022', action: 'Session started', time: '6 hours ago' },
  ]
  
  return (
    <div className="animate-fadeIn w-full">
      <Header 
        title="Welcome back, Dr. Ibrahim!" 
        subtitle="Here's what's happening with your practice today"
      />
      
      {/* Main Content - FIXED: Added max-width and proper padding */}
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* Quick Stats Cards - FIXED: Better grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md 
                         transition-all duration-200 border border-gray-100
                         p-3 xs:p-4 sm:p-5 lg:p-6
                         animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className={`${stat.color} p-2 sm:p-2.5 lg:p-3 rounded-lg`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                </div>
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-tight">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
        
        {/* Two Column Layout - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Quick Actions
            </h2>
            
            {/* FIXED: Better responsive grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Start New Session */}
              <Link 
                to="/new-session"
                className="bg-gradient-to-br from-tecnot-primary to-tecnot-dark 
                         p-4 xs:p-5 sm:p-6 rounded-lg 
                         text-white card-hover group
                         min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]
                         flex flex-col justify-between"
              >
                <Calendar className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                                   mb-2 xs:mb-3 
                                   group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold mb-1">
                    Start New Session
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-tecnot-light">
                    Begin a new patient consultation
                  </p>
                </div>
              </Link>
              
              {/* View Patients */}
              <Link 
                to="/patients"
                className="bg-white border-2 border-tecnot-primary 
                         p-4 xs:p-5 sm:p-6 rounded-lg 
                         card-hover group
                         min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]
                         flex flex-col justify-between"
              >
                <Users className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                                mb-2 xs:mb-3 
                                text-tecnot-primary 
                                group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
                    View Patients
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
                    Manage patient records
                  </p>
                </div>
              </Link>
              
              {/* SOAP Notes */}
              <Link 
                to="/patients"
                className="bg-white border-2 border-purple-200 
                         p-4 xs:p-5 sm:p-6 rounded-lg 
                         card-hover group
                         min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]
                         flex flex-col justify-between"
              >
                <FileText className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                                   mb-2 xs:mb-3 
                                   text-purple-500 
                                   group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
                    Recent SOAP Notes
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
                    Review generated notes
                  </p>
                </div>
              </Link>
              
              {/* My Profile */}
              <Link 
                to="/profile"
                className="bg-white border-2 border-blue-200 
                         p-4 xs:p-5 sm:p-6 rounded-lg 
                         card-hover group
                         min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]
                         flex flex-col justify-between"
              >
                <CheckCircle className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                                      mb-2 xs:mb-3 
                                      text-blue-500 
                                      group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
                    My Profile
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
                    Update your information
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Recent Activity
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 
                         p-4 xs:p-5 sm:p-6 space-y-3 sm:space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-3 sm:pb-4 
                           border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 bg-tecnot-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs xs:text-sm sm:text-base truncate">
                      {activity.patient}
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 truncate">
                      {activity.action}
                    </p>
                    <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pro Tip */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 
                         rounded-lg p-4 xs:p-5 sm:p-6 mt-4 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2 text-xs xs:text-sm sm:text-base">
                💡 Pro Tip
              </h3>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700">
                You can now record consultations in Sinhala, Tamil, and English. 
                The AI will automatically transcribe and translate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home