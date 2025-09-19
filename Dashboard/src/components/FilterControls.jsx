import { useDispatch, useSelector } from 'react-redux'
import { setStatusFilter, toggleSortByActiveTasks } from '../redux/slices/membersSlice'

const FilterControls = () => {
  const dispatch = useDispatch()
  const { statusFilter, sortByActiveTasks } = useSelector(s => s.members)
  
  const statusOptions = ['All', 'Working', 'Break', 'Meeting', 'Offline']

  return (
    <section className="card row" style={{ gap: 12 }}>
      <label className="row" style={{ gap: 8 }}>
        <span className="muted">Filter:</span>
        <select 
          value={statusFilter} 
          onChange={e => dispatch(setStatusFilter(e.target.value))}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      
      <label className="row" style={{ gap: 6 }}>
        <input 
          type="checkbox" 
          checked={sortByActiveTasks} 
          onChange={() => dispatch(toggleSortByActiveTasks())} 
        />
        <span>Sort by active tasks</span>
      </label>
    </section>
  )
}

export default FilterControls
