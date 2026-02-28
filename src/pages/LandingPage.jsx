import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [openFaq, setOpenFaq] = useState(null)

  const features = [
    { emoji: '📊', title: 'Smart Analytics', desc: 'Beautiful pie charts, bar graphs, and spending breakdowns — instantly generated from your PhonePe PDF.' },
    { emoji: '🤖', title: 'AI Financial Advisor', desc: 'Groq AI (Llama 3.3 70B) analyzes your spending and gives personalized tips in Indian context with ₹ amounts.' },
    { emoji: '🎯', title: 'Budget Goals', desc: 'Set monthly savings targets and per-category budgets. Track progress with visual bars and auto-achievements.' },
    { emoji: '🔒', title: '100% Private', desc: 'Only aggregated summaries go to AI — never raw transactions. Your data stays in your encrypted account.' },
    { emoji: '⚡', title: 'Instant Parsing', desc: 'Drop your PhonePe PDF and see 200+ transactions categorized in under 10 seconds. Zero manual entry.' },
    { emoji: '🔍', title: 'Waste Detection', desc: 'Automatically detects repeated small expenses (chai, snacks, subscriptions) that silently drain your wallet.' },
  ]

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up in 10 seconds with just your email. No phone number or KYC needed.', icon: '👤' },
    { num: '02', title: 'Upload PDF', desc: 'Download your PhonePe statement and drag-drop it. We parse every transaction automatically.', icon: '📄' },
    { num: '03', title: 'Get Insights', desc: 'See your dashboard with charts, scores, waste alerts, and AI-powered saving tips instantly.', icon: '💡' },
  ]

  const stats = [
    { value: '228+', label: 'Transactions Parsed', sub: 'per statement' },
    { value: '8', label: 'Smart Categories', sub: 'auto-classified' },
    { value: '9', label: 'Analytics Functions', sub: 'deep insights' },
    { value: '<10s', label: 'Processing Time', sub: 'PDF to dashboard' },
  ]

  const faqs = [
    { q: 'Which bank statements are supported?', a: 'Currently we support PhonePe UPI transaction history PDFs. Support for GPay, Paytm, and bank statements (HDFC, SBI, ICICI) is coming in v1.1.' },
    { q: 'Is my financial data safe?', a: 'Yes. Your PDF is parsed on our secure server and stored in your encrypted MongoDB account. Only aggregated summaries (not raw transactions) are sent to the AI for tips. We never share or sell your data.' },
    { q: 'How does the AI advisor work?', a: 'We use Groq\'s Llama 3.3 70B model. It receives a privacy-safe summary of your spending (totals, categories, top merchants) and returns 3-5 personalized money-saving tips tailored for Indian users.' },
    { q: 'Is it really free?', a: 'Yes, SnapSave is completely free. No premium tier, no hidden charges, no ads. We built this as a passion project for the Indian Gen-Z community.' },
    { q: 'Can I delete my data?', a: 'Absolutely. There\'s a "Clear Data" button on the dashboard that permanently deletes all your transactions from both the server and your browser in one click.' },
    { q: 'How do I download my PhonePe statement?', a: 'Open PhonePe → Profile icon → Transaction History → Select date range → Download Statement → Choose PDF. Then upload that PDF to SnapSave.' },
  ]
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Hero Section */}
      <div
        className="flex-1 flex flex-col relative overflow-hidden ai-gradient-bg"
      >
        {/* Animated AI orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl ai-orb" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl ai-orb" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl ai-orb" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl ai-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl ai-pulse" style={{ animationDelay: '2s' }} />
          {/* Grid overlay for AI feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-white text-xl font-bold">SnapSave</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-white/60 text-sm hidden md:inline">👋 {user?.name}</span>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-white text-sm font-medium glass-dark px-5 py-2.5 rounded-full hover:bg-white/20 transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-white/80 text-sm font-medium hover:text-white transition-colors hidden md:block"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-sm font-semibold bg-white text-gray-900 px-6 py-2.5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 text-center py-20 relative z-10">
          <div className="page-enter">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-sm font-medium">🇮🇳 Built for Indian millennials & Gen-Z</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl text-shadow">
              Know Where Your Money
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Actually Goes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-4 max-w-2xl mx-auto leading-relaxed text-center">
              Upload your PhonePe statement. Get AI-powered insights, smart categorization, waste detection, and personalized saving tips — all in under 10 seconds.
            </p>
            <p className="text-sm text-white/40 mb-10 max-w-lg mx-auto text-center">
              No manual data entry. No spreadsheets. Just one PDF upload and you'll finally understand your UPI spending.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/upload' : '/auth')}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 min-w-[220px]"
              >
                {isAuthenticated ? '📁 Upload PDF' : '🚀 Get Started Free'}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-white font-medium border border-white/30 px-6 py-4 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                View Demo →
              </button>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl w-full slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            {[
              { icon: '🔒', text: 'Bank-Level Security' },
              { icon: '🧠', text: 'Llama 3.3 70B AI' },
              { icon: '📈', text: '9+ Analytics' },
              { icon: '✨', text: 'Free Forever' },
            ].map((badge) => (
              <div key={badge.text} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-5 text-center group hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-default">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
                <span className="text-white text-sm font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 border-y border-gray-800 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-white font-medium text-sm">{s.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem → Solution */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              You spend ₹15,000/month on UPI but can't tell where it went
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              PhonePe shows a transaction list, not insights. You're left guessing why your bank balance drops while ₹30 chai runs and ₹99 subscriptions silently add up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Without SnapSave */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <div className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">❌ Without SnapSave</div>
              <ul className="space-y-3">
                {[
                  'Scroll through 200+ transactions manually',
                  'No idea which category eats most money',
                  'Repeated small expenses go unnoticed',
                  'Savings goals are just mental notes',
                  'Month ends with ₹0 and no clue why',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-700/80 text-sm">
                    <span className="mt-0.5">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* With SnapSave */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <div className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">✅ With SnapSave</div>
              <ul className="space-y-3">
                {[
                  'One PDF upload → full spending dashboard',
                  'Auto-categorized: Food, Transport, Shopping…',
                  'Waste alerts flag your "latte factor" expenses',
                  'Visual budget goals with progress tracking',
                  'AI advisor gives actionable ₹ saving tips',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-green-700/80 text-sm">
                    <span className="mt-0.5">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              From PDF to insights in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">3 simple steps</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">No complex setup. No bank linking. No permissions needed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center group hover:border-purple-500/40 transition-all duration-300">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Step {step.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-700 text-2xl z-10">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Everything you need to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">save smarter</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">One platform to analyze, plan, and optimize your spending — powered by AI and designed for Indian UPI users.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What You Get - Dashboard Preview */}
      <div className="bg-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Your Dashboard</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Here's what you'll see after uploading
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">A complete financial picture from one PhonePe PDF.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🍩', title: 'Spending Pie Chart', desc: 'See exactly what % goes to Food, Transport, Shopping, Bills, Entertainment, and more. Interactive donut chart with color-coded categories.' },
              { icon: '📊', title: 'Daily Bar Chart', desc: 'Visualize your spending by day of week. Instantly spot your biggest spending days and plan accordingly.' },
              { icon: '💰', title: 'Monthly Overview', desc: 'Total spent, total income, net savings, average transaction — all your key financial numbers at a glance.' },
              { icon: '⚠️', title: 'Waste Alerts', desc: 'Auto-detects repeated small transactions like daily chai, snacks, or micro-subscriptions that add up silently.' },
              { icon: '🤖', title: 'AI Saving Tips', desc: 'Groq\'s Llama 3.3 70B reads your summary and gives 3-5 specific, actionable tips like "Switch to monthly bus pass to save ₹800/month".' },
              { icon: '🎯', title: 'Goal Tracker', desc: 'Set a savings target like ₹5000/month and category budgets. See progress bars fill up and earn achievement badges.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="ai-orb" style={{ width: '300px', height: '300px', top: '10%', left: '80%' }} />
          <div className="ai-orb" style={{ width: '200px', height: '200px', top: '60%', left: '10%', animationDelay: '-4s' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/10 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Powered by AI</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Personal AI Financial Advisor
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            SnapSave uses Groq's ultra-fast Llama 3.3 70B model to analyze your spending patterns and generate personalized, India-specific money advice.
          </p>

          <div className="bg-gray-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🤖</span>
              <span className="text-purple-400 font-semibold text-sm">AI Advisor says:</span>
            </div>
            <div className="space-y-3">
              {[
                '💡 "You spent ₹2,340 on food delivery this month. Cooking 3 meals/week at home could save ₹1,400."',
                '☕ "Your daily ₹30 chai habit = ₹900/month. Consider a ₹500 monthly thermos — saves ₹400/month."',
                '🚗 "Transport costs peaked on weekends. A monthly metro pass (₹1,250) would save ₹800 vs daily tickets."',
              ].map((tip, i) => (
                <div key={i} className="bg-white/5 rounded-xl px-4 py-3 text-white/80 text-sm leading-relaxed border border-white/5">
                  {tip}
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-white/30 text-center">
              ⚡ Generated in &lt;2 seconds by Groq • Only aggregated data sent — never raw transactions
            </div>
          </div>
        </div>
      </div>

      {/* How PhonePe Statement Download */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Quick Guide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How to download your PhonePe statement
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">It takes less than 30 seconds. Here's exactly what to do:</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Open PhonePe', desc: 'Tap your profile icon in the top-left corner', icon: '📱' },
              { step: '2', title: 'Transaction History', desc: 'Scroll down and tap "Transaction History"', icon: '📋' },
              { step: '3', title: 'Select Range', desc: 'Choose the date range (1 month, 3 months, etc.)', icon: '📅' },
              { step: '4', title: 'Download PDF', desc: 'Tap "Download Statement" → Choose PDF format', icon: '⬇️' },
            ].map((s, i) => (
              <div key={i} className="bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-3">{s.step}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-950 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-pink-500/10 text-pink-400 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Smart Categorization</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Every transaction, automatically sorted
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our keyword engine maps merchants to 8 smart categories. Swiggy → Food. Uber → Transport. Amazon → Shopping. No manual tagging.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { emoji: '🍕', name: 'Food & Dining', examples: 'Swiggy, Zomato, Chai' },
              { emoji: '🚗', name: 'Transport', examples: 'Uber, Ola, Metro' },
              { emoji: '🛍️', name: 'Shopping', examples: 'Amazon, Flipkart, Myntra' },
              { emoji: '💡', name: 'Bills & Utilities', examples: 'Electricity, WiFi, Gas' },
              { emoji: '🎬', name: 'Entertainment', examples: 'Netflix, Spotify, PVR' },
              { emoji: '💊', name: 'Health', examples: 'Apollo, Practo, PharmEasy' },
              { emoji: '💸', name: 'Transfers', examples: 'UPI to friends, self' },
              { emoji: '📦', name: 'Other', examples: 'Miscellaneous spends' },
            ].map((cat, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center hover:border-gray-700 transition-all">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <h3 className="font-bold text-white text-sm mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-xs">{cat.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security / Privacy Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Privacy First</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Your financial data is safe. Period.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We designed SnapSave with privacy at the core. Here's exactly how we protect your data:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔐', title: 'Encrypted Storage', desc: 'All data stored in MongoDB Atlas with AES-256 encryption at rest. JWT tokens for secure authentication.' },
              { icon: '🛡️', title: 'Privacy-Safe AI', desc: 'Only aggregated totals and category breakdowns are sent to AI. Never raw transaction descriptions or merchant names.' },
              { icon: '🗑️', title: 'One-Click Delete', desc: 'Clear all your data permanently from both server and browser with a single button. No residual data, no backups.' },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 border border-green-100 rounded-2xl p-7 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-950 py-16 px-4 border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6 font-medium">Built With</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: 'React', color: 'text-cyan-400' },
              { name: 'Node.js', color: 'text-green-400' },
              { name: 'MongoDB', color: 'text-emerald-400' },
              { name: 'Tailwind CSS', color: 'text-sky-400' },
              { name: 'Groq AI', color: 'text-purple-400' },
              { name: 'Vite', color: 'text-yellow-400' },
              { name: 'Recharts', color: 'text-pink-400' },
              { name: 'JWT Auth', color: 'text-orange-400' },
            ].map((tech, i) => (
              <span key={i} className={`${tech.color} bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium`}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-lg">Everything you need to know about SnapSave.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">{faq.q}</span>
                  <span className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="ai-gradient-bg py-20 px-4">
          <div className="ai-orb" style={{ width: '250px', height: '250px', top: '20%', left: '70%' }} />
          <div className="ai-orb" style={{ width: '180px', height: '180px', top: '50%', left: '15%', animationDelay: '-3s' }} />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to take control of your money?</h2>
            <p className="text-white/60 mb-4 text-lg">Join smart savers who finally understand where their UPI payments go.</p>
            <p className="text-white/40 mb-8 text-sm">Free forever • No credit card • Setup in 60 seconds</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/upload' : '/auth')}
                className="bg-white text-gray-900 font-semibold text-lg px-10 py-4 rounded-full shadow-lg shadow-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                {isAuthenticated ? 'Go to Dashboard →' : 'Start for Free →'}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-white font-medium border border-white/30 px-6 py-4 rounded-full hover:bg-white/10 transition-all"
              >
                Try Demo First →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-12 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span>💰</span>
                <span className="font-bold text-white text-lg">SnapSave</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                India's smartest UPI expense tracker. Upload your PhonePe statement, get AI-powered insights, and start saving more money.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300 text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/auth')} className="hover:text-white transition-colors">Sign Up Free</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">View Demo</button></li>
                <li><span className="text-gray-600">GPay Support (Coming Soon)</span></li>
                <li><span className="text-gray-600">Paytm Support (Coming Soon)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300 text-sm mb-3">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>Smart Categorization</li>
                <li>AI Financial Tips</li>
                <li>Budget Goals</li>
                <li>Waste Detection</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2025 SnapSave. Built with ❤️ for Indian millennials & Gen-Z.</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>React + Vite</span>
              <span>•</span>
              <span>Node.js + Express</span>
              <span>•</span>
              <span>MongoDB Atlas</span>
              <span>•</span>
              <span>Groq AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
