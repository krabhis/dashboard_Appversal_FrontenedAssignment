import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { fetchInitialMembers, setStatusFilter, toggleSortByActiveTasks, addTaskToMember, setStatusForMember, updateTaskProgress } from '../redux/slices/membersSlice'
import { switchRole } from '../redux/slices/roleSlice'

 
const statusOptions = ['All', 'Working', 'Break', 'Meeting', 'Offline']
 
 export default function Dashboard() {
      const dispatch = useDispatch()
      const { list, statusFilter, sortByActiveTasks, loading } = useSelector(s => s.members)

  const { currentRole, currentUserId } = useSelector(s => s.role)

 useEffect(() => {
    dispatch(fetchInitialMembers())
  }, [dispatch])

    const [taskForm, setTaskForm] = useState({
         memberId: '', 
         title: '', 
         dueDate: '' 
        })

        const filteredSortedMembers = useMemo(() => {
    let data = [...list]
    if (statusFilter !== 'All')
         data = data.filter(m => m.status === statusFilter) 

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

  const summaryLine = useMemo(() => {
    return `${summary.Working} Working · ${summary.Meeting} Meeting · ${summary.Break} Break · ${summary.Offline} Offline`
  }, [summary])

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
          <h3>Navigation</h3>
          <div className="nav">
            <a href="#overview">Dashboard</a>
            {currentRole === 'lead' && <a href="#assign">Assign Task</a>}
            <a href="#members">Team Members</a>
            <a href="#mytasks">My Tasks</a>
          </div>
        </aside>
        <main className="content">
          <section id="overview" className="grid">
            <div className="kpis">
              <div className="kpi kpi-working">
                <div className="title">Working</div>
                <div className="value">{summary.Working}</div>
              </div>
              <div className="kpi kpi-meeting">
                <div className="title">Meeting</div>
                <div className="value">{summary.Meeting}</div>
              </div>
              <div className="kpi kpi-break">
                <div className="title">Break</div>
                <div className="value">{summary.Break}</div>
              </div>
              <div className="kpi kpi-offline">
                <div className="title">Offline</div>
                <div className="value">{summary.Offline}</div>
              </div>
            </div>
          </section>

          <section className="card row" style={{ gap: 12 }}>
            <label className="row" style={{ gap: 8 }}>
              <span className="muted">Filter:</span>
              <select value={statusFilter} onChange={e => dispatch(setStatusFilter(e.target.value))}>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="row" style={{ gap: 6 }}>
              <input type="checkbox" checked={sortByActiveTasks} onChange={() => dispatch(toggleSortByActiveTasks())} />
              <span>Sort by active tasks</span>
            </label>
          </section>

      {currentRole === 'lead' && (

        <section id="assign" className="card grid">

          <h3>Assign Task</h3>
          <form onSubmit={e => { e.preventDefault(); if (!taskForm.memberId || !taskForm.title || !taskForm.dueDate) return; 
          dispatch(addTaskToMember(taskForm));
             setTaskForm({ memberId: '', title: '', dueDate: '' }) }} className="form-grid">

            <div className="form-group">
              <label className="label">Member</label>

              <select value={taskForm.memberId} onChange={e => setTaskForm(v => ({ ...v, memberId: e.target.value }))}>

                <option value="">Select member</option>
                {list.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}

              </select>
            </div>

            <div className="form-group">
              <label className="label">Task title</label>
              <input
               className="input" 
              placeholder="e.g. Prepare report" 
              value={taskForm.title} 
              onChange={e => setTaskForm(v => 
              ({ ...v, title: e.target.value 

              }))} />

            </div>

            <div className="form-group">
              <label className="label">Due date</label>
              <input className="input"
               type="date"
               value={taskForm.dueDate} 
                onChange={e => setTaskForm(v => (
                    { ...v, dueDate: e.target.value })
                    )} />

            </div>
            <div className="form-group" style={{ alignSelf: 'end' }}>
              <button className="btn-primary" type="submit">Assign</button>
            </div>
          </form>
        </section>
      )}

      <section id="members" className="grid">

        {currentRole === 'lead' ? (

          filteredSortedMembers.map(m => (

            <div key={m.id} className="card grid">
              <div className="row">
                <div className="row" style={{ gap: 8 }}>
                  <strong>{m.name}</strong>

                  <span className={`chip ${m.status === 'Working' ? 'chip-working' : m.status === 'Break' ? 'chip-break' : m.status === 'Meeting' ? 'chip-meeting' : 'chip-offline'}`}>{m.status}</span>

                </div>
                <div className="muted">Active tasks: {m.tasks.filter(t => !t.completed).length}</div>
              </div>

              <div className="grid">
                {m.tasks.length === 0 && <div className="muted">No tasks assigned</div>}

                {m.tasks.map(t => (
                  <div key={t.id} className="card" 
                  style={{ borderStyle: 'dashed' }
                  }>
                    <div className="row">
                      <div>
                        <div><strong>{t.title}</strong></div>
                        <div className="muted" style={{ fontSize: 12 }}> Due: {t.dueDate}</div>
                      </div>
                      <div className="row" style={{ gap: 8 }}>
                        <button onClick={() => dispatch(updateTaskProgress({ memberId: m.id, taskId: t.id, delta: -10 }))}>-10%</button>
                        <div className="progress">
                          <div className={`progress-bar ${t.progress === 100 ? 'progress-ok' : t.progress >= 50 ? 'progress-mid' : 'progress-low'}`} 
                          style={{ width: `${t.progress}%` }
                          }/>
                        </div>

                        <button onClick={() => dispatch(updateTaskProgress({ memberId: m.id, taskId: t.id, delta: 10 }))}>+10%</button>
                        <span className="muted" style={{ fontSize: 12 }}>{t.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))
        ) : (
          currentUser && (
            <div id="mytasks" className="grid">
              <div className="card">
                <h3>Hello, {currentUser.name}</h3>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  {['Working', 'Break', 'Meeting', 'Offline'].map(s => (
                    <button
                      key={s}
                      className={currentUser.status === s ? (
                        s === 'Working' ? 'btn-working' : s === 'Break' ? 'btn-break' : s === 'Meeting' ? 'btn-meeting' : 'btn-offline'
                      ) : ''}
                      onClick={() => dispatch(setStatusForMember({ memberId: currentUser.id, status: s }))}
                    >
                      {s}

                    </button>
                  ))}

                </div>
              </div>
              <div className="grid">

                {
                currentUser.tasks.length === 0 && <div className="muted">No tasks yet</div>
                }
                {currentUser.tasks.map(t => (
                  <div key={t.id} className="card">
                    <div className="row">
                      <div>
                        <div><strong>{t.title}</strong></div>
                        <div className="muted" style={{ fontSize: 12 }}>Due:{t.dueDate}</div>
                      </div>
                      <div className="row" style={{ gap: 8 }}>
                        <button onClick={() => dispatch(updateTaskProgress({ memberId: currentUser.id, taskId: t.id, delta: -10 }))}>-10%</button>

                        <div className="progress">

                          <div className={`progress-bar ${t.progress === 100 ? 'progress-ok' : t.progress >= 50 ? 'progress-mid' : 'progress-low'}`} 
                          style={{ width: `${t.progress}%` }}
                           />
                        </div>
                        <button onClick={() => dispatch(updateTaskProgress({ memberId: currentUser.id, taskId: t.id, delta: 10 }))}>+10%</button>

                        <span className="muted" 
                        style={{ fontSize: 12 }}>
                            {t.progress}%
                            </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </section>
        </main>
      </div>
    </div>
  )
}