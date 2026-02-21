import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="flex-1 flex flex-col"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 md:px-10" style={{ height: '60px' }}>
          <span className="text-white text-xl font-bold">💰 SnapSave</span>
        </nav>
        
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 text-center py-16 page-enter">
          <h1 className="text-3xl md:text-hero font-bold text-white mb-6 leading-tight max-w-3xl">
            Know Where Your Money Actually Goes
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-lg leading-relaxed">
            Upload your PhonePe statement. Get instant insights. 100% private. 100% in your browser.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="bg-white text-primary font-semibold text-lg px-10 py-4 rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95"
            style={{ minWidth: '240px', height: '56px' }}
          >
            📁 Upload PDF &amp; Get Started
          </button>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-2xl w-full">
            {[
              '✓ No login required',
              '✓ Data never leaves browser',
              '✓ AI-powered insights',
              '✓ Free forever',
            ].map((badge) => (
              <div key={badge} className="bg-white/20 backdrop-blur-sm rounded-md px-4 py-3 text-white text-sm font-medium text-center">
                {badge}
              </div>
            ))}
          </div>
          
          {/* Demo link */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-8 text-white/70 text-sm underline hover:text-white transition-colors"
          >
            View demo dashboard →
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center">
        <div className="flex justify-center gap-6 mb-3">
          <a href="#about" className="hover:text-white transition-colors text-sm">About</a>
          <a href="#privacy" className="hover:text-white transition-colors text-sm">Privacy</a>
          <a href="#contact" className="hover:text-white transition-colors text-sm">Contact</a>
        </div>
        <p className="text-xs">© 2025 SnapSave. Built for Indian millennials &amp; Gen-Z.</p>
      </footer>
    </div>
  )
}

export default LandingPage
