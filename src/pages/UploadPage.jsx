import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import UploadZone from '../components/UploadZone'
import { useTransactions } from '../hooks/useTransactions'
import { sampleTransactions } from '../data/sampleData'

function UploadPage() {
  const navigate = useNavigate()
  const { uploadTransactions } = useTransactions()
  
  const handleUpload = (transactions, filename) => {
    const data = transactions || sampleTransactions
    uploadTransactions(data, filename)
    setTimeout(() => navigate('/dashboard'), 1500)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 page-enter">
        <h1 className="text-h2 font-bold text-primary-dark mb-2">Upload Your PhonePe Statement</h1>
        <p className="text-neutral mb-8">Upload your PDF to get instant spending insights</p>
        
        {/* Upload Zone */}
        <UploadZone onUpload={handleUpload} />
        
        {/* Instructions */}
        <div className="mt-8 bg-white rounded-md p-6 shadow-sm">
          <h3 className="text-h4 font-semibold text-primary-dark mb-4">
            How to download your PhonePe statement:
          </h3>
          <div className="space-y-4">
            {[
              { step: 1, text: 'Open PhonePe app → Tap on your profile icon (top right)' },
              { step: 2, text: 'Go to "Transaction History" → Select date range (up to 6 months)' },
              { step: 3, text: 'Tap "Download Statement" → Choose PDF format → Share/Save to your device' },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step}
                </div>
                <p className="text-gray-700 pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Privacy Badge */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4 flex gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-semibold text-green-800">Privacy Note</p>
            <p className="text-sm text-green-700">
              Your PDF is processed entirely in your browser. No data is uploaded to any server. Your financial data stays 100% private.
            </p>
          </div>
        </div>
        
        {/* Try with sample data */}
        <div className="mt-6 text-center">
          <button
            onClick={() => handleUpload(null, 'Sample Data')}
            className="text-primary text-sm underline hover:text-primary-dark transition-colors"
          >
            Don&apos;t have a PDF? Try with sample data →
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
