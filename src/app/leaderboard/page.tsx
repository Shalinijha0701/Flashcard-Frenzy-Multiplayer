'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Zap, 
  Target, 
  Clock, 
  TrendingUp,
  Brain,
  Calendar,
  Filter,
  Search,
  Award,
  Star,
  Flame
} from 'lucide-react'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatar?: string
  score: number
  gamesPlayed: number
  winRate: number
  avgResponseTime: number
  streak: number
  category?: string
}

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: '1',
      username: 'QuizMaster2024',
      score: 15420,
      gamesPlayed: 147,
      winRate: 87.2,
      avgResponseTime: 3.2,
      streak: 23
    },
    {
      rank: 2,
      userId: '2',
      username: 'BrainiacChamp',
      score: 14850,
      gamesPlayed: 132,
      winRate: 84.1,
      avgResponseTime: 3.8,
      streak: 15
    },
    {
      rank: 3,
      userId: '3',
      username: 'KnowledgeKing',
      score: 13990,
      gamesPlayed: 156,
      winRate: 78.9,
      avgResponseTime: 4.1,
      streak: 12
    },
    {
      rank: 4,
      userId: '4',
      username: 'ScienceWhiz',
      score: 13200,
      gamesPlayed: 98,
      winRate: 82.7,
      avgResponseTime: 3.5,
      streak: 8
    },
    {
      rank: 5,
      userId: '5',
      username: 'HistoryBuff',
      score: 12850,
      gamesPlayed: 114,
      winRate: 76.3,
      avgResponseTime: 4.8,
      streak: 6
    },
    {
      rank: 6,
      userId: '6',
      username: 'MathGenius',
      score: 12400,
      gamesPlayed: 89,
      winRate: 88.8,
      avgResponseTime: 2.9,
      streak: 19
    },
    {
      rank: 7,
      userId: '7',
      username: 'GeographyGuru',
      score: 11950,
      gamesPlayed: 124,
      winRate: 71.8,
      avgResponseTime: 5.2,
      streak: 4
    },
    {
      rank: 8,
      userId: '8',
      username: 'LiteratureLover',
      score: 11600,
      gamesPlayed: 108,
      winRate: 74.1,
      avgResponseTime: 4.3,
      streak: 7
    },
    {
      rank: 9,
      userId: '9',
      username: 'SportsFanatic',
      score: 11200,
      gamesPlayed: 95,
      winRate: 69.5,
      avgResponseTime: 4.7,
      streak: 3
    },
    {
      rank: 10,
      userId: '10',
      username: 'TechExpert',
      score: 10850,
      gamesPlayed: 87,
      winRate: 79.3,
      avgResponseTime: 3.9,
      streak: 11
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>
    }
  }

  const getPlayerInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase()
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600'
    if (rank === 2) return 'from-gray-300 to-gray-500'
    if (rank === 3) return 'from-amber-500 to-amber-700'
    return 'from-purple-500 to-blue-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
              <span>← Back to Dashboard</span>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Leaderboard</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Compete with the best minds and climb your way to the top of the knowledge hierarchy
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Time Period */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Time Period
                </label>
                <div className="flex space-x-2">
                  {[
                    { id: 'daily', label: 'Daily' },
                    { id: 'weekly', label: 'Weekly' },
                    { id: 'monthly', label: 'Monthly' },
                    { id: 'alltime', label: 'All Time' }
                  ].map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedPeriod === period.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all" className="bg-game-bg-secondary">All Categories</option>
                  <option value="mathematics" className="bg-game-bg-secondary">Mathematics</option>
                  <option value="science" className="bg-game-bg-secondary">Science</option>
                  <option value="history" className="bg-game-bg-secondary">History</option>
                  <option value="geography" className="bg-game-bg-secondary">Geography</option>
                </select>
              </div>

              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search Player
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search username..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism rounded-2xl p-6 text-center order-2 md:order-1"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">
                    {getPlayerInitials(leaderboardData[1].username)}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{leaderboardData[1].username}</h3>
              <p className="text-2xl font-bold text-gradient mb-2">{leaderboardData[1].score.toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>
                  <div className="text-white font-medium">{leaderboardData[1].winRate}%</div>
                  <div>Win Rate</div>
                </div>
                <div>
                  <div className="text-white font-medium">{leaderboardData[1].streak}</div>
                  <div>Streak</div>
                </div>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism rounded-2xl p-6 text-center relative order-1 md:order-2"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2 ring-4 ring-yellow-400/30">
                  <span className="text-white font-bold text-2xl">
                    {getPlayerInitials(leaderboardData[0].username)}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{leaderboardData[0].username}</h3>
              <p className="text-3xl font-bold text-gradient mb-2">{leaderboardData[0].score.toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>
                  <div className="text-white font-medium">{leaderboardData[0].winRate}%</div>
                  <div>Win Rate</div>
                </div>
                <div>
                  <div className="text-white font-medium">{leaderboardData[0].streak}</div>
                  <div>Streak</div>
                </div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism rounded-2xl p-6 text-center order-3"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">
                    {getPlayerInitials(leaderboardData[2].username)}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{leaderboardData[2].username}</h3>
              <p className="text-2xl font-bold text-gradient mb-2">{leaderboardData[2].score.toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>
                  <div className="text-white font-medium">{leaderboardData[2].winRate}%</div>
                  <div>Win Rate</div>
                </div>
                <div>
                  <div className="text-white font-medium">{leaderboardData[2].streak}</div>
                  <div>Streak</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Full Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="px-6 py-4 text-gray-300 font-medium">Rank</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Player</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Score</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Games</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Win Rate</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Avg Time</th>
                  <th className="px-6 py-4 text-gray-300 font-medium">Streak</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <motion.tr
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRankBadgeColor(entry.rank)} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">
                            {getPlayerInitials(entry.username)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{entry.username}</div>
                          {entry.streak > 5 && (
                            <div className="flex items-center space-x-1 text-orange-400 text-xs">
                              <Flame className="w-3 h-3" />
                              <span>Hot streak!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold text-lg">{entry.score.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{entry.gamesPlayed}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                            style={{ width: `${entry.winRate}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{entry.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{entry.avgResponseTime}s</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-medium">{entry.streak}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}