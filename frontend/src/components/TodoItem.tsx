import React from 'react';
import type { Todo } from '../api/client';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="glass-panel flex items-center justify-between p-4 mb-3 animate-slide-up group transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div 
          onClick={() => onToggle(todo._id, !todo.completed)}
          className={`checkbox-custom ${todo.completed ? 'checked' : ''}`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`text-lg transition-all duration-300 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
          {todo.text}
        </span>
      </div>
      <button 
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-400/10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};
