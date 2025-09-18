'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Clock, 
  Target, 
  Lock, 
  Globe, 
  Search,
  Filter,
  RefreshCw,
  Play,
  Star,
  Zap
} from 'lucide-react'

interface Room {
  id: string
  roomCode: string
  name: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  currentPlayers: number
  maxPlayers: number
  timePerQuestion: number
  totalRounds: number
  isPrivate: boolean
  hostName: string
  createdAt: string
}

interface RoomBrowserProps {
  onJoinRoom: (roomCode: string) => void
}

export default function RoomBrowser({ onJoinRoom }: RoomBrowserProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  const mockRooms: Room[] = [
    {
      id: '1',
      roomCode: 'ABC123',
      name: 'Math Masters Challenge',
      category: 'Mathematics',
      difficulty: 'medium',
      currentPlayers: 3,
      maxPlayers: 6,
      timePerQuestion: 30,
      totalRounds: 15,
      isPrivate: false,
      hostName: 'AlexMath',
      createdAt: '2 min ago'
    },
    {
      id: '2',
      roomCode: 'XYZ789',
      name: 'Science Squad',
      category: 'Science',
      difficulty: 'hard',
      currentPlayers: 2,
      maxPlayers: 4,
      timePerQuestion: 45,
      totalRounds: 20,
      isPrivate: false,
      hostName: 'ScienceNerd',
      createdAt: '5 min ago'
    },
    {
      id: '3',
      roomCode: 'HIJ456',
      name: 'History Buffs United',
      category: 'History',
      difficulty: 'easy',
      currentPlayers: 5,
      maxPlayers: 8,
      timePerQuestion: 30,
      totalRounds: 10,
      isPrivate: false,
      hostName: 'HistoryLover',
      createdAt: '8 min ago'
    },
    {
      id: '4',
      roomCode: 'DEF789',
      name: 'Quick Geography Quiz',
      category: 'Geography',
      difficulty: 'medium',
      currentPlayers: 1,
      maxPlayers: 4,
      timePerQuestion: 20,
      totalRounds: 12,
      isPrivate: false,
      hostName: 'WorldExplorer',
      createdAt: '12 min ago'
    },
    {
      id: '5',
      roomCode: 'GHI012',
      name: 'Literature Legends',
      category: 'Literature',
      difficulty: 'hard',
      currentPlayers: 4,
      maxPlayers: 6,
      timePerQuestion: 60,
      totalRounds: 18,
      isPrivate: false,
      hostName: 'BookWorm',
      createdAt: '15 min ago'
    }
  ]

  useEffect(() => {
    // Simulate fetching rooms
    setRooms(mockRooms)
    setFilteredRooms(mockRooms)
  }, [])

  useEffect(() => {
    let filtered = rooms

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.hostName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(room => room.category === categoryFilter)
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(room => room.difficulty === difficultyFilter)
    }

    setFilteredRooms(filtered)
  }, [rooms, searchQuery, categoryFilter, difficultyFilter])

  const refreshRooms = () => {
    setLoading(true)
    setTimeout(() => {
      setRooms([...mockRooms])
      setLoading(false)
    }, 1000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRoomFullness = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return 'text-red-400'
    if (percentage >= 70) return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms, categories, or players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>

        {/* Refresh */}
        <button
          onClick={refreshRooms}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-game-bg-secondary">All Categories</option>
                <option value="Mathematics" className="bg-game-bg-secondary">Mathematics</option>
                <option value="Science" className="bg-game-bg-secondary">Science</option>
                <option value="History" className="bg-game-bg-secondary">History</option>
                <option value="Geography" className="bg-game-bg-secondary">Geography</option>
                <option value="Literature" className="bg-game-bg-secondary">Literature</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-game-bg-secondary">All Difficulties</option>
                <option value="easy" className="bg-game-bg-secondary">Easy</option>
                <option value="medium" className="bg-game-bg-secondary">Medium</option>
                <option value="hard" className="bg-game-bg-secondary">Hard</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room List */}
      <div className="space-y-4">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No rooms found</h3>
            <p className="text-gray-400">
              {searchQuery || categoryFilter !== 'all' || difficultyFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No active rooms at the moment. Create one to get started!'
              }
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{room.name}</h3>
                      {room.isPrivate ? (
                        <Lock className="w-4 h-4 text-orange-400" />
                      ) : (
                        <Globe className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-300 mb-3">
                      <span className="flex items-center space-x-1">
                        <span>Category:</span>
                        <span className="text-purple-400 font-medium">{room.category}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>Difficulty:</span>
                        <span className={`font-medium capitalize ${getDifficultyColor(room.difficulty)}`}>
                          {room.difficulty}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>Host:</span>
                        <span className="text-blue-400 font-medium">{room.hostName}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span className={getRoomFullness(room.currentPlayers, room.maxPlayers)}>
                          {room.currentPlayers}/{room.maxPlayers}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{room.timePerQuestion}s per question</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{room.totalRounds} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Created {room.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {room.currentPlayers === room.maxPlayers ? (
                      <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium">
                        Full
                      </div>
                    ) : (
                      <button
                        onClick={() => onJoinRoom(room.roomCode)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
                      >
                        <Play className="w-4 h-4" />
                        <span>Join</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}