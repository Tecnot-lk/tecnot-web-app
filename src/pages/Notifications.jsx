import React, { useState, useEffect, useCallback } from 'react'
import {
  Bell, Check, Trash2, Calendar, FileText, Users,
  Stethoscope, ClipboardList, RefreshCw, WifiOff, AlertTriangle
} from 'lucide-react'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabaseClient'

// ── Map notification type → icon + color ──────────────────────────────────────
const TYPE_CONFIG = {
  session:  { icon: Calendar,      color: 'bg-blue-500',   light: 'bg-blue-100 dark:bg-blue-900/30',    text: 'text-blue-600 dark:text-blue-400' },
  soap:     { icon: FileText,      color: 'bg-purple-500', light: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
  patient:  { icon: Users,         color: 'bg-green-500',  light: 'bg-green-100 dark:bg-green-900/30',  text: 'text-green-600 dark:text-green-400' },
  reminder: { icon: Bell,          color: 'bg-amber-500',  light: 'bg-amber-100 dark:bg-amber-900/30',  text: 'text-amber-600 dark:text-amber-400' },
  profile:  { icon: Stethoscope,   color: 'bg-teal-500',   light: 'bg-teal-100 dark:bg-teal-900/30',    text: 'text-teal-600 dark:text-teal-400' },
  report:   { icon: ClipboardList, color: 'bg-orange-500', light: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
  default:  { icon: Bell,          color: 'bg-gray-500',   light: 'bg-gray-100 dark:bg-gray-700',       text: 'text-gray-600 dark:text-gray-400' },
}

function getConfig(type) {
  return TYPE_CONFIG[type] || TYPE_CONFIG.default
}

// ── Friendly relative time ────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60)        return 'Just now'
  if (diff < 3600)      return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)     return `${Math.floor(diff / 3600)}h ago`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="p-4 xs:p-5 sm:p-6 flex items-start gap-3 xs:gap-4 animate-pulse">
      <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  )
}

// ── Custom confirm dialog — replaces window.confirm ──────────────────────────
function ConfirmDialog({ onConfirm, onCancel, count }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
                      border border-gray-100 dark:border-gray-700
                      w-full max-w-sm p-6 animate-fadeIn">

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full
                        bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
          Clear all notifications?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          This will permanently delete{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {count} notification{count !== 1 ? 's' : ''}
          </span>
          . This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
                       dark:bg-red-600 dark:hover:bg-red-700
                       text-white font-semibold text-sm transition-smooth shadow-sm"
          >
            Yes, clear all
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
function Notifications() {
  const { user } = useAuth()

  const [notifications, setNotifications] = useState([])
  const [filter, setFilter]               = useState('all')
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState('')
  const [showConfirm, setShowConfirm]     = useState(false)
  const [clearing, setClearing]           = useState(false)

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return
    setError('')
    try {
      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('id, type, title, message, read, created_at')
        .eq('doctor_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw new Error(fetchError.message)
      setNotifications(data || [])
    } catch (err) {
      setError('Failed to load notifications. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // ── Realtime subscription ─────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `doctor_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications((prev) => [payload.new, ...prev])
          }
          if (payload.eventType === 'UPDATE') {
            setNotifications((prev) =>
              prev.map((n) => (n.id === payload.new.id ? payload.new : n))
            )
          }
          if (payload.eventType === 'DELETE') {
            setNotifications((prev) => prev.filter((n) => n.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [user?.id])

  // ── Mark single as read ───────────────────────────────────────────────────
  const markAsRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    await supabase.from('notifications').update({ read: true }).eq('id', id)
  }

  // ── Mark all as read ──────────────────────────────────────────────────────
  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)
    if (!unreadIds.length) return
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await supabase.from('notifications').update({ read: true }).in('id', unreadIds)
  }

  // ── Delete single ─────────────────────────────────────────────────────────
  const deleteNotification = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    await supabase.from('notifications').delete().eq('id', id)
  }

  // ── Clear all — confirmed via custom dialog ───────────────────────────────
  const handleClearAllConfirmed = async () => {
    setShowConfirm(false)
    setClearing(true)
    try {
      setNotifications([])
      await supabase.from('notifications').delete().eq('doctor_id', user.id)
    } catch (err) {
      // If delete fails, re-fetch to restore accurate state
      await fetchNotifications()
    } finally {
      setClearing(false)
    }
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    if (filter === 'read')   return n.read
    return true
  })

  return (
    <div className="animate-fadeIn w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        title="Notifications"
        subtitle={
          loading
            ? 'Loading...'
            : `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
        }
      />

      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl mx-auto">

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl
                          bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <WifiOff className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300 flex-1">{error}</p>
            <button
              onClick={fetchNotifications}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600
                         dark:text-red-400 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm
                        border border-gray-100 dark:border-gray-700 transition-colors">

          {/* Filter Tabs + Actions */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3
                          p-3 xs:p-4 border-b border-gray-200 dark:border-gray-700">

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { key: 'all',    label: `All (${notifications.length})` },
                { key: 'unread', label: `Unread (${unreadCount})` },
                { key: 'read',   label: `Read (${notifications.length - unreadCount})` },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-smooth
                              whitespace-nowrap text-xs xs:text-sm
                              ${filter === key
                                ? 'bg-tecnot-primary dark:bg-tecnot-light text-white dark:text-gray-900'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={fetchNotifications}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700
                           text-gray-600 dark:text-gray-300
                           hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 px-3 xs:px-4 py-2
                             bg-tecnot-primary dark:bg-tecnot-light
                             text-white dark:text-gray-900 rounded-lg font-medium
                             hover:bg-tecnot-dark dark:hover:bg-tecnot-primary
                             transition-smooth text-xs xs:text-sm whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                  Mark all read
                </button>
              )}

              {notifications.length > 0 && (
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={clearing}
                  className="flex items-center gap-1.5 px-3 xs:px-4 py-2
                             bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium
                             hover:bg-red-600 dark:hover:bg-red-700
                             transition-smooth text-xs xs:text-sm whitespace-nowrap
                             disabled:opacity-60"
                >
                  <Trash2 className="w-4 h-4" />
                  {clearing ? 'Clearing...' : 'Clear all'}
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">

            {loading && (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            {!loading && filteredNotifications.length === 0 && (
              <div className="text-center py-16">
                <Bell className="w-12 h-12 xs:w-16 xs:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base font-medium">
                  {filter === 'unread' ? 'No unread notifications' :
                   filter === 'read'   ? 'No read notifications'   :
                   'No notifications yet'}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {filter === 'all' && 'Notifications will appear here when activity happens.'}
                </p>
              </div>
            )}

            {!loading && filteredNotifications.map((notif) => {
              const { icon: Icon, color, light, text } = getConfig(notif.type)
              return (
                <div
                  key={notif.id}
                  className={`p-4 xs:p-5 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-750
                              transition-smooth
                              ${!notif.read ? 'bg-blue-50/60 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="flex items-start gap-3 xs:gap-4">

                    <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center
                                     justify-center flex-shrink-0
                                     ${!notif.read ? color : light}`}>
                      <Icon className={`w-5 h-5 xs:w-6 xs:h-6 ${!notif.read ? 'text-white' : text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h3 className={`font-semibold text-sm xs:text-base truncate
                                        ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-tecnot-primary dark:bg-tecnot-light
                                           rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                        {notif.message}
                      </p>
                      <p className="text-[10px] xs:text-xs text-gray-400 dark:text-gray-500">
                        {timeAgo(notif.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-1.5 flex-shrink-0">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-smooth"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-smooth"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 xs:w-5 xs:h-5 text-red-500 dark:text-red-400" />
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Custom confirm dialog — shown instead of window.confirm */}
      {showConfirm && (
        <ConfirmDialog
          count={notifications.length}
          onConfirm={handleClearAllConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default Notifications