import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seedDatabase'

export async function POST() {
  try {
    const result = await seedDatabase()
    
    if (result.success) {
      return NextResponse.json({ 
        message: `Database seeded successfully with ${result.count} questions`,
        success: true 
      })
    } else {
      return NextResponse.json({ 
        message: `Failed to seed database: ${result.error}`,
        success: false 
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ 
      message: 'Internal server error',
      success: false 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to seed the database',
    success: false 
  }, { status: 405 })
}