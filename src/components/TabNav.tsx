import { NavLink } from 'react-router-dom';

const TabNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-50">
      <div className="flex max-w-lg mx-auto">
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              isActive ? 'text-[#6366F1]' : 'text-gray-500'
            }`
          }
        >
          {() => (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Tasks
            </>
          )}
        </NavLink>

        <NavLink
          to="/habits"
          className={({ isActive }) =>
            `flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              isActive ? 'text-[#6366F1]' : 'text-gray-500'
            }`
          }
        >
          {() => (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Habits
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default TabNav;