function StatCard({ icon, label, amount, change, changeType = 'neutral' }) {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-neutral',
  }
  
  const changeArrows = {
    positive: '↑',
    negative: '↑',
    neutral: '→',
  }
  
  return (
    <div className="bg-white rounded-md p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-caption uppercase tracking-wider text-neutral font-medium mb-1">{label}</p>
      <p className="font-mono text-3xl font-bold text-primary-dark mb-2">{amount}</p>
      {change && (
        <p className={`text-small font-medium ${changeColors[changeType]}`}>
          {changeType !== 'neutral' && changeArrows[changeType]} {change}
        </p>
      )}
    </div>
  )
}

export default StatCard
