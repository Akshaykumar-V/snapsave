import { CATEGORY_COLORS } from '../data/sampleData'

export function calculateTotals(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const credits = transactions.filter(t => t.type === 'credit')
  
  const totalSpent = debits.reduce((sum, t) => sum + t.amount, 0)
  const totalReceived = credits.reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalReceived - totalSpent
  
  return { totalSpent, totalReceived, netBalance }
}

export function getCategoryBreakdown(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const categoryMap = {}
  
  debits.forEach(t => {
    const cat = t.category || 'Other'
    categoryMap[cat] = (categoryMap[cat] || 0) + t.amount
  })
  
  const total = Object.values(categoryMap).reduce((sum, v) => sum + v, 0)
  
  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
    percentage: total > 0 ? Math.round((value / total) * 100) : 0,
    color: CATEGORY_COLORS[name] || '#B2BEC3',
  })).sort((a, b) => b.value - a.value)
}

export function getDailySpending(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const dailyMap = {}
  
  debits.forEach(t => {
    const day = new Date(t.date).getDate()
    dailyMap[day] = (dailyMap[day] || 0) + t.amount
  })
  
  return Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    amount: dailyMap[i + 1] || 0,
  }))
}

export function getTopMerchants(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const merchantMap = {}
  
  debits.forEach(t => {
    if (!merchantMap[t.merchant]) {
      merchantMap[t.merchant] = { total: 0, count: 0 }
    }
    merchantMap[t.merchant].total += t.amount
    merchantMap[t.merchant].count += 1
  })
  
  return Object.entries(merchantMap)
    .map(([merchant, data]) => ({
      merchant,
      total: data.total,
      count: data.count,
      avg: Math.round(data.total / data.count),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
}

export function getRepeatedExpenses(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const merchantMap = {}
  
  debits.forEach(t => {
    if (!merchantMap[t.merchant]) {
      merchantMap[t.merchant] = { total: 0, count: 0 }
    }
    merchantMap[t.merchant].total += t.amount
    merchantMap[t.merchant].count += 1
  })
  
  return Object.entries(merchantMap)
    .filter(([, data]) => data.count >= 3)
    .map(([merchant, data]) => ({
      merchant,
      count: data.count,
      total: data.total,
    }))
    .sort((a, b) => b.total - a.total)
}

export function getTimePatterns(transactions) {
  const debits = transactions.filter(t => t.type === 'debit')
  const patterns = {
    Morning: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
    Afternoon: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
    Evening: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
    Night: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  }
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  debits.forEach(t => {
    const date = new Date(t.date)
    const dayName = days[date.getDay()]
    // Since we don't have time data, distribute randomly for demo
    const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night']
    const timeSlot = timeSlots[t.id % 4]
    patterns[timeSlot][dayName] = (patterns[timeSlot][dayName] || 0) + t.amount
  })
  
  return patterns
}

export function calculateFinancialScore(transactions) {
  const { totalSpent, totalReceived } = calculateTotals(transactions)
  const savingsRate = totalReceived > 0 ? (totalReceived - totalSpent) / totalReceived : 0
  
  if (savingsRate >= 0.3) return { grade: 'A', emoji: '🌟' }
  if (savingsRate >= 0.2) return { grade: 'B', emoji: '📊' }
  if (savingsRate >= 0.1) return { grade: 'C', emoji: '📈' }
  if (savingsRate >= 0) return { grade: 'D', emoji: '⚠️' }
  return { grade: 'F', emoji: '🚨' }
}
