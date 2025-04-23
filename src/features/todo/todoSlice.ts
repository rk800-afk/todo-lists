import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoList, Task } from './types'
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
    updateTodoListTitleRedux: (
      state,
      action: PayloadAction<{ listId: string; newTitle: string }>
    ) => {
      const { listId, newTitle } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.title = newTitle;
      }
    },
    addTaskToList: (
      state,
      action: PayloadAction<{ listId: string; task: Task }>
    ) => {
      const { listId, task } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.tasks.push(task);
      }
    },
    updateTaskInList: (
      state,
      action: PayloadAction<{ listId: string; task: { id: string; title: string; description: string; isEditing?: boolean } }>
    ) => {
      const { listId, task } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          list.tasks[taskIndex] = {
            ...list.tasks[taskIndex],
            title: task.title,
            description: task.description,
            ...(task.isEditing !== undefined && { isEditing: task.isEditing }),
          };
        }
      }
    },
    deleteTaskFromList: (
      state,
      action: PayloadAction<{ listId: string; taskId: string }>
    ) => {
      const { listId, taskId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
    },
    toggleTaskCompletedInList: (
      state,
      action: PayloadAction<{ listId: string; taskId: string }>
    ) => {
      const { listId, taskId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const task = list.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const listId = action.payload;
      state.lists = state.lists.filter((list) => list.id !== listId);
    },
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

export const { updateTodoListTitleRedux, addTaskToList, updateTaskInList, deleteTaskFromList, toggleTaskCompletedInList, deleteList } = todoSlice.actions;
export default todoSlice.reducer