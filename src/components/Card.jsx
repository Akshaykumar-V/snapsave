function Card({ children, className = '', hover = true }) {
  return (
    <div className={`bg-white rounded-md p-6 shadow-sm ${hover ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Card
