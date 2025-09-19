'use client'

import { AlertTriangle, ExternalLink } from 'lucide-react'
import { IS_SUPABASE_CONFIGURED } from '@/lib/supabase'

export default function ConfigNotice() {
  if (IS_SUPABASE_CONFIGURED) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-400 mb-1">
              Demo Mode
            </h3>
            <p className="text-xs text-yellow-300/80 mb-2">
              Authentication is disabled. You can explore the app as a guest.
            </p>
            <a
              href="https://github.com/Shalinijha0701/Flashcard-Frenzy-Multiplayer#setup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Setup Guide
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}