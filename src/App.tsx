import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import TasksPage from './pages/TasksPage';
import HabitsPage from './pages/HabitsPage';
import TabNav from './components/TabNav';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F8FAFC]">
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/habits" element={<HabitsPage />} />
          </Routes>
          <TabNav />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;