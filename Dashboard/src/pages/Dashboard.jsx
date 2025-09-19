import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { fetchInitialMembers } from '../redux/slices/membersSlice'
import { switchRole } from '../redux/slices/roleSlice'
import {
  KPICards,
  FilterControls,
  TaskAssignmentForm,
  MemberCard,
  MyTasks
} from '../components'


export default function Dashboard() {
  const dispatch = useDispatch()
  const { list, statusFilter, sortByActiveTasks, loading } = useSelector(s => s.members)
  const { currentRole, currentUserId } = useSelector(s => s.role)

  useEffect(() => {

    dispatch(fetchInitialMembers())

  }, [dispatch])

  const filteredSortedMembers = useMemo(() => {

    let data = [...list]
    if (statusFilter !== 'All') data = data.filter(m => m.status === statusFilter)
    if (sortByActiveTasks) {
      data.sort((a, b) => {
        const aActive = a.tasks.filter(t => !t.completed).length
        const bActive = b.tasks.filter(t => !t.completed).length
        return bActive - aActive

      })
    }
    return data
  }, [list, statusFilter, sortByActiveTasks])

  const summary = useMemo(() => {

    const counts = { Working: 0, Break: 0, Meeting: 0, Offline: 0 }
    list.forEach(m => { counts[m.status] += 1 })
    return counts
  }, [list])

  const currentUser = list.find(m => m.id === currentUserId)

  return (
    <div className="container">
      <header className="topbar">
        <h2>Team Pulse Dashboard</h2>
        <div className="header-actions">
          <div className="row" style={{ gap: 8 }}>
            <span className="muted">Role:</span>
            <select value={currentRole} onChange={e => dispatch(switchRole(e.target.value))}>
              <option value="lead">Team Lead</option>
              <option value="member">Team Member</option>
            </select>
          </div>
          <button className="border rounded px-3 py-2" onClick={() => {
            const root = document.documentElement
            root.classList.toggle('dark')
          }}>Toggle Theme</button>
        </div>
      </header>
      <div className="layout">
        <aside className="fixed-sidebar">
          <div className="nav">
            <a href="#overview">Dashboard</a>
            {currentRole === 'lead' && <a href="#assign">Assign Task</a>}
            <a href="#members">Team Members</a>
            <a href="#mytasks">My Tasks</a>
          </div>
        </aside>
        <main className="content">
          <section id="overview" className="grid">
            <KPICards summary={summary} />
          </section>

          <FilterControls />

      {currentRole === 'lead' && <TaskAssignmentForm />}

      <section id="members" className="grid">
        {currentRole === 'lead' ? (
          filteredSortedMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))
        ) : (
          currentUser && <MyTasks currentUser={currentUser} />
        )}
      </section>
        </main>
      </div>
    </div>
  )
}


