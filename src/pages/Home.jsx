import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar,
  Users,
  FileText,
  Filter,
  X,
  Activity
} from 'lucide-react'
import Header from '../components/Header'

function Home() {
  
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    gender: '',
    dob: '',
    age: '',
    nationality: '',
    patientId: ''
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setRecentActivities([
        { 
          id: '1',
          patient: 'Malik / 001', 
          action: 'Consultation completed', 
          time: '2 hours ago',
          status: 'finalized'
        },
        { 
          id: '2',
          patient: 'Shiman / 021', 
          action: 'SOAP note generated', 
          time: '4 hours ago',
          status: 'soap_generated'
        },
        { 
          id: '3',
          patient: 'Aisha / 012', 
          action: 'Session started', 
          time: '6 hours ago',
          status: 'started'
        },
        { 
          id: '4',
          patient: 'Kumari / 034', 
          action: 'Recording uploaded', 
          time: '1 day ago',
          status: 'recording_complete'
        }
      ])
    } catch (error) {
      console.error('Failed to fetch recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResetFilters = () => {
    setFilters({
      gender: '',
      dob: '',
      age: '',
      nationality: '',
      patientId: ''
    })
  }

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })
    console.log('Applying filters:', filters)
    alert(`Filters applied!\nQuery: ${queryParams.toString()}`)
    setShowFilters(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'finalized': 
        return 'bg-green-500'
      case 'soap_generated': 
        return 'bg-blue-500'
      case 'recording_complete': 
        return 'bg-tecnot-primary'
      case 'started': 
        return 'bg-orange-500'
      default: 
        return 'bg-gray-400'
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Welcome back, Dr. Ibrahim!" 
        subtitle="Your clinical workspace"
      />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2.5
                       bg-white dark:bg-gray-800 
                       border-2 border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-300 
                       rounded-lg font-medium text-sm
                       hover:border-tecnot-primary dark:hover:border-tecnot-light 
                       hover:text-tecnot-primary dark:hover:text-tecnot-light
                       transition-colors duration-200
                       w-full sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl 
                         p-5 sm:p-6
                         shadow-sm 
                         border border-gray-200 dark:border-gray-700 
                         animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                  Filter Patients
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 
                           rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters({...filters, gender: e.target.value})}
                    className="w-full px-3 py-2.5 
                             border-2 border-gray-200 dark:border-gray-600 
                             rounded-lg 
                             bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white 
                             text-sm
                             outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light 
                             transition-colors"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={filters.dob}
                    onChange={(e) => setFilters({...filters, dob: e.target.value})}
                    className="w-full px-3 py-2.5 
                             border-2 border-gray-200 dark:border-gray-600 
                             rounded-lg 
                             bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white 
                             text-sm
                             outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light 
                             transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 25Y"
                    value={filters.age}
                    onChange={(e) => setFilters({...filters, age: e.target.value})}
                    className="w-full px-3 py-2.5 
                             border-2 border-gray-200 dark:border-gray-600 
                             rounded-lg 
                             bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500
                             text-sm
                             outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light 
                             transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    placeholder="Sri Lankan"
                    value={filters.nationality}
                    onChange={(e) => setFilters({...filters, nationality: e.target.value})}
                    className="w-full px-3 py-2.5 
                             border-2 border-gray-200 dark:border-gray-600 
                             rounded-lg 
                             bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500
                             text-sm
                             outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light 
                             transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Patient ID / MRN
                  </label>
                  <input
                    type="text"
                    placeholder="Search by MRN or National ID"
                    value={filters.patientId}
                    onChange={(e) => setFilters({...filters, patientId: e.target.value})}
                    className="w-full px-3 py-2.5 
                             border-2 border-gray-200 dark:border-gray-600 
                             rounded-lg 
                             bg-white dark:bg-gray-700 
                             text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500
                             text-sm
                             outline-none 
                             focus:border-tecnot-primary dark:focus:border-tecnot-light 
                             transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  onClick={handleResetFilters}
                  className="w-full sm:flex-1 px-4 py-2.5 
                           border-2 border-gray-300 dark:border-gray-600 
                           rounded-lg 
                           font-medium text-sm
                           text-gray-700 dark:text-gray-300 
                           hover:bg-gray-50 dark:hover:bg-gray-700 
                           transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="w-full sm:flex-1 px-4 py-2.5 
                           bg-tecnot-primary dark:bg-tecnot-light 
                           text-white dark:text-gray-900 
                           rounded-lg 
                           font-medium text-sm
                           hover:bg-tecnot-dark dark:hover:bg-tecnot-primary 
                           transition-colors
                           shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              to="/new-session"
              className="w-full bg-tecnot-primary dark:bg-tecnot-light
                       p-6 
                       rounded-xl 
                       border-2 border-tecnot-dark dark:border-tecnot-primary
                       text-white dark:text-gray-900 
                       hover:shadow-lg hover:-translate-y-1
                       transition-all duration-200 
                       group
                       min-h-[160px]
                       flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-10 h-10 group-hover:scale-110 transition-transform" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40 dark:bg-gray-900/40"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Start New Session
                </h3>
                <p className="text-sm opacity-90">
                  Record patient consultation
                </p>
              </div>
            </Link>
            
            <Link 
              to="/patients"
              className="w-full bg-white dark:bg-gray-800 
                       p-6 
                       rounded-xl 
                       border-2 border-tecnot-primary dark:border-tecnot-light
                       hover:shadow-lg hover:-translate-y-1
                       hover:border-tecnot-dark dark:hover:border-tecnot-primary
                       transition-all duration-200 
                       group
                       min-h-[160px]
                       flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <Users className="w-10 h-10 text-tecnot-primary dark:text-tecnot-light 
                               group-hover:scale-110 transition-transform" />
                <div className="w-2.5 h-2.5 rounded-full bg-tecnot-primary/30 dark:bg-tecnot-light/30"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  View Patients
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage medical records
                </p>
              </div>
            </Link>
            
            <Link 
              to="/patients"
              className="w-full bg-white dark:bg-gray-800 
                       p-6 
                       rounded-xl 
                       border-2 border-purple-200 dark:border-purple-600
                       hover:shadow-lg hover:-translate-y-1
                       hover:border-purple-400 dark:hover:border-purple-500
                       transition-all duration-200 
                       group
                       min-h-[160px]
                       flex flex-col justify-between
                       sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between mb-3">
                <FileText className="w-10 h-10 text-purple-500 dark:text-purple-400 
                                   group-hover:scale-110 transition-transform" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 dark:bg-purple-400/30"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Recent SOAP Notes
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review documentation
                </p>
              </div>
            </Link>
          </div>

          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            
            <div className="w-full bg-white dark:bg-gray-800 
                         rounded-xl 
                         shadow-sm 
                         border border-gray-200 dark:border-gray-700
                         p-5 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-tecnot-primary dark:border-tecnot-light 
                               border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : recentActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No recent activity
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 
                               border-b border-gray-100 dark:border-gray-700 
                               last:border-0 last:pb-0"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${getStatusColor(activity.status)}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {activity.patient}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full bg-blue-50 dark:bg-blue-900/10 
                         rounded-xl 
                         p-5 
                         mt-4 
                         border border-blue-100 dark:border-blue-900">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-500 dark:bg-blue-600 rounded-lg 
                             flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">💡</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                    AI-Powered Transcription
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    Record consultations in Sinhala, Tamil, or English. 
                    Our AI automatically transcribes and generates structured SOAP notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home