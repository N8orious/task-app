import React from 'react';
import { Task, TaskStatus, ViewMode } from '../types/task';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  viewMode: ViewMode;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onToggleExpand: (id: string) => void;
}

export function KanbanBoard({ tasks, viewMode, onStatusChange, onToggleExpand }: KanbanBoardProps) {
  const columns = {
    'To Do': {
      tasks: tasks.filter(t => t.status === 'todo'),
      color: 'indigo',
      count: tasks.filter(t => t.status === 'todo').length
    },
    'On Progress': {
      tasks: tasks.filter(t => t.status === 'inProgress'),
      color: 'amber',
      count: tasks.filter(t => t.status === 'inProgress').length
    },
    'Done': {
      tasks: tasks.filter(t => t.status === 'done'),
      color: 'emerald',
      count: tasks.filter(t => t.status === 'done').length
    }
  };

  const statusMap: Record<string, TaskStatus> = {
    'To Do': 'todo',
    'On Progress': 'inProgress',
    'Done': 'done'
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnTitle: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && viewMode === 'status') {
      onStatusChange(taskId, statusMap[columnTitle]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {Object.entries(columns).map(([title, column]) => (
        <div 
          key={title} 
          className="flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, title)}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full bg-${column.color}-500`} />
            <h2 className="font-medium text-gray-900">{title}</h2>
            <span className="ml-1 bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">
              {column.count}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 min-h-[calc(100vh-200px)]">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onStatusChange}
                onToggleExpand={onToggleExpand}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}