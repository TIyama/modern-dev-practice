import { useState, useEffect } from 'react';
import { todoApi, Todo, TodoCreate, TodoUpdate } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Todoリストを取得
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 新しいTodoを作成
  const createTodo = async (todoData: TodoCreate) => {
    setError(null);
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  // Todoを更新
  const updateTodo = async (id: number, updates: TodoUpdate) => {
    setError(null);
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(prev => 
        prev.map(todo => todo.id === id ? updatedTodo : todo)
      );
      return updatedTodo;
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  // Todoを削除
  const deleteTodo = async (id: number) => {
    setError(null);
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  // 完了状態を切り替え
  const toggleTodo = async (id: number, completed: boolean) => {
    await updateTodo(id, { completed });
  };

  // 初回読み込み
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos: fetchTodos,
  };
};