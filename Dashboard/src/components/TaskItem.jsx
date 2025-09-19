const TaskItem = ({ task, onProgressUpdate, isDashed = false }) => {
  const getProgressBarClass = (progress) => {
    if (progress === 100) return 'progress-ok'
    if (progress >= 50) return 'progress-mid'
    return 'progress-low'
  }

  return (
    <div 
      className="card" 
      style={{ borderStyle: isDashed ? 'dashed' : 'solid' }}
    >
      <div className="row">
        <div>
          <div><strong>{task.title}</strong></div>
          <div className="muted" style={{ fontSize: 12 }}>
            Due: {task.dueDate}
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button 
            onClick={() => onProgressUpdate(task.id, -10)}
            disabled={task.progress <= 0}
          >
            -10%
          </button>
          <div className="progress">
            <div 
              className={`progress-bar ${getProgressBarClass(task.progress)}`} 
              style={{ width: `${task.progress}%` }} 
            />
          </div>
          <button 
            onClick={() => onProgressUpdate(task.id, 10)}
            disabled={task.progress >= 100}
          >
            +10%
          </button>
          <span className="muted" style={{ fontSize: 12 }}>
            {task.progress}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
