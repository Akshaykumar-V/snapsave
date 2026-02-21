import { useState, useEffect, useCallback } from 'react'
import { sampleTransactions } from '../data/sampleData'
import { saveTransactions, loadTransactions, saveMeta, loadMeta, clearAll } from '../utils/storage'
import { calculateTotals, getCategoryBreakdown, getDailySpending, getTopMerchants, getRepeatedExpenses, getTimePatterns, calculateFinancialScore } from '../utils/analytics'

export function useTransactions() {
  const [transactions, setTransactions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    const stored = loadTransactions()
    const storedMeta = loadMeta()
    if (stored) {
      setTransactions(stored)
      setMeta(storedMeta)
    } else {
      // Use sample data as default
      setTransactions(sampleTransactions)
      setMeta({ filename: 'Sample Data', uploadedAt: new Date().toISOString(), month: 'February 2025' })
    }
    setLoading(false)
  }, [])

  const uploadTransactions = useCallback((newTransactions, filename) => {
    const newMeta = {
      filename,
      uploadedAt: new Date().toISOString(),
      month: 'February 2025',
    }
    setTransactions(newTransactions)
    setMeta(newMeta)
    saveTransactions(newTransactions)
    saveMeta(newMeta)
  }, [])

  const resetTransactions = useCallback(() => {
    clearAll()
    setTransactions(sampleTransactions)
    setMeta({ filename: 'Sample Data', uploadedAt: new Date().toISOString(), month: 'February 2025' })
  }, [])

  const analytics = transactions ? {
    totals: calculateTotals(transactions),
    categoryBreakdown: getCategoryBreakdown(transactions),
    dailySpending: getDailySpending(transactions),
    topMerchants: getTopMerchants(transactions),
    repeatedExpenses: getRepeatedExpenses(transactions),
    timePatterns: getTimePatterns(transactions),
    financialScore: calculateFinancialScore(transactions),
  } : null

  return {
    transactions,
    loading,
    meta,
    analytics,
    uploadTransactions,
    resetTransactions,
  }
}
