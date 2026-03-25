import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { addHabit } from '../store/habitsSlice';
import HabitItem from '../components/HabitItem';

const HabitsPage: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const [newHabitTitle, setNewHabitTitle] = useState('');

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitTitle.trim()) {
      dispatch(addHabit(newHabitTitle.trim()));
      setNewHabitTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-[#1E293B]">Habits</h1>
        <p className="text-sm text-gray-500 mt-1">Track your daily habits</p>
      </header>

      {/* Add habit form */}
      <form onSubmit={handleAddHabit} className="p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabitTitle}
            onChange={(e) => setNewHabitTitle(e.target.value)}
            placeholder="Add a new habit..."
            className="flex-1 px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] bg-white text-[#1E293B]"
          />
          <button
            type="submit"
            disabled={!newHabitTitle.trim()}
            className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-medium hover:bg-[#5558E3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      {/* Habits list */}
      <div className="px-4">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E2E8F0] flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#1E293B] mb-1">No habits yet</h3>
            <p className="text-sm text-gray-500">Add your first habit to start tracking</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;