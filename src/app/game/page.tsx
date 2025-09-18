'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Users, 
  Target,
  Zap,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  ArrowRight,
  Brain
} from 'lucide-react'
import { calculateScore } from '@/lib/utils'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface Player {
  id: string
  username: string
  avatar?: string
  score: number
  correctAnswers: number
  streak: number
  isReady: boolean
}

interface GameState {
  currentQuestionIndex: number
  timeRemaining: number
  isAnswered: boolean
  selectedAnswer: string | null
  showResults: boolean
  gamePhase: 'waiting' | 'countdown' | 'question' | 'results' | 'finished'
}

export default function GameEngine() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    timeRemaining: 30,
    isAnswered: false,
    selectedAnswer: null,
    showResults: false,
    gamePhase: 'countdown'
  })

  const [countdown, setCountdown] = useState(3)
  const [playerStats, setPlayerStats] = useState({
    score: 0,
    correctAnswers: 0,
    streak: 0,
    responseTime: 0
  })

  // Mock questions
  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
      explanation: 'Paris is the capital and largest city of France.',
      category: 'Geography',
      difficulty: 'easy'
    },
    {
      id: '2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
      explanation: 'Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.',
      category: 'Science',
      difficulty: 'easy'
    },
    {
      id: '3',
      question: 'What is 15 × 8?',
      options: ['110', '120', '130', '140'],
      correctAnswer: '120',
      explanation: '15 × 8 = 120',
      category: 'Mathematics',
      difficulty: 'medium'
    },
    {
      id: '4',
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 'William Shakespeare',
      explanation: 'Romeo and Juliet is a tragedy written by William Shakespeare.',
      category: 'Literature',
      difficulty: 'easy'
    },
    {
      id: '5',
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 'Pacific Ocean',
      explanation: 'The Pacific Ocean covers about 46% of Earth\'s water surface.',
      category: 'Geography',
      difficulty: 'medium'
    }
  ]

  // Mock players
  const players: Player[] = [
    { id: '1', username: 'You', score: playerStats.score, correctAnswers: playerStats.correctAnswers, streak: playerStats.streak, isReady: true },
    { id: '2', username: 'AlexMath', score: 2840, correctAnswers: 3, streak: 2, isReady: true },
    { id: '3', username: 'ScienceWhiz', score: 2650, correctAnswers: 2, streak: 1, isReady: true },
    { id: '4', username: 'BookWorm', score: 3120, correctAnswers: 4, streak: 3, isReady: true }
  ]

  const currentQuestion = questions[gameState.currentQuestionIndex]
  const questionStartTime = Date.now()

  // Game countdown
  useEffect(() => {
    if (gameState.gamePhase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameState.gamePhase === 'countdown' && countdown === 0) {
      setGameState(prev => ({ ...prev, gamePhase: 'question' }))
    }
  }, [countdown, gameState.gamePhase])

  // Question timer
  useEffect(() => {
    if (gameState.gamePhase === 'question' && gameState.timeRemaining > 0 && !gameState.isAnswered) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gameState.timeRemaining === 0 && !gameState.isAnswered) {
      handleTimeUp()
    }
  }, [gameState.timeRemaining, gameState.gamePhase, gameState.isAnswered])

  const handleTimeUp = () => {
    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      showResults: true,
      gamePhase: 'results'
    }))
    
    // Reset streak on timeout
    setPlayerStats(prev => ({ ...prev, streak: 0 }))
  }

  const handleAnswerSelect = useCallback((answer: string) => {
    if (gameState.isAnswered || gameState.gamePhase !== 'question') return

    const responseTime = (Date.now() - questionStartTime) / 1000
    const isCorrect = answer === currentQuestion.correctAnswer
    const streakMultiplier = Math.min(playerStats.streak * 0.1 + 1, 2)
    const points = calculateScore(responseTime * 1000, isCorrect, streakMultiplier)

    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: answer,
      showResults: true,
      gamePhase: 'results'
    }))

    setPlayerStats(prev => ({
      ...prev,
      score: prev.score + points,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
      responseTime: responseTime
    }))
  }, [gameState.isAnswered, gameState.gamePhase, currentQuestion.correctAnswer, playerStats.streak])

  const handleNextQuestion = () => {
    if (gameState.currentQuestionIndex < questions.length - 1) {
      setGameState({
        currentQuestionIndex: gameState.currentQuestionIndex + 1,
        timeRemaining: 30,
        isAnswered: false,
        selectedAnswer: null,
        showResults: false,
        gamePhase: 'question'
      })
    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'finished' }))
    }
  }

  const getTimerColor = () => {
    if (gameState.timeRemaining > 15) return 'text-green-400'
    if (gameState.timeRemaining > 5) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getAnswerColor = (option: string) => {
    if (!gameState.showResults) return 'border-white/20 hover:border-purple-400 hover:bg-white/5'
    
    if (option === currentQuestion.correctAnswer) {
      return 'border-green-400 bg-green-400/20 text-green-400'
    } else if (option === gameState.selectedAnswer && option !== currentQuestion.correctAnswer) {
      return 'border-red-400 bg-red-400/20 text-red-400'
    } else {
      return 'border-white/10 bg-white/5 text-gray-400'
    }
  }

  const getAnswerIcon = (option: string) => {
    if (!gameState.showResults) return null
    
    if (option === currentQuestion.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-400" />
    } else if (option === gameState.selectedAnswer && option !== currentQuestion.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-400" />
    }
    return null
  }

  if (gameState.gamePhase === 'countdown') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-8xl font-bold text-gradient mb-4"
          >
            {countdown || 'GO!'}
          </motion.div>
          <p className="text-xl text-gray-300">Get ready to show your knowledge!</p>
        </motion.div>
      </div>
    )
  }

  if (gameState.gamePhase === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center glassmorphism rounded-3xl p-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Game Complete!</h1>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{playerStats.score}</div>
              <div className="text-gray-300">Final Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{playerStats.correctAnswers}/{questions.length}</div>
              <div className="text-gray-300">Correct Answers</div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900">
      {/* Game Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Question {gameState.currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">{currentQuestion.category}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white">4 Players</span>
            </div>
            <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
              <Clock className="w-5 h-5" />
              <span className="font-bold text-xl">{gameState.timeRemaining}s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-3">
            {/* Question Card */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glassmorphism rounded-2xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
                    {currentQuestion.difficulty.toUpperCase()}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{currentQuestion.category}</span>
                </div>
                
                <motion.div
                  animate={{ 
                    scale: gameState.timeRemaining <= 5 ? [1, 1.1, 1] : 1,
                    color: gameState.timeRemaining <= 5 ? '#ef4444' : '#10b981'
                  }}
                  transition={{ repeat: gameState.timeRemaining <= 5 ? Infinity : 0, duration: 0.5 }}
                  className="text-3xl font-bold"
                >
                  {gameState.timeRemaining}
                </motion.div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={gameState.isAnswered}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!gameState.isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!gameState.isAnswered ? { scale: 0.98 } : {}}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-between ${getAnswerColor(option)}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium text-left">{option}</span>
                    </div>
                    {getAnswerIcon(option)}
                  </motion.button>
                ))}
              </div>

              {/* Results and Explanation */}
              <AnimatePresence>
                {gameState.showResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      {gameState.selectedAnswer === currentQuestion.correctAnswer ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-semibold">Correct!</span>
                        </>
                      ) : gameState.selectedAnswer ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-semibold">Incorrect</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">Time's up!</span>
                        </>
                      )}
                    </div>
                    
                    {currentQuestion.explanation && (
                      <p className="text-gray-300 mb-4">{currentQuestion.explanation}</p>
                    )}
                    
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
                    >
                      <span>{gameState.currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Game'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Sidebar - Player Stats & Leaderboard */}
          <div className="space-y-6">
            {/* Your Stats */}
            <div className="glassmorphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Score</span>
                  <span className="text-white font-bold">{playerStats.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Correct</span>
                  <span className="text-white font-bold">{playerStats.correctAnswers}/{gameState.currentQuestionIndex + 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Streak</span>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-bold">{playerStats.streak}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Leaderboard */}
            <div className="glassmorphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Live Rankings</h3>
              <div className="space-y-3">
                {players.sort((a, b) => b.score - a.score).map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 font-bold">#{index + 1}</span>
                      <span className={`font-medium ${player.username === 'You' ? 'text-purple-400' : 'text-white'}`}>
                        {player.username}
                      </span>
                    </div>
                    <span className="text-white font-bold">{player.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="glassmorphism rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Questions</span>
                  <span className="text-white">{gameState.currentQuestionIndex + 1}/{questions.length}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((gameState.currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}