# 🧠 Flashcard Frenzy Multiplayer

**The Ultimate Real-Time Competitive Flashcard Game**

A modern, engaging multiplayer flashcard game where players compete in real-time to answer questions across multiple categories. Built with Next.js 14, Supabase, and MongoDB.

```
🧠💡 FLASHCARD FRENZY MULTIPLAYER 💡🧠
═══════════════════════════════════════
    🎮 Real-time Competitive Learning
    ⚡ Lightning-fast Q&A Battles  
    🏆 Global Leaderboards & Rankings
    👥 Up to 8 Players per Room
═══════════════════════════════════════
```

## ✨ Features

### 🎮 Core Gameplay
- **Real-time Multiplayer**: Compete with up to 8 players simultaneously
- **Lightning-fast Responses**: Millisecond-precision timing and scoring
- **Smart Scoring System**: Points based on speed, accuracy, and streak bonuses
- **Dynamic Categories**: 1000+ questions across Math, Science, History, Geography, and more
- **Difficulty Levels**: Easy, Medium, and Hard questions to match your skill level

### 🎯 Game Modes
- **Quick Play**: Jump into a random match instantly
- **Custom Rooms**: Create private rooms with custom settings
- **Public Lobbies**: Browse and join open games
- **Spectator Mode**: Watch ongoing matches

### 🏆 Competitive Features
- **Global Leaderboards**: Daily, weekly, monthly, and all-time rankings
- **Achievement System**: Unlock badges and rewards
- **Match History**: Detailed replay system and performance analytics
- **Streak Tracking**: Build and maintain winning streaks
- **Category Statistics**: Track performance across different subjects

### 👥 Social Features
- **User Profiles**: Customizable avatars and stats
- **Friend System**: Challenge friends to matches
- **Chat Integration**: Real-time communication during games
- **Social Login**: Sign in with Google, Discord, or Apple

### 📱 Platform Features
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Progressive Web App**: Install and play offline
- **Cross-device Sync**: Continue where you left off
- **Dark Theme**: Easy on the eyes for extended play sessions

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### Backend & Database
- **Supabase** - Authentication and real-time subscriptions
- **MongoDB** - Primary database for game data
- **Mongoose** - MongoDB object modeling

### Real-time Features
- **Supabase Realtime** - Live game state synchronization
- **WebSocket connections** - Low-latency multiplayer experience

### Deployment
- **Vercel** - Optimized Next.js hosting
- **MongoDB Atlas** - Cloud database
- **Supabase Cloud** - Managed backend services

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── game/             # Live game engine
│   ├── leaderboard/      # Rankings and stats
│   └── api/              # API routes
├── components/            # Reusable React components
│   ├── AuthModal.tsx     # Authentication modal
│   ├── CreateRoomModal.tsx # Room creation
│   ├── RoomBrowser.tsx    # Room listing
│   └── LandingPage.tsx    # Marketing page
├── lib/                   # Utilities and configurations
│   ├── supabase.ts       # Supabase client setup
│   ├── mongodb.ts        # MongoDB connection
│   ├── utils.ts          # Helper functions
│   └── sampleQuestions.ts # Question database
└── middleware.ts          # Route protection
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Supabase account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/flashcard-frenzy-multiplayer.git
cd flashcard-frenzy-multiplayer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=flashcard_frenzy

# Game Configuration
NEXT_PUBLIC_MAX_PLAYERS_PER_ROOM=8
NEXT_PUBLIC_DEFAULT_QUESTION_TIME=30
NEXT_PUBLIC_DEFAULT_ROUNDS=10
```

### 4. Supabase Setup

1. Create a new Supabase project
2. Set up authentication providers (Google, Discord, Apple)
3. Create the following tables:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_games INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false
);

-- User preferences table
CREATE TABLE user_preferences (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  theme TEXT DEFAULT 'dark',
  sound_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 5. MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Create a database named `flashcard_frenzy`

### 6. Seed the Database

After starting the development server, seed the database with sample questions:

```bash
# Start the development server
npm run dev

# In another terminal, seed the database
curl -X POST http://localhost:3000/api/seed
```

### 7. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Play

### Quick Start
1. **Sign Up/Login**: Create an account or sign in with social providers
2. **Choose Game Mode**: Quick Play for instant action or browse custom rooms
3. **Answer Questions**: Race against other players to answer correctly and quickly
4. **Earn Points**: Get points for correct answers with bonuses for speed and streaks
5. **Climb Rankings**: Track your progress on global leaderboards

### Scoring System
- **Base Points**: 100 points for correct answers
- **Speed Bonus**: Up to 50 additional points for quick responses
- **Streak Multiplier**: Up to 2x points for consecutive correct answers
- **Difficulty Bonus**: Extra points for harder questions

### Game Rules
- Players have 30 seconds (configurable) to answer each question
- First correct answer gets maximum speed bonus
- Wrong answers break your streak
- Games typically consist of 10-20 questions

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Key Development Files

- **`src/app/page.tsx`** - Landing page
- **`src/app/dashboard/page.tsx`** - Main dashboard
- **`src/app/game/page.tsx`** - Live game engine
- **`src/components/AuthModal.tsx`** - Authentication system
- **`src/lib/supabase.ts`** - Supabase configuration
- **`src/lib/mongodb.ts`** - Database models and connection
- **`src/middleware.ts`** - Route protection

### Adding New Questions

Add questions to `src/lib/sampleQuestions.ts`:

```typescript
{
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
  explanation: "Why this is correct...",
  category: "Science",
  difficulty: "medium",
  tags: ["physics", "energy"],
  isVerified: true
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Using Vercel CLI
npm install -g vercel
vercel --prod
```

### Exact steps to deploy (copy/paste)

1. Create a Git repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
# create a repo on GitHub and replace <your-repo-url> below
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

2. On Vercel dashboard, click "New Project" → Import from GitHub → select your repo.

3. Add the following Environment Variables under Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_supabase_service_role_key>
MONGODB_URI=<your_mongodb_uri>
MONGODB_DB_NAME=flashcard_frenzy
NEXT_PUBLIC_MAX_PLAYERS_PER_ROOM=8
NEXT_PUBLIC_DEFAULT_QUESTION_TIME=30
NEXT_PUBLIC_DEFAULT_ROUNDS=10
```

4. Click "Deploy". Vercel will build and provide a secure HTTPS URL.

If you prefer the CLI: `vercel --prod` will deploy the current branch to production after you log in.

### Alternative Deployment Options
- **Netlify**: Great for static deployments
- **Railway**: Easy database hosting
- **DigitalOcean App Platform**: Full-stack deployment

## 📊 Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Aggressive caching for static assets
- **Lazy Loading**: Components load on demand
- **Database Indexing**: Optimized MongoDB queries
- **CDN**: Global content delivery

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Supabase** for seamless backend services
- **MongoDB** for reliable database solutions
- **Tailwind CSS** for beautiful, utility-first styling
- **Framer Motion** for smooth animations
- **Lucide** for clean, consistent icons

## 📞 Support

- **Documentation**: [docs.flashcardfrenzy.com](https://docs.flashcardfrenzy.com)
- **Discord Community**: [Join our Discord](https://discord.gg/flashcardfrenzy)
- **GitHub Issues**: Report bugs and request features
- **Email**: support@flashcardfrenzy.com

---

**Built with ❤️ for competitive learners worldwide**

*Challenge your mind. Race your friends. Become a champion.*
\nDeployment trigger: README update (for Vercel rebuild)
