import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;