import { useDispatch } from 'react-redux'
import { updateTaskProgress } from '../redux/slices/membersSlice'
import TaskItem from './TaskItem'

const MemberCard = ({ member }) => {
  const dispatch = useDispatch()

  const handleProgressUpdate = (taskId, delta) => {
    dispatch(updateTaskProgress({ 
      memberId: member.id, 
      taskId, 
      delta 
    }))
  }

  const getStatusChipClass = (status) => {
    switch (status) {
      case 'Working': return 'chip-working'
      case 'Break': return 'chip-break'
      case 'Meeting': return 'chip-meeting'
      case 'Offline': return 'chip-offline'
      default: return ''
    }
  }

  return (
    <div className="card grid">
      <div className="row">
        <div className="row" style={{ gap: 8 }}>
          <strong>{member.name}</strong>
          
          <span className={`chip ${getStatusChipClass(member.status)}`}>
            {member.status}
          </span>
        </div>
        <div className="muted">

          Active tasks: {member.tasks.filter(t => !t.completed).length}

        </div>
      </div>
      <div className="grid">
        {member.tasks.length === 0 && (
          <div className="muted">No tasks assigned</div>
        )}
        {member.tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onProgressUpdate={handleProgressUpdate}
          />
        ))}
      </div>
    </div>
  )
}

export default MemberCard
