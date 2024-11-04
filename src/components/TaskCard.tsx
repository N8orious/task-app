import React from 'react';
import { MoreHorizontal, CheckCircle2 } from 'lucide-react';
import type { SubTask, Task, TaskStatus } from '../types/task';

interface TaskCardProps {
  task: Task | SubTask;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onToggleExpand: (id: string) => void;
  depth?: number;
}

export function TaskCard({ task, onStatusChange, onToggleExpand, depth = 0 }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const priorityColors = {
    Low: 'bg-orange-50 text-orange-700',
    High: 'bg-rose-50 text-rose-700',
    Completed: 'bg-green-50 text-green-700'
  };

  const getPriority = () => {
    if (task.status === 'done') return 'Completed';
    return task.priority || 'Low';
  };

  return (
    <div className={`mb-3 ${depth > 0 ? 'ml-4' : ''}`}>
      <div 
        draggable
        onDragStart={handleDragStart}
        className="p-5 rounded-xl bg-white shadow-sm border border-gray-100
                 transition-all duration-200 hover:shadow-md cursor-move
                 group"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {task.status === 'done' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-sm border-2 border-gray-300" />
                )}
                <h3 className={`font-medium ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.content}
                </h3>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <span className={`text-xs px-2 py-1 rounded-md font-medium ${priorityColors[getPriority()]}`}>
                {getPriority()}
              </span>
              {task.description && (
                <p className="text-sm text-gray-500">{task.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}