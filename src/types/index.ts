// Task interface
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // ISO date string
  createdAt: string;
}

// Habit interface
export interface Habit {
  id: string;
  title: string;
  createdAt: string;
  completions: string[]; // Array of ISO date strings
}

// Filter types for tasks
export type TaskFilter = 'all' | 'today' | 'completed';
