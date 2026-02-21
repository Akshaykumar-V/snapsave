function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    default: 'bg-gray-100 text-gray-700',
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-caption font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
