import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentRole: 'member',
  currentUserId: 'u1',
  currentUserName: 'John Doe'
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload
    },
    setUser: (state, action) => {
      const { id, name } = action.payload
      state.currentUserId = id
      if (name) state.currentUserName = name
    }
  }
})

export const { switchRole, setUser } = roleSlice.actions
export default roleSlice.reducer


