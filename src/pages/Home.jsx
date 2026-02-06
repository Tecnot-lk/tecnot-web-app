import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, FileText, TrendingUp, Clock, Filter, X } from 'lucide-react'
import Header from '../components/Header'

function Home() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    gender: '',
    dob: '',
    age: '',
    nationality: '',
    patientId: '',
    clinic: '',
    doctorName: ''
  })

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

  const handleResetFilters = () => {
    setFilters({
      gender: '',
      dob: '',
      age: '',
      nationality: '',
      patientId: '',
      clinic: '',
      doctorName: ''
    })
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters)
    alert('Filters applied! (This will filter patient data when backend is connected)')
    setShowFilters(false)
  }

  return (
    <div className="animate-fadeIn w-full">
      <Header 
        title="Welcome back, Dr. Ibrahim!" 
        subtitle="Here's what's happening with your practice today"
      />
      
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* LEFT: Quick Actions (takes 2 columns) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Quick Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Quick Actions
                </h2>
                
                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 xs:px-4 py-2 
                           bg-white border-2 border-tecnot-primary 
                           text-tecnot-primary rounded-lg font-medium 
                           hover:bg-tecnot-light transition-smooth
                           text-xs xs:text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="bg-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 
                               shadow-sm border border-gray-200 mb-4 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-sm xs:text-base">
                      Filter Patients
                    </h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-smooth"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                    {/* Gender */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Gender
                      </label>
                      <select
                        value={filters.gender}
                        onChange={(e) => setFilters({...filters, gender: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={filters.dob}
                        onChange={(e) => setFilters({...filters, dob: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Age
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 25Y 3M 10D"
                        value={filters.age}
                        onChange={(e) => setFilters({...filters, age: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Nationality
                      </label>
                      <input
                        type="text"
                        placeholder="Enter nationality"
                        value={filters.nationality}
                        onChange={(e) => setFilters({...filters, nationality: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>

                    {/* Patient ID - MRN */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        MRN - (Medical Record Number)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter patient ID"
                        value={filters.patientId}
                        onChange={(e) => setFilters({...filters, patientId: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>

                    {/* Clinic */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Clinic
                      </label>
                      <input
                        type="text"
                        placeholder="Enter clinic name"
                        value={filters.clinic}
                        onChange={(e) => setFilters({...filters, clinic: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>

                    {/* Doctor Name */}
                    <div className="xs:col-span-2">
                      <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5">
                        Doctor Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter doctor name"
                        value={filters.doctorName}
                        onChange={(e) => setFilters({...filters, doctorName: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
                                 outline-none focus:border-tecnot-primary transition-smooth
                                 text-xs xs:text-sm"
                      />
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg 
                               font-medium text-gray-700 hover:bg-gray-50 transition-smooth
                               text-xs xs:text-sm"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className="flex-1 px-4 py-2 bg-tecnot-primary text-white rounded-lg 
                               font-medium hover:bg-tecnot-dark transition-smooth shadow-lg
                               text-xs xs:text-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
              
              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                
                {/* Start New Session */}
                <Link 
                  to="/new-session"
                  className="bg-gradient-to-br from-tecnot-primary to-tecnot-dark 
                           p-4 xs:p-5 sm:p-6 rounded-lg 
                           text-white card-hover group
                           min-h-[140px] xs:min-h-[160px]
                           flex flex-col justify-between"
                >
                  <Calendar className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 
                                     mb-3 xs:mb-4 
                                     group-hover:scale-110 transition-smooth" />
                  <div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold mb-1">
                      Start New Session
                    </h3>
                    <p className="text-xs xs:text-sm text-tecnot-light">
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
                           min-h-[140px] xs:min-h-[160px]
                           flex flex-col justify-between"
                >
                  <Users className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 
                                  mb-3 xs:mb-4 
                                  text-tecnot-primary 
                                  group-hover:scale-110 transition-smooth" />
                  <div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      View Patients
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">
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
                           min-h-[140px] xs:min-h-[160px]
                           flex flex-col justify-between
                           xs:col-span-2 lg:col-span-1"
                >
                  <FileText className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 
                                     mb-3 xs:mb-4 
                                     text-purple-500 
                                     group-hover:scale-110 transition-smooth" />
                  <div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      Recent SOAP Notes
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">
                      Review generated notes
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Recent Activity
              </h2>
              
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 
                           p-4 xs:p-5 sm:p-6 space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-3 sm:pb-4 
                             border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 bg-tecnot-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm xs:text-base truncate">
                        {activity.patient}
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600 truncate">
                        {activity.action}
                      </p>
                      <p className="text-[10px] xs:text-xs text-gray-400 mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>

          {/* RIGHT SIDEBAR: Statistics (takes 1 column) */}
          <div className="lg:col-span-1">
            <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Statistics
            </h2>
            
            {/* Stats Cards - Stacked Vertically */}
            <div className="space-y-3 sm:space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md 
                             transition-all duration-200 border border-gray-100
                             p-4 xs:p-5 sm:p-6
                             animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${stat.color} p-2.5 sm:p-3 rounded-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="text-3xl xs:text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
