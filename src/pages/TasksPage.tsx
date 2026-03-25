import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { addTask, editTask, deleteTask, toggleTask } from '../store/tasksSlice';
import type { TaskFilter } from '../types';
import TaskItem from '../components/TaskItem';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');

  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (currentFilter) {
      case 'today':
        return tasks.filter((task) => {
          if (!task.dueDate) return !task.completed;
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime() && !task.completed;
        });
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, currentFilter]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          dueDate: newTaskDueDate || undefined,
        })
      );
      setNewTaskTitle('');
      setNewTaskDueDate('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTask(id));
  };

  const handleEdit = (id: string, title: string, dueDate?: string) => {
    dispatch(editTask({ id, title, dueDate }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const filterTabs: { key: TaskFilter; label: string; count: number }[] = [
    {
      key: 'all',
      label: '全部',
      count: tasks.length,
    },
    {
      key: 'today',
      label: '今日待办',
      count: tasks.filter((task) => {
        if (!task.dueDate) return !task.completed;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime() && !task.completed;
      }).length,
    },
    {
      key: 'completed',
      label: '已完成',
      count: tasks.filter((task) => task.completed).length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-indigo-500 text-white p-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold">任务管理</h1>
        <p className="text-indigo-200 mt-1">管理你的待办事项</p>
      </div>

      {/* Add Task Form */}
      <div className="p-4 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="添加新任务..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleAddTask}
              disabled={!newTaskTitle.trim()}
              className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              添加
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="flex">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCurrentFilter(tab.key)}
              className={`flex-1 py-3 text-center font-medium transition-colors relative ${
                currentFilter === tab.key
                  ? 'text-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  currentFilter === tab.key
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
              {currentFilter === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="p-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-slate-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <p className="text-slate-500">
              {currentFilter === 'all' && tasks.length === 0
                ? '还没有任务，添加一个吧'
                : currentFilter === 'today'
                ? '今天没有待办任务'
                : '没有已完成的任务'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
