import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onTaskAdd: (content: string) => void;
}

export function TaskInput({ onTaskAdd }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onTaskAdd(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto mb-8">
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your tasks..."
          className="w-full p-6 pr-24 font-sans text-gray-800 text-lg
                   placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 
                   bg-blue-600 text-white px-6 py-2 rounded-lg
                   hover:bg-blue-700 transition-colors duration-200
                   flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </form>
  );
}