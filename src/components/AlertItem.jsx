function AlertItem({ merchant, details, insight, bgColor = 'bg-orange-50' }) {
  return (
    <div className={`${bgColor} rounded-md p-4 border border-orange-100`}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-gray-800">{merchant}</span>
        <span className="font-mono font-bold text-error text-sm">{details}</span>
      </div>
      <p className="text-small text-neutral">{insight}</p>
    </div>
  )
}

export default AlertItem
