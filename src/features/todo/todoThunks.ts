import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  getDocs,
} from 'firebase/firestore'

import { Task, TodoList } from './types'
import { firestore } from '../../firebase/firebaseConfig'

export const fetchUserTodoLists = createAsyncThunk(
  'todo/fetchUserTodoLists',
  async (userId: string): Promise<TodoList[]> => {
    const listsRef = collection(firestore, 'todoLists')
    
    try {
      const todoLists: TodoList[] = []
      
      const todoListsSnapshot = await getDocs(listsRef)

      for (const listDoc of todoListsSnapshot.docs) {
        const listData = listDoc.data()
        const listId = listDoc.id

        const participantsRef = collection(firestore, 'todoLists', listId, 'participants')
        const participantsSnapshot = await getDocs(participantsRef)

        let isParticipant = false

        participantsSnapshot.forEach((participantDoc) => {
          const participantData = participantDoc.data()
          if (participantData.userId === userId) {
            isParticipant = true
          }
        })

        if (isParticipant) {
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
      }

      return todoLists
    } catch (err) {
      console.error('Failed to fetch user todo lists:', err)
      return []
    }
  }
)
