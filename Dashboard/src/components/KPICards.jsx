const KPICards = ({ summary }) => {
  const kpiData = [
    { 
      key: 'Working', 
      value: summary.Working, 
      className: 'kpi-working' 
    },
    { 
      key: 'Meeting', 
      value: summary.Meeting, 
      className: 'kpi-meeting' 
    },
    { 
      key: 'Break', 
      value: summary.Break, 
      className: 'kpi-break' 
    },
    { 
      key: 'Offline', 
      value: summary.Offline, 
      className: 'kpi-offline' 
    }
  ]

  return (
    <div className="kpis">
      {kpiData.map(({ key, value, className }) => (
        <div key={key} className={`kpi ${className}`}>
          <div className="title">{key}</div>
          <div className="value">{value}</div>
        </div>
      ))}
    </div>
  )
}

export default KPICards
