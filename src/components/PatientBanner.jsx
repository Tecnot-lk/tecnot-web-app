// =============================================================================
// PATIENT BANNER COMPONENT
// =============================================================================
//
// PURPOSE:
// - Display patient information at top of session/SOAP pages
// - Show critical medical info (chronics, allergies, drug precautions)
// - Display current session vitals
// - Color-coded alerts for medical conditions
//
// USAGE:
// <PatientBanner patient={patientObject} session={sessionObject} />
//
// PROPS:
// - patient: object - Patient data (required)
// - session: object - Session data with vitals (optional)
//
// =============================================================================

import React from 'react'
import { Heart, AlertTriangle, Pill, Clock } from 'lucide-react'

function PatientBanner({ patient, session }) {
  
  // ==========================================================================
  // FUNCTION: GET AGE DISPLAY
  // ==========================================================================
  /**
   * Formats age for display
   * @returns {string} - Age in years or 'N/A'
   */
  const getAgeDisplay = () => {
    if (patient.age) return `${patient.age}Y`
    return 'N/A'
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="bg-gradient-to-r from-tecnot-primary to-tecnot-dark 
                    dark:from-gray-800 dark:to-gray-900
                    border-b-4 border-tecnot-dark dark:border-tecnot-light
                    px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 
                    shadow-lg transition-colors">
      
      {/* ====================================================================
          PATIENT HEADER - Name, MRN, Age, Gender, Blood Type
          ==================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 sm:mb-6">
        
        {/* Left: Patient Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Avatar - Color based on gender */}
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center 
                         text-white font-bold text-lg sm:text-2xl flex-shrink-0
                         ${patient.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}
                         shadow-lg`}>
            {patient.first_name?.charAt(0)}
          </div>
          
          {/* Name & Details */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
              {patient.first_name} {patient.last_name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-tecnot-light dark:text-gray-300">
              <span className="font-medium">MRN: {patient.mrn}</span>
              <span>•</span>
              <span>{getAgeDisplay()} {patient.gender}</span>
            </div>
          </div>
        </div>

        {/* Right: Blood Type & Risk Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Blood Type */}
          {patient.blood_type && (
            <div className="bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm 
                         px-3 sm:px-4 py-2 rounded-lg border border-white/30 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                <span className="font-bold text-white text-sm sm:text-base">
                  {patient.blood_type}
                </span>
              </div>
            </div>
          )}
          
          {/* Risk Level Badge */}
          {/* TODO: This should be calculated based on patient conditions */}
          <div className="bg-orange-500 px-3 sm:px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
              <span className="text-xs sm:text-sm font-semibold text-white">Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MEDICAL ALERTS - Chronics, Allergies, Precautions, National ID
          ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
        
        {/* Chronics Alert */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm 
                     rounded-lg p-3 border-l-4 border-red-500 shadow-md transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Chronics:
            </span>
          </div>
          <p className="text-sm font-bold text-red-600 dark:text-red-400">
            {patient.chronics || 'None'}
          </p>
        </div>

        {/* Allergies Alert */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm 
                     rounded-lg p-3 border-l-4 border-orange-500 shadow-md transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Allergies:
            </span>
          </div>
          <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
            {patient.allergies || 'None'}
          </p>
        </div>

        {/* Drug Precautions Alert */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm 
                     rounded-lg p-3 border-l-4 border-purple-500 shadow-md transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Pill className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Precautions:
            </span>
          </div>
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
            {patient.drug_precautions || 'None'}
          </p>
        </div>

        {/* National ID */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm 
                     rounded-lg p-3 border-l-4 border-blue-500 shadow-md transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              National ID:
            </span>
          </div>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {patient.national_id || 'N/A'}
          </p>
        </div>
      </div>

      {/* ====================================================================
          SESSION VITALS (Only show if vitals are provided)
          ==================================================================== */}
      {session?.vitals && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                     rounded-lg p-3 sm:p-4 shadow-md transition-colors">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Current Session Vitals
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Height */}
            {session.vitals.height && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Height</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.height}cm
                </p>
              </div>
            )}
            
            {/* Weight */}
            {session.vitals.weight && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Weight</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.weight}kg
                </p>
              </div>
            )}
            
            {/* Temperature */}
            {session.vitals.temperature && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Temp</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.temperature}°C
                </p>
              </div>
            )}
            
            {/* Blood Pressure */}
            {session.vitals.blood_pressure && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">BP</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.blood_pressure}
                </p>
              </div>
            )}
            
            {/* Heart Rate */}
            {session.vitals.heart_rate && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">HR</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.heart_rate} bpm
                </p>
              </div>
            )}
            
            {/* SpO2 */}
            {session.vitals.spo2 && (
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">SpO2</p>
                <p className="text-sm font-bold text-tecnot-primary dark:text-tecnot-light">
                  {session.vitals.spo2}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientBanner