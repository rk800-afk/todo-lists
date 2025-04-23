import { createSlice } from '@reduxjs/toolkit'
import { TodoList } from './types'
import { fetchUserTodoLists } from './todoThunks'

interface TodoState {
  lists: TodoList[]
  loading: boolean
  error: string | null
}

const initialState: TodoState = {
  lists: [],
  loading: false,
  error: null,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodoLists.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserTodoLists.fulfilled, (state, action) => {
        state.loading = false
        state.lists = action.payload
      })
      .addCase(fetchUserTodoLists.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Помилка завантаження'
      })
  },
})

export default todoSlice.reducer