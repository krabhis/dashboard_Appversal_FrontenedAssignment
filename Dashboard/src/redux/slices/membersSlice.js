import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

export const fetchInitialMembers = createAsyncThunk('members/fetchInitial', async () => {

  return[
  { id: 'u1', name: 'Rahul Sharma', status: 'Working', tasks: [] },
  { id: 'u2', name: 'Neha Gupta', status: 'Break', tasks: [] },
  { id: 'u3', name: 'Amit Kumar', status: 'Meeting', tasks: [] },
  { id: 'u4', name: 'Priya Patel', status: 'Offline', tasks: [] },
  { id: 'u5', name: 'Rohan Verma', status: 'Working', tasks: [] },
  { id: 'u6', name: 'Sneha Reddy', status: 'Training', tasks: [] },
  { id: 'u7', name: 'Karan Mehta', status: 'Break', tasks: [] },
  { id: 'u8', name: 'Ananya Iyer', status: 'Working', tasks: [] },
  { id: 'u9', name: 'Mohammed Irfan', status: 'Meeting', tasks: [] }
]


})

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    statusFilter: 'All',
    sortByActiveTasks: false,
    loading: false,
    error: null
  },
  reducers: {
    setStatusForMember: (state, action) => {
      const { memberId, status } = action.payload
      const member = state.list.find(m => m.id === memberId)

      if (member) member.status = status

    },

    addTaskToMember: {

      reducer: (state, action) => {
        const { memberId, task } = action.payload
        const member = state.list.find(m => m.id === memberId)
        if (member) member.tasks.push(task)
      },
    
      prepare: ({ memberId, title, dueDate }) => ({
        payload: {
          memberId,
          task: { id: nanoid(), title, dueDate, progress: 0, completed: false }
        }
      })

    },

    updateTaskProgress: (state, action) => {
      const { memberId, taskId, delta } = action.payload
      const member = state.list.find(m => m.id === memberId)
      if (!member) return
      const task = member.tasks.find(t => t.id === taskId)
      if (!task) return
      const next = Math.max(0, Math.min(100, task.progress + delta))
      task.progress = next
      task.completed = next === 100
    },

    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },

    toggleSortByActiveTasks: (state) => {
      state.sortByActiveTasks = !state.sortByActiveTasks
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInitialMembers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchInitialMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load members'
      })
  }
})

export const {
  setStatusForMember,
  addTaskToMember,
  updateTaskProgress,
  setStatusFilter,
  toggleSortByActiveTasks
} = membersSlice.actions

export default membersSlice.reducer


