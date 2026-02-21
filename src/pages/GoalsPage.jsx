import { useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Badge from '../components/Badge'
import BudgetProgress from '../components/charts/BudgetProgress'
import Button from '../components/Button'

function GoalsPage() {
  const [savingsGoal, setSavingsGoal] = useState(10000)
  const [currentSavings] = useState(5000)
  const [editingGoal, setEditingGoal] = useState(false)
  const [newGoal, setNewGoal] = useState(savingsGoal)
  
  const savingsPercentage = Math.round((currentSavings / savingsGoal) * 100)
  
  const budgets = [
    { category: 'Food & Dining', spent: 8000, limit: 8000 },
    { category: 'Transport', spent: 3000, limit: 4000 },
    { category: 'Shopping', spent: 5000, limit: 6000 },
  ]
  
  const achievements = [
    { emoji: '🎉', title: 'First Upload', description: 'Uploaded your first statement', unlocked: true },
    { emoji: '🔥', title: '7-day saving streak', description: 'Saved money 7 days in a row', unlocked: false },
    { emoji: '🎯', title: 'Budget Master', description: 'Stayed within all budgets', unlocked: false },
    { emoji: '💎', title: 'Super Saver', description: 'Saved 30% of income', unlocked: false },
  ]
  
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <Navbar showTabs />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6 page-enter">
        <h1 className="text-h2 font-bold text-primary-dark mb-6">🎯 Savings Goals &amp; Budgets</h1>
        
        {/* Monthly Savings Goal */}
        <Card className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-h4 font-semibold text-primary-dark">Monthly Savings Goal</h3>
            <Button size="sm" variant="secondary" onClick={() => setEditingGoal(!editingGoal)}>
              ✏️ Edit Goal
            </Button>
          </div>
          
          {editingGoal && (
            <div className="mb-4 flex gap-3">
              <input
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(Number(e.target.value))}
                className="border border-gray-300 rounded-sm px-3 py-2 text-sm font-mono w-40"
                placeholder="Enter goal amount"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => { setSavingsGoal(newGoal); setEditingGoal(false) }}
              >
                Save
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-neutral text-sm">Current: <span className="font-mono font-bold text-primary-dark">₹{currentSavings.toLocaleString('en-IN')}</span></span>
            <span className="text-neutral text-sm">Target: <span className="font-mono font-bold text-primary-dark">₹{savingsGoal.toLocaleString('en-IN')}</span></span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: '24px' }}>
            <div
              className="h-full rounded-full flex items-center px-3 transition-all duration-500"
              style={{
                width: `${savingsPercentage}%`,
                background: 'linear-gradient(90deg, #0066FF, #003D99)',
                minWidth: savingsPercentage > 10 ? 'auto' : '40px',
              }}
            >
              <span className="text-white text-xs font-semibold">{savingsPercentage}%</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral mt-3">
            {savingsPercentage >= 100
              ? '🎉 Goal achieved! Amazing work!'
              : savingsPercentage >= 50
                ? `💪 Halfway there! Need ₹${(savingsGoal - currentSavings).toLocaleString('en-IN')} more.`
                : `📈 Keep going! Save ₹${(savingsGoal - currentSavings).toLocaleString('en-IN')} more this month.`}
          </p>
        </Card>
        
        {/* Category Budgets */}
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-h4 font-semibold text-primary-dark">Category Budgets</h3>
            <Button size="sm" variant="secondary">+ Add Budget</Button>
          </div>
          <BudgetProgress budgets={budgets} />
        </Card>
        
        {/* Achievements */}
        <Card>
          <h3 className="text-h4 font-semibold text-primary-dark mb-4">🏆 Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-md border transition-all duration-200 ${
                  achievement.unlocked
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.emoji}</div>
                <p className="font-semibold text-gray-800 text-sm">{achievement.title}</p>
                <p className="text-xs text-neutral mt-1">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge variant="success" className="mt-2 text-xs">Unlocked!</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default GoalsPage
