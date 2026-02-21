import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import AlertItem from '../components/AlertItem'
import Badge from '../components/Badge'
import SpendingPieChart from '../components/charts/SpendingPieChart'
import DailyBarChart from '../components/charts/DailyBarChart'
import { useTransactions } from '../hooks/useTransactions'

function DashboardPage() {
  const { analytics, meta, loading } = useTransactions()
  
  const formatCurrency = (amount) => {
    const abs = Math.abs(amount)
    return `${amount < 0 ? '-' : ''}₹${abs.toLocaleString('en-IN')}`
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">💰</div>
          <p className="text-neutral">Loading your data...</p>
        </div>
      </div>
    )
  }
  
  const { totals, categoryBreakdown, dailySpending, financialScore } = analytics
  
  const totalSpentJan = 21200
  const spentChange = ((totals.totalSpent - totalSpentJan) / totalSpentJan * 100).toFixed(0)
  
  const aiTips = [
    { tip: 'Cut Swiggy orders to 3x/week instead of daily', saving: '₹1,800/month' },
    { tip: 'Use local chai stalls only on weekdays', saving: '₹600/month' },
    { tip: 'Switch to Amazon Prime combo for entertainment', saving: '₹430/month' },
  ]
  
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <Navbar showTabs />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6 page-enter">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-h2 font-bold text-primary-dark">Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral text-sm">📅 {meta?.month || 'February 2025'}</span>
              <Badge variant="info">{financialScore.grade} {financialScore.emoji}</Badge>
            </div>
          </div>
        </div>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon="💸"
            label="Spent"
            amount={formatCurrency(totals.totalSpent)}
            change={`${spentChange > 0 ? '+' : ''}${spentChange}% vs Jan`}
            changeType={spentChange > 0 ? 'negative' : 'positive'}
          />
          <StatCard
            icon="💰"
            label="Received"
            amount={formatCurrency(totals.totalReceived)}
            change="Same as Jan"
            changeType="neutral"
          />
          <StatCard
            icon="💵"
            label="Balance"
            amount={formatCurrency(totals.netBalance)}
            change={totals.netBalance >= 0 ? 'Positive balance' : 'Deficit'}
            changeType={totals.netBalance >= 0 ? 'positive' : 'negative'}
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <Card>
            <h3 className="text-h4 font-semibold text-primary-dark mb-4">Spending by Category</h3>
            <SpendingPieChart data={categoryBreakdown} />
          </Card>
          
          {/* Waste Alerts */}
          <Card>
            <h3 className="text-h4 font-semibold text-primary-dark mb-4">⚠️ Waste Alerts</h3>
            <div className="space-y-3">
              <AlertItem
                merchant="Chai Wala"
                details="₹50 × 25 = ₹1,250"
                insight="💡 That's ₹15,000/year! Try reducing to 2x/day."
              />
              <AlertItem
                merchant="Swiggy"
                details="₹350 × 18 = ₹6,300"
                insight="💡 Cook 6 meals = save ₹1,400/month!"
              />
              <AlertItem
                merchant="Zomato"
                details="₹390 × 8 = ₹3,120"
                insight="💡 Meal prep on weekends saves ₹1,500/month."
              />
            </div>
          </Card>
        </div>
        
        {/* Daily Spending Chart */}
        <Card className="mb-6">
          <h3 className="text-h4 font-semibold text-primary-dark mb-1">Daily Spending — February 2025</h3>
          <p className="text-neutral text-sm mb-4">Your spending pattern across the month</p>
          <DailyBarChart data={dailySpending} />
          <p className="text-sm text-neutral mt-3">
            💡 Highest spending day was around mid-month. Plan better for weekends!
          </p>
        </Card>
        
        {/* AI Tips */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-h4 font-semibold text-primary-dark">✨ AI Money Saving Tips</h3>
          </div>
          <div className="space-y-3 mb-4">
            {aiTips.map((tip, index) => (
              <div key={index} className="flex gap-3 p-3 bg-green-50 rounded-md">
                <span className="text-primary-dark font-bold text-lg">{index + 1}.</span>
                <div>
                  <p className="text-gray-800">{tip.tip}</p>
                  <p className="text-success font-bold mt-1">Save {tip.saving}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 border-2 border-primary text-primary font-semibold rounded-sm hover:bg-primary-light transition-colors">
            ✨ Generate More Tips
          </button>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
