// src/features/todo/todoThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

import { Task, TodoList } from './types'
import { firestore } from '../../firebase/firebaseConfig'

export const fetchUserTodoLists = createAsyncThunk(
  'todo/fetchUserTodoLists',
  async (userId: string): Promise<TodoList[]> => {
    const listsRef = collection(firestore, 'todoLists')
    const q = query(listsRef, where('ownerId', '==', userId))
    const querySnapshot = await getDocs(q)

    const todoLists: TodoList[] = []

    for (const listDoc of querySnapshot.docs) {
      const listData = listDoc.data()
      const listId = listDoc.id

      const tasksRef = collection(firestore, 'todoLists', listId, 'tasks')
      const tasksSnapshot = await getDocs(tasksRef)

      const tasks: Task[] = tasksSnapshot.docs.map((taskDoc) => ({
        id: taskDoc.id,
        ...(taskDoc.data() as Omit<Task, 'id'>),
      }))

      todoLists.push({
        id: listId,
        title: listData.title,
        ownerId: listData.ownerId,
        tasks,
      })
    }

    return todoLists
  }
)
