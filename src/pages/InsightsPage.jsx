import { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import TimeHeatmap from '../components/charts/TimeHeatmap'
import { useTransactions } from '../hooks/useTransactions'
import { sampleJanTransactions } from '../data/sampleData'

function InsightsPage() {
  const { analytics, loading } = useTransactions()
  const [showMore, setShowMore] = useState(false)
  
  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🔍</div>
          <p className="text-neutral">Loading insights...</p>
        </div>
      </div>
    )
  }
  
  const { topMerchants, repeatedExpenses, timePatterns, categoryBreakdown } = analytics
  
  const displayedMerchants = showMore ? topMerchants : topMerchants.slice(0, 5)
  
  const getChangeIcon = (feb, jan) => {
    if (feb > jan * 1.05) return { icon: '↑', color: 'text-error' }
    if (feb < jan * 0.95) return { icon: '↓', color: 'text-success' }
    return { icon: '→', color: 'text-neutral' }
  }
  
  const totalWaste = repeatedExpenses.reduce((sum, e) => sum + e.total, 0)
  const potentialSavings = [
    { condition: 'IF you reduce Swiggy to 3x/week', saving: 1800 },
    { condition: 'IF you cut Chai Wala to once a day', saving: 750 },
    { condition: 'IF you cancel unused subscriptions', saving: 499 },
    { condition: 'IF you use Ola Pass instead of per ride', saving: 266 },
  ]
  const totalSavings = potentialSavings.reduce((sum, s) => sum + s.saving, 0)
  
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <Navbar showTabs />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6 page-enter">
        <h1 className="text-h2 font-bold text-primary-dark mb-6">
          🔍 Deep Insights — February 2025
        </h1>
        
        {/* Top Merchants Table */}
        <Card className="mb-6">
          <h3 className="text-h4 font-semibold text-primary-dark mb-4">Top 10 Merchants</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-neutral font-medium">#</th>
                  <th className="text-left py-2 px-3 text-neutral font-medium">Merchant</th>
                  <th className="text-right py-2 px-3 text-neutral font-medium">Total</th>
                  <th className="text-right py-2 px-3 text-neutral font-medium">Count</th>
                  <th className="text-right py-2 px-3 text-neutral font-medium">Avg/txn</th>
                </tr>
              </thead>
              <tbody>
                {displayedMerchants.map((merchant, index) => (
                  <tr key={index} className={`border-b border-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-3 text-neutral">{index + 1}</td>
                    <td className="py-3 px-3 font-medium text-gray-800">{merchant.merchant}</td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-primary-dark">{formatCurrency(merchant.total)}</td>
                    <td className="py-3 px-3 text-right text-neutral">{merchant.count}×</td>
                    <td className="py-3 px-3 text-right font-mono text-neutral">{formatCurrency(merchant.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {topMerchants.length > 5 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-3 text-primary text-sm font-medium hover:underline"
            >
              {showMore ? 'Show less ↑' : `Show more (${topMerchants.length - 5} more) ↓`}
            </button>
          )}
        </Card>
        
        {/* Month Comparison + Repeated Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Month Comparison */}
          <Card>
            <h3 className="text-h4 font-semibold text-primary-dark mb-4">Month Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-neutral font-medium">Category</th>
                    <th className="text-right py-2 text-neutral font-medium">Feb</th>
                    <th className="text-right py-2 text-neutral font-medium">Jan</th>
                    <th className="text-right py-2 text-neutral font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryBreakdown.map((cat, index) => {
                    const janCat = sampleJanTransactions.find(j => j.category === cat.name)
                    const janAmount = janCat?.total || 0
                    const change = getChangeIcon(cat.value, janAmount)
                    const pctChange = janAmount > 0 ? Math.round(((cat.value - janAmount) / janAmount) * 100) : 0
                    
                    return (
                      <tr key={index} className={`border-b border-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="py-2 font-medium text-gray-700">{cat.name}</td>
                        <td className="py-2 text-right font-mono text-sm">{formatCurrency(cat.value)}</td>
                        <td className="py-2 text-right font-mono text-sm text-neutral">{formatCurrency(janAmount)}</td>
                        <td className={`py-2 text-right font-semibold ${change.color}`}>
                          {change.icon} {pctChange !== 0 && `${Math.abs(pctChange)}%`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded">
              💡 Food spending is your highest category this month!
            </p>
          </Card>
          
          {/* Repeated Expenses */}
          <Card>
            <h3 className="text-h4 font-semibold text-primary-dark mb-4">Repeated Small Expenses</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-neutral font-medium">Merchant</th>
                    <th className="text-right py-2 text-neutral font-medium">Count</th>
                    <th className="text-right py-2 text-neutral font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {repeatedExpenses.map((expense, index) => (
                    <tr key={index} className={`border-b border-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="py-2 font-medium text-gray-700">{expense.merchant}</td>
                      <td className="py-2 text-right text-neutral">{expense.count}×</td>
                      <td className="py-2 text-right font-mono font-semibold text-error">{formatCurrency(expense.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded">
              💡 Total waste: {formatCurrency(totalWaste)}/month
            </p>
          </Card>
        </div>
        
        {/* Time Heatmap */}
        <Card className="mb-6">
          <h3 className="text-h4 font-semibold text-primary-dark mb-2">Time Patterns</h3>
          <p className="text-neutral text-sm mb-4">When do you spend the most?</p>
          <TimeHeatmap patterns={timePatterns} />
          <div className="mt-4 text-sm text-neutral space-y-1">
            <p>💡 You tend to spend more on weekday evenings — consider planning your meals ahead.</p>
            <p>💡 Weekend shopping accounts for 40% of your total shopping spend.</p>
          </div>
        </Card>
        
        {/* Potential Savings */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-h4 font-semibold text-success">💚 Potential Savings</h3>
          </div>
          <div className="space-y-3 mb-4">
            {potentialSavings.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                <p className="text-gray-700 text-sm">{item.condition}</p>
                <p className="text-success font-bold font-mono ml-4 flex-shrink-0">{formatCurrency(item.saving)}/mo</p>
              </div>
            ))}
          </div>
          <div className="bg-green-100 rounded-md p-4 text-center">
            <p className="text-success font-bold text-lg">
              {formatCurrency(totalSavings)}/month = {formatCurrency(totalSavings * 12)}/year 🎉
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default InsightsPage
