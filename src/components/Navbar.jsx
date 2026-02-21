import { Link, useLocation } from 'react-router-dom'

function Navbar({ showTabs = false }) {
  const location = useLocation()
  
  const tabs = [
    { path: '/dashboard', label: 'Dashboard', emoji: '📊' },
    { path: '/insights', label: 'Insights', emoji: '🔍' },
    { path: '/goals', label: 'Goals', emoji: '🎯' },
  ]
  
  const isActive = (path) => location.pathname === path
  
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-dark no-underline">
              💰 SnapSave
            </Link>
            
            {showTabs && (
              <div className="hidden md:flex items-center gap-1">
                {tabs.map(tab => (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`px-4 py-2 font-medium text-sm transition-colors duration-200 border-b-2 no-underline ${
                      isActive(tab.path)
                        ? 'border-primary text-primary'
                        : 'border-transparent text-neutral hover:text-primary-dark'
                    }`}
                  >
                    {tab.emoji} {tab.label}
                  </Link>
                ))}
              </div>
            )}
            
            {showTabs && (
              <Link
                to="/upload"
                className="hidden md:inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary border-2 border-primary rounded-sm hover:bg-primary-light transition-colors no-underline"
              >
                📁 Upload New
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      {showTabs && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 h-16">
            {[...tabs, { path: '/upload', label: 'Upload', emoji: '📁' }].map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-medium no-underline transition-colors ${
                  isActive(tab.path) ? 'text-primary' : 'text-neutral'
                }`}
              >
                <span className="text-lg">{tab.emoji}</span>
                {tab.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  )
}

export default Navbar
