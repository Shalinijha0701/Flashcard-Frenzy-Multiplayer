import connectDB, { Question } from './mongodb'
import { sampleQuestions } from './sampleQuestions'

export async function seedDatabase() {
  try {
    await connectDB()
    
    // Clear existing questions
    await Question.deleteMany({})
    
    // Insert sample questions
    const questions = sampleQuestions.map(q => ({
      ...q,
      usageCount: Math.floor(Math.random() * 100),
      averageCorrectRate: Math.random() * 0.5 + 0.3 // Between 30% and 80%
    }))
    
    await Question.insertMany(questions)
    
    console.log(`✅ Seeded ${questions.length} questions successfully`)
    return { success: true, count: questions.length }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function getQuestionsByCategory(category: string, difficulty?: string, limit: number = 10) {
  try {
    await connectDB()
    
    const filter: any = { category, isVerified: true }
    if (difficulty) {
      filter.difficulty = difficulty
    }
    
    const questions = await Question.find(filter)
      .limit(limit)
      .select('-__v')
      .lean()
    
    return questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}

export async function getRandomQuestions(count: number = 10, difficulty?: string) {
  try {
    await connectDB()
    
    const filter: any = { isVerified: true }
    if (difficulty) {
      filter.difficulty = difficulty
    }
    
    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: count } }
    ])
    
    return questions
  } catch (error) {
    console.error('Error fetching random questions:', error)
    return []
  }
}

export async function incrementQuestionUsage(questionId: string) {
  try {
    await connectDB()
    await Question.findByIdAndUpdate(questionId, { $inc: { usageCount: 1 } })
  } catch (error) {
    console.error('Error incrementing question usage:', error)
  }
}

export async function updateQuestionStats(questionId: string, isCorrect: boolean) {
  try {
    await connectDB()
    
    const question = await Question.findById(questionId)
    if (!question) return
    
    const currentRate = question.averageCorrectRate
    const currentCount = question.usageCount
    
    // Calculate new average correct rate
    const newRate = (currentRate * currentCount + (isCorrect ? 1 : 0)) / (currentCount + 1)
    
    await Question.findByIdAndUpdate(questionId, {
      $inc: { usageCount: 1 },
      $set: { averageCorrectRate: newRate }
    })
  } catch (error) {
    console.error('Error updating question stats:', error)
  }
}