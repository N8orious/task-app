import React, { useState } from 'react';
import { TaskInput } from './components/TaskInput';
import { KanbanBoard } from './components/KanbanBoard';
import { Task, TaskStatus, ViewMode } from './types/task';
import { parseTaskInput } from './utils/taskParser';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode] = useState<ViewMode>('status');

  const handleTaskAdd = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const newTasks = lines.map(line => parseTaskInput(line));
    setTasks(prev => [...prev, ...newTasks]);
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prevTasks => {
      const updateStatus = (items: any[]): any[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, status };
          }
          if (item.subtasks) {
            return {
              ...item,
              subtasks: updateStatus(item.subtasks)
            };
          }
          return item;
        });
      };
      return updateStatus(prevTasks);
    });
  };

  const handleToggleExpand = (id: string) => {
    setTasks(prevTasks => {
      const toggleExpand = (items: any[]): any[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, isExpanded: !item.isExpanded };
          }
          if (item.subtasks) {
            return {
              ...item,
              subtasks: toggleExpand(item.subtasks)
            };
          }
          return item;
        });
      };
      return toggleExpand(prevTasks);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <TaskInput onTaskAdd={handleTaskAdd} />
        <KanbanBoard
          tasks={tasks}
          viewMode={viewMode}
          onStatusChange={handleStatusChange}
          onToggleExpand={handleToggleExpand}
        />
      </div>
    </div>
  );
}

export default App;