import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskToMember } from '../redux/slices/membersSlice'

const TaskAssignmentForm = () => {
  const dispatch = useDispatch()
  const { list } = useSelector(s => s.members)
  
  const [taskForm, setTaskForm] = useState({ 
    memberId: '', 
    title: '', 
    dueDate: '' 
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!taskForm.memberId || !taskForm.title || !taskForm.dueDate) {
      return
    }

    dispatch(addTaskToMember(taskForm))
    setTaskForm({ memberId: '', title: '', dueDate: '' })
  }

  const handleInputChange = (field, value) => {
    setTaskForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="assign" className="card grid">
      <h3>Assign Task</h3>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label className="label">Member</label>
          <select 
            value={taskForm.memberId} 
            onChange={e => handleInputChange('memberId', e.target.value)}
          >
            <option value="">Select member</option>
            {list.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="label">Task title</label>
          <input 
            className="input" 
            placeholder="e.g., Prepare report" 
            value={taskForm.title} 
            onChange={e => handleInputChange('title', e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label className="label">Due date</label>
          <input 
            className="input" 
            type="date" 
            value={taskForm.dueDate} 
            onChange={e => handleInputChange('dueDate', e.target.value)} 
          />
        </div>
        
        <div className="form-group" style={{ alignSelf: 'end' }}>
          <button className="btn-primary" type="submit">
            Assign
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskAssignmentForm
