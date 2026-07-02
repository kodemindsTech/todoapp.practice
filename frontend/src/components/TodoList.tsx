import React from 'react';
import type { Todo } from '../api/client';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 animate-fade-in">
        <p className="text-xl">No tasks yet.</p>
        <p className="text-sm mt-2">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {todos.map(todo => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};
