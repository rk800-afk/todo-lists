export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
  }
  
  export interface TodoList {
    id: string
    title: string
    ownerId: string
    tasks: Task[]
  }

  export interface Participant {
    id: string;
    userId: string;
    email: string;
    role: string;
  }