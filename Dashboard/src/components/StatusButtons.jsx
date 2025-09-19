const StatusButtons = ({ currentStatus, onStatusChange, disabled = false }) => {
  const statusOptions = ['Working', 'Break', 'Meeting', 'Offline']

  const getButtonClass = (status) => {
    if (currentStatus === status) {
      switch (status) {
        case 'Working': return 'btn-working'
        case 'Break': return 'btn-break'
        case 'Meeting': return 'btn-meeting'
        case 'Offline': return 'btn-offline'
        default: return ''
      }
    }
    return ''
  }

  return (
    <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
      {statusOptions.map(status => (
        <button
          key={status}
          className={getButtonClass(status)}
          onClick={() => onStatusChange(status)}
          disabled={disabled}
        >
          {status}
        </button>
      ))}
    </div>
  )
}

export default StatusButtons
