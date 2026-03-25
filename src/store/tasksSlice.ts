import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Load tasks from localStorage
const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromStorage(),
  },
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; dueDate?: string }>) => {
      const newTask: Task = {
        id: generateId(),
        title: action.payload.title,
        completed: false,
        dueDate: action.payload.dueDate,
        createdAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
      saveTasksToStorage(state.tasks);
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string; dueDate?: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.dueDate = action.payload.dueDate;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
