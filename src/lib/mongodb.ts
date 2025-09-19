import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'flashcard_frenzy'

interface Global {
  mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: Global

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable')
    }

    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

// MongoDB Schemas
import { Schema, model, models } from 'mongoose'

// Game Room Schema
const gameRoomSchema = new Schema({
  roomCode: { type: String, required: true, unique: true, length: 6 },
  name: { type: String, required: true },
  hostId: { type: String, required: true },
  settings: {
    maxPlayers: { type: Number, min: 2, max: 8, default: 4 },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    timePerQuestion: { type: Number, default: 30 },
    totalRounds: { type: Number, default: 10 },
    isPrivate: { type: Boolean, default: false }
  },
  players: [{
    userId: { type: String, required: true },
    username: { type: String, required: true },
    avatar: String,
    isReady: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now }
  }],
  status: { type: String, enum: ['waiting', 'in-progress', 'finished'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  finishedAt: Date
}, {
  timestamps: true
})

// Game Match Schema
const gameMatchSchema = new Schema({
  roomId: { type: String, required: true },
  players: [{
    userId: { type: String, required: true },
    username: { type: String, required: true },
    finalScore: { type: Number, default: 0 },
    position: { type: Number, required: true },
    correctAnswers: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 }
  }],
  questions: [{
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    answers: [{
      userId: { type: String, required: true },
      answer: { type: String, required: true },
      responseTime: { type: Number, required: true },
      isCorrect: { type: Boolean, required: true },
      timestamp: { type: Date, default: Date.now }
    }]
  }],
  startedAt: { type: Date, default: Date.now },
  finishedAt: Date,
  winnerId: String,
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
}, {
  timestamps: true
})

// Question Schema
const questionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: String,
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags: [String],
  createdBy: String,
  isVerified: { type: Boolean, default: false },
  usageCount: { type: Number, default: 0 },
  averageCorrectRate: { type: Number, default: 0 }
}, {
  timestamps: true
})

// User Stats Schema
const userStatsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  totalGames: { type: Number, default: 0 },
  totalWins: { type: Number, default: 0 },
  totalCorrectAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  averageResponseTime: { type: Number, default: 0 },
  categoryStats: [{
    category: String,
    gamesPlayed: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 }
  }],
  achievements: [String],
  lastPlayedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Export models
export const GameRoom = models.GameRoom || model('GameRoom', gameRoomSchema)
export const GameMatch = models.GameMatch || model('GameMatch', gameMatchSchema)
export const Question = models.Question || model('Question', questionSchema)
export const UserStats = models.UserStats || model('UserStats', userStatsSchema)

// Types
export interface IGameRoom {
  _id: string
  roomCode: string
  name: string
  hostId: string
  settings: {
    maxPlayers: number
    category: string
    difficulty: 'easy' | 'medium' | 'hard'
    timePerQuestion: number
    totalRounds: number
    isPrivate: boolean
  }
  players: Array<{
    userId: string
    username: string
    avatar?: string
    isReady: boolean
    joinedAt: Date
  }>
  status: 'waiting' | 'in-progress' | 'finished'
  createdAt: Date
  startedAt?: Date
  finishedAt?: Date
}

export interface IGameMatch {
  _id: string
  roomId: string
  players: Array<{
    userId: string
    username: string
    finalScore: number
    position: number
    correctAnswers: number
    averageResponseTime: number
  }>
  questions: Array<{
    questionId: string
    question: string
    options: string[]
    correctAnswer: string
    answers: Array<{
      userId: string
      answer: string
      responseTime: number
      isCorrect: boolean
      timestamp: Date
    }>
  }>
  startedAt: Date
  finishedAt?: Date
  winnerId?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface IQuestion {
  _id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  createdBy?: string
  isVerified: boolean
  usageCount: number
  averageCorrectRate: number
}

export interface IUserStats {
  _id: string
  userId: string
  totalGames: number
  totalWins: number
  totalCorrectAnswers: number
  totalQuestions: number
  bestStreak: number
  currentStreak: number
  averageResponseTime: number
  categoryStats: Array<{
    category: string
    gamesPlayed: number
    correctAnswers: number
    totalQuestions: number
  }>
  achievements: string[]
  lastPlayedAt: Date
}