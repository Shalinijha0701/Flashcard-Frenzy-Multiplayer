'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Users,
  Trophy,
  Settings,
  LogOut,
  Brain,
  Zap,
  Target,
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { createClientComponentClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import CreateRoomModal from '@/components/CreateRoomModal'
import RoomBrowser from '@/components/RoomBrowser'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'quick' | 'browse' | 'create'>('quick')
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) {
        console.warn('Supabase client not available')
        setUser(null)
        setLoading(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setLoading(false)
        return
      }

      // check guest cookie/localStorage
      try {
        const guestCookie = document.cookie.split('; ').find(row => row.startsWith('guest_user='))?.split('=')[1]
        const guestLocal = typeof localStorage !== 'undefined' ? localStorage.getItem('guest_user') : null
        const guestPayload = guestCookie ? decodeURIComponent(guestCookie) : guestLocal
        if (guestPayload) {
          const g = JSON.parse(guestPayload)
          setUser({ id: g.id, user_metadata: { username: g.username }, email: null, guest: true })
          setLoading(false)
          return
        }
      } catch (e) {
        // ignore
      }

      setUser(null)
      setLoading(false)
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    // clear guest if present
    try { document.cookie = 'guest_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT' } catch { }
    try { localStorage.removeItem('guest_user') } catch { }
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push('/')
  }

  const handleCreateRoom = (roomData: any) => {
    console.log('Creating room:', roomData)
    // navigate to game with a room query param (room creation not persisted in this demo)
    const code = roomData.roomCode || Math.random().toString(36).slice(2, 8).toUpperCase()
    router.push(`/game?room=${code}`)
    // Here you would typically save the room to your database
    // and redirect to the room lobby
  }

  const handleJoinRoom = (roomCode: string) => {
    console.log('Joining room:', roomCode)
    router.push(`/game?room=${roomCode}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Flashcard Frenzy</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white font-medium">
                {user.user_metadata?.username || user.email?.split('@')[0]}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user.user_metadata?.username || 'Champion'}!
          </h1>
          <p className="text-gray-300 text-lg">
            Ready to challenge your knowledge and climb the leaderboard?
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Trophy, label: "Games Won", value: "0", color: "from-yellow-500 to-orange-500" },
            { icon: Target, label: "Accuracy", value: "0%", color: "from-green-500 to-blue-500" },
            { icon: Zap, label: "Best Streak", value: "0", color: "from-purple-500 to-pink-500" },
            { icon: Clock, label: "Avg. Time", value: "0s", color: "from-blue-500 to-cyan-500" }
          ].map((stat, index) => (
            <div key={index} className="glassmorphism rounded-2xl p-6">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1 mb-6">
            {[
              { id: 'quick', label: 'Quick Play', icon: Zap },
              { id: 'browse', label: 'Browse Rooms', icon: Search },
              { id: 'create', label: 'Create Room', icon: Plus }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glassmorphism rounded-2xl p-8">
            {activeTab === 'quick' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quick Play</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Jump into a random match with players of similar skill level. Perfect for a quick brain workout!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/game" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Find Match</span>
                  </Link>
                  <button className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/5 transition-all">
                    Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'browse' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Browse Active Rooms</h2>
                    <p className="text-gray-300">Find the perfect room to match your interests</p>
                  </div>
                </div>
                <RoomBrowser onJoinRoom={handleJoinRoom} />
              </div>
            )}

            {activeTab === 'create' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Create Your Room</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Set up a custom game room with your preferred settings and invite friends to join the challenge.
                </p>
                <button
                  onClick={() => setCreateRoomModalOpen(true)}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Room</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Browse Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glassmorphism rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          </div>

          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No recent activity</h3>
              <p className="text-gray-400">
                Start playing to see your match history here!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={createRoomModalOpen}
        onClose={() => setCreateRoomModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  )
}