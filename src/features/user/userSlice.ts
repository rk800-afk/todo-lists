import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  currentUser: null | {
    uid: string
    email: string | null
    displayName?: string | null
  }
}

const initialState: UserState = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState['currentUser']>) {
      state.currentUser = action.payload
    },
    clearUser(state) {
      state.currentUser = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
