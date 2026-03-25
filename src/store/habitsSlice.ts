import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO, differenceInDays, isAfter, subDays, startOfDay } from 'date-fns';

// Habit interface
export interface Habit {
  id: string;
  title: string;
  createdAt: string;
  completions: string[]; // Array of ISO date strings
}

// Calculate streak (consecutive days)
export const calculateStreak = (completions: string[]): number => {
  if (completions.length === 0) return 0;

  // Sort completions by date in descending order
  const sortedCompletions = [...completions]
    .map(c => startOfDay(parseISO(c)))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = startOfDay(new Date());
  const yesterday = subDays(today, 1);

  // Check if the most recent completion is today or yesterday
  const mostRecent = sortedCompletions[0];
  if (!isAfter(mostRecent, yesterday) && mostRecent.getTime() !== today.getTime() && mostRecent.getTime() !== yesterday.getTime()) {
    return 0;
  }

  let streak = 0;
  let currentDate = isAfter(mostRecent, today) ? today : yesterday;

  for (const completion of sortedCompletions) {
    const completionDay = startOfDay(completion);
    const diff = differenceInDays(currentDate, completionDay);

    if (diff === 0) {
      streak++;
      currentDate = subDays(currentDate, 1);
    } else if (diff > 0) {
      break;
    }
  }

  return streak;
};

// State interface
interface HabitsState {
  habits: Habit[];
}

// Load from localStorage
const loadState = (): HabitsState => {
  try {
    const serializedState = localStorage.getItem('habits');
    if (serializedState === null) {
      return { habits: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load habits from localStorage:', err);
    return { habits: [] };
  }
};

// Save to localStorage
const saveState = (state: HabitsState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('habits', serializedState);
  } catch (err) {
    console.error('Failed to save habits to localStorage:', err);
  }
};

const initialState: HabitsState = loadState();

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer: (state, action: PayloadAction<Habit>) => {
        state.habits.push(action.payload);
        saveState(state);
      },
      prepare: (title: string) => ({
        payload: {
          id: uuidv4(),
          title,
          createdAt: new Date().toISOString(),
          completions: [],
        },
      }),
    },
    editHabit: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const habit = state.habits.find(h => h.id === action.payload.id);
      if (habit) {
        habit.title = action.payload.title;
        saveState(state);
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
      saveState(state);
    },
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        const today = format(new Date(), 'yyyy-MM-dd');
        const existingIndex = habit.completions.indexOf(today);
        if (existingIndex >= 0) {
          habit.completions.splice(existingIndex, 1);
        } else {
          habit.completions.push(today);
        }
        saveState(state);
      }
    },
  },
});

export const { addHabit, editHabit, deleteHabit, toggleCompletion } = habitsSlice.actions;

export default habitsSlice.reducer;