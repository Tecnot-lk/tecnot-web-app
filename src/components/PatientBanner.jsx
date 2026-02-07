import React from 'react'
import { Heart, AlertTriangle, Pill, Clock, Droplet, Activity } from 'lucide-react'

function PatientBanner({ patient, session }) {
  if (!patient) return null

  // Get gender icon and color
  const getGenderStyle = () => {
    switch (patient.gender) {
      case 'Female':
        return { color: 'bg-pink-500', symbol: '♀' }
      case 'Male':
        return { color: 'bg-blue-500', symbol: '♂' }
      default:
        return { color: 'bg-gray-500', symbol: '⚧' }
    }
  }

  const genderStyle = getGenderStyle()

  // Calculate risk score (dummy - replace with actual calculation)
  const getRiskScore = () => {
    // Simple risk calculation based on age and chronics
    let risk = 0
    if (patient.age > 60) risk += 2
    if (patient.age > 70) risk += 3
    if (patient.chronics) risk += 2
    if (patient.allergies) risk += 1
    return risk
  }

  const riskScore = getRiskScore()

  return (
    <div className="sticky top-16 z-20 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300 shadow-md">
      <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-4">
        
        {/* TOP ROW: Basic Patient Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 xs:gap-3 mb-2 xs:mb-3">
          
          {/* LEFT: Gender Icon + Name + Basic Info */}
          <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
            {/* Gender Icon */}
            <div 
              className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg xs:text-xl sm:text-2xl flex-shrink-0 ${genderStyle.color}`}
            >
              {genderStyle.symbol}
            </div>
            
            {/* Patient Name & Info */}
            <div className="min-w-0 flex-1">
              <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {patient.first_name} {patient.last_name}
              </h2>
              <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm text-gray-700">
                <span className="font-medium">MRN: {patient.mrn}</span>
                <span className="hidden xs:inline">•</span>
                <span className="whitespace-nowrap">{patient.age}Y {patient.gender}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Blood Type, SpO2, Risk Score */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 flex-wrap">
            
            {/* Blood Type */}
            {patient.blood_type && (
              <div className="bg-red-100 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-lg border border-red-300">
                <div className="flex items-center gap-1">
                  <Droplet className="w-3 h-3 xs:w-4 xs:h-4 text-red-600" />
                  <span className="font-bold text-red-700 text-xs xs:text-sm">{patient.blood_type}</span>
                </div>
              </div>
            )}
            
            {/* SpO2 (from session vitals) */}
            {session?.vitals?.spo2 && (
              <div className="bg-blue-100 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-lg border border-blue-300">
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
                  <span className="font-bold text-blue-700 text-xs xs:text-sm">
                    SpO2: {session.vitals.spo2}%
                  </span>
                </div>
              </div>
            )}

            {/* Risk Score */}
            <div className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-2 rounded-lg flex items-baseline gap-1
                          ${riskScore >= 5 ? 'bg-red-600' : riskScore >= 3 ? 'bg-orange-600' : 'bg-gray-800'}`}>
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">{riskScore}</span>
              <span className="text-[10px] xs:text-xs text-white">Risk</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Medical Info - 4 Columns (Responsive Grid) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 text-[10px] xs:text-xs sm:text-sm">
          
          {/* Chronic Conditions */}
          <div className="flex items-start gap-1.5 xs:gap-2 bg-white/50 rounded-lg p-2">
            <Heart className="w-3 h-3 xs:w-4 xs:h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-gray-700">Chronics:</span>
              <span className={`ml-1 ${patient.chronics ? 'text-red-600 font-medium' : 'text-gray-500'} break-words block xs:inline`}>
                {patient.chronics || 'None'}
              </span>
            </div>
          </div>

          {/* Allergies */}
          <div className="flex items-start gap-1.5 xs:gap-2 bg-white/50 rounded-lg p-2">
            <AlertTriangle className="w-3 h-3 xs:w-4 xs:h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-gray-700">Allergies:</span>
              <span className={`ml-1 ${patient.allergies ? 'text-orange-600 font-medium' : 'text-gray-500'} break-words block xs:inline`}>
                {patient.allergies || 'None'}
              </span>
            </div>
          </div>

          {/* Drug Precautions */}
          <div className="flex items-start gap-1.5 xs:gap-2 bg-white/50 rounded-lg p-2">
            <Pill className="w-3 h-3 xs:w-4 xs:h-4 text-purple-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-gray-700">Precautions:</span>
              <span className={`ml-1 ${patient.drug_precautions ? 'text-purple-600 font-medium' : 'text-gray-500'} break-words block xs:inline`}>
                {patient.drug_precautions || 'None'}
              </span>
            </div>
          </div>

          {/* National ID */}
          <div className="flex items-start gap-1.5 xs:gap-2 bg-white/50 rounded-lg p-2">
            <Clock className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-gray-700">National ID:</span>
              <span className="ml-1 text-gray-600 break-all block xs:inline">{patient.national_id || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* ADDITIONAL ROW: Full Vitals Display (if session exists) */}
        {session?.vitals && (
          <div className="mt-2 xs:mt-3 pt-2 xs:pt-3 border-t border-gray-300">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-tecnot-primary" />
              <h3 className="text-xs xs:text-sm font-semibold text-gray-900">Current Vitals</h3>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 xs:gap-3">
              
              {/* Height */}
              {session.vitals.height && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">Height</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.height} cm</p>
                </div>
              )}

              {/* Weight */}
              {session.vitals.weight && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">Weight</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.weight} kg</p>
                </div>
              )}

              {/* Temperature */}
              {session.vitals.temperature && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">Temp</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.temperature} °C</p>
                </div>
              )}

              {/* Blood Pressure */}
              {session.vitals.blood_pressure && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">BP</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.blood_pressure}</p>
                </div>
              )}

              {/* Heart Rate */}
              {session.vitals.heart_rate && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">HR</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.heart_rate} bpm</p>
                </div>
              )}

              {/* SpO2 */}
              {session.vitals.spo2 && (
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <p className="text-[10px] xs:text-xs text-gray-600">SpO2</p>
                  <p className="text-sm xs:text-base font-bold text-gray-900">{session.vitals.spo2}%</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientBanner