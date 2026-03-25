import { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { toggleCompletion, editHabit, deleteHabit, calculateStreak } from '../store/habitsSlice';
import type { Habit } from '../store/habitsSlice';
import HeatMap from './HeatMap';

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(habit.title);
  const [showHeatMap, setShowHeatMap] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');
  const isCompletedToday = habit.completions.includes(today);
  const streak = calculateStreak(habit.completions);

  const handleToggleCompletion = () => {
    dispatch(toggleCompletion(habit.id));
  };

  const handleEdit = () => {
    if (isEditing && editTitle.trim()) {
      dispatch(editHabit({ id: habit.id, title: editTitle.trim() }));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (confirm(`Delete habit "${habit.title}"?`)) {
      dispatch(deleteHabit(habit.id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(habit.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E2E8F0] mb-3">
      <div className="flex items-center justify-between">
        {/* Checkbox and title */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={handleToggleCompletion}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              isCompletedToday
                ? 'bg-[#22C55E] border-[#22C55E] text-white'
                : 'border-[#E2E8F0] hover:border-[#22C55E]'
            }`}
          >
            {isCompletedToday && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEdit}
              autoFocus
              className="flex-1 px-2 py-1 border border-[#E2E8F0] rounded focus:outline-none focus:border-[#6366F1]"
            />
          ) : (
            <span
              className={`text-[#1E293B] font-medium cursor-pointer ${
                isCompletedToday ? 'line-through text-gray-400' : ''
              }`}
              onClick={() => setShowHeatMap(!showHeatMap)}
            >
              {habit.title}
            </span>
          )}
        </div>

        {/* Streak badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-[#1E293B]">{streak}</span>
            <span className="text-gray-500">day streak</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-[#6366F1] hover:bg-[#6366F1]/10 rounded-lg transition-colors"
            >
              {isEditing ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Heat map */}
      {showHeatMap && (
        <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
          <HeatMap completions={habit.completions} weeks={13} />
        </div>
      )}
    </div>
  );
};

export default HabitItem;