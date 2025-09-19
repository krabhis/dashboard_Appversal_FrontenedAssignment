import { useDispatch } from 'react-redux'
import { setStatusForMember, updateTaskProgress } from '../redux/slices/membersSlice'
import StatusButtons from './StatusButtons'
import TaskItem from './TaskItem'

const MyTasks = ({ currentUser }) => {
  const dispatch = useDispatch()

  const handleStatusChange = (status) => {
    dispatch(setStatusForMember({ 
      memberId: currentUser.id, 
      status 
    }))
  }

  const handleProgressUpdate = (taskId, delta) => {
    dispatch(updateTaskProgress({ 
      memberId: currentUser.id, 
      taskId, 
      delta 
    }))
  }

  return (
    <div id="mytasks" className="grid">
      <div className="card">
        <h3>Hello, {currentUser.name}</h3>
        <StatusButtons 
          currentStatus={currentUser.status}
          onStatusChange={handleStatusChange}
        />
      </div>
      
      <div className="grid">
        {currentUser.tasks.length === 0 && (
          <div className="muted">No tasks yet</div>
        )}
        {currentUser.tasks.map(task => (
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

export default MyTasks
