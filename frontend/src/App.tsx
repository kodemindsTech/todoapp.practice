import React, { useEffect, useState } from 'react';
import { type Todo, getTodos, createTodo, updateTodo, deleteTodo } from './api/client';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
//hello its shubham for just testing 
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (text: string) => {
    try {
      setIsAdding(true);
      const newTodo = await createTodo(text);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      setTodos(todos.map(t => t._id === id ? { ...t, completed } : t));
      await updateTodo(id, { completed });
    } catch (err) {
      console.error(err);
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setTodos(todos.filter(t => t._id !== id));
      await deleteTodo(id);
    } catch (err) {
      console.error(err);
      fetchTodos();
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center animate-fade-in relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"></div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 mb-4 relative z-10">
            Task Master
          </h1>
          <p className="text-gray-400 text-lg relative z-10">Organize your life with elegance.</p>
        </header>

        <main className="relative z-10">
          <TodoInput onAdd={handleAddTodo} isLoading={isAdding} />
          <TodoList 
            todos={todos} 
            onToggle={handleToggleTodo} 
            onDelete={handleDeleteTodo} 
            isLoading={isLoading} 
          />
        </main>
      </div>
    </div>
  );
}

export default App;
