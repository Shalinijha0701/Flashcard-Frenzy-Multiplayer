'use client'

import { motion } from 'framer-motion'
import {
  Play,
  Users,
  Brain,
  Trophy,
  Zap,
  Target,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Gamepad2,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthModal from './AuthModal'

interface FloatingElement {
  id: number
  left: string
  top: string
}

export default function LandingPage() {
  const [playerCount, setPlayerCount] = useState(47832)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login')
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Initialize floating elements on client side only
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
    setFloatingElements(elements)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-purple-900">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Flashcard Frenzy</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={() => {
                setAuthModalTab('login')
                setAuthModalOpen(true)
              }}
              className="text-white hover:text-purple-300 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                setAuthModalTab('register')
                setAuthModalOpen(true)
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
            >
              Sign Up
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating elements background */}
          <div className="absolute inset-0 overflow-hidden">
            {mounted && floatingElements.map((element) => (
              <motion.div
                key={element.id}
                className="absolute w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg"
                style={{
                  left: element.left,
                  top: element.top
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6 + element.id,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <motion.div {...fadeInUp} className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white">
                {playerCount.toLocaleString()}+ players online
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Challenge Friends.
              <br />
              <span className="text-gradient">Master Knowledge.</span>
              <br />
              Win Big!
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Race against friends in real-time flashcard battles. Answer faster, climb the leaderboard,
              and become the ultimate knowledge champion in the most addictive learning game ever created.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAuthModalTab('register')
                  setAuthModalOpen(true)
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-glow transition-all"
              >
                <Play className="w-5 h-5" />
                <span>Start Playing Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Players Love
              <span className="text-gradient">Flashcard Frenzy</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the perfect blend of competitive gaming and accelerated learning
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Zap,
                title: "Real-time Competition",
                description: "Race against friends in live matches with millisecond precision",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Brain,
                title: "Smart Learning",
                description: "AI-powered question generation across 1000+ topics",
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: TrendingUp,
                title: "Track Progress",
                description: "Detailed analytics and match history to boost performance",
                color: "from-green-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Social Gaming",
                description: "Leaderboards, achievements, and friend challenges",
                color: "from-purple-500 to-pink-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="glassmorphism rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How to <span className="text-gradient">Dominate</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four simple steps to become a flashcard champion
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Create/Join Match",
                description: "Enter a room code or create your own battle arena",
                icon: Gamepad2
              },
              {
                step: "02",
                title: "Answer Faster",
                description: "Race to answer flashcards before your opponents",
                icon: Clock
              },
              {
                step: "03",
                title: "Earn Points",
                description: "Get points for speed and accuracy with streak bonuses",
                icon: Target
              },
              {
                step: "04",
                title: "Climb Leaderboard",
                description: "Rise through the ranks and become a legend",
                icon: Trophy
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-game-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the <span className="text-gradient">Community</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by students, educators, and knowledge enthusiasts worldwide
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { number: "100K+", label: "Active Players" },
              { number: "2M+", label: "Matches Played" },
              { number: "1000+", label: "Question Categories" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center glassmorphism rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Chen",
                role: "Medical Student",
                content: "This game made studying anatomy fun! I've improved my retention by 300% while competing with classmates.",
                avatar: "SC"
              },
              {
                name: "Mike Rodriguez",
                role: "High School Teacher",
                content: "My students are obsessed! They're learning history faster than ever before. Engagement is through the roof!",
                avatar: "MR"
              },
              {
                name: "Emma Thompson",
                role: "Language Learner",
                content: "I've mastered 500+ Spanish words in just one month. The competitive element keeps me coming back daily.",
                avatar: "ET"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="glassmorphism rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Game-Changing <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for the ultimate competitive learning experience
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: "Multiplayer Battles",
                description: "Up to 8 players in real-time competition"
              },
              {
                icon: Brain,
                title: "Smart Categories",
                description: "1000+ topics from Math to Medicine"
              },
              {
                icon: Award,
                title: "Custom Flashcards",
                description: "Create and share your own question sets"
              },
              {
                icon: Play,
                title: "Match Replay",
                description: "Analyze your performance frame by frame"
              },
              {
                icon: Globe,
                title: "Cross-Device Sync",
                description: "Play seamlessly across all your devices"
              },
              {
                icon: Trophy,
                title: "Achievement System",
                description: "Unlock badges and climb the rankings"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="glassmorphism rounded-2xl p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-gradient">Dominate</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 100,000+ players in the most addictive learning game ever created.
              Your brain will thank you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAuthModalTab('register')
                  setAuthModalOpen(true)
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-glow transition-all"
              >
                <Trophy className="w-5 h-5" />
                <span>Join 100K+ Players</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // create a lightweight guest identity and persist in cookie / localStorage
                  const id = 'guest_' + Math.random().toString(36).slice(2, 9)
                  const username = 'Guest' + Math.floor(Math.random() * 9000 + 1000)
                  const payload = JSON.stringify({ id, username, guest: true })
                  // set cookie for server middleware to recognize (expires in 7 days)
                  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
                  document.cookie = `guest_user=${encodeURIComponent(payload)}; path=/; expires=${expires}`
                  // also store in localStorage for client usage
                  try { localStorage.setItem('guest_user', payload) } catch { }
                  // navigate into the app dashboard
                  router.push('/dashboard')
                }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Play as Guest
              </motion.button>
            </div>

            <div className="flex justify-center space-x-4">
              <div className="text-gray-400 text-sm">Sign up with:</div>
              <div className="flex space-x-3">
                {['Google', 'Discord', 'Apple'].map((provider) => (
                  <button
                    key={provider}
                    onClick={() => {
                      setAuthModalTab('login')
                      setAuthModalOpen(true)
                    }}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Flashcard Frenzy</span>
            </div>

            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 Flashcard Frenzy. All rights reserved. Built for champions, by champions.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  )
}