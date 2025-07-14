import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import { CheckCircle, Clock, RefreshCw } from 'lucide-react';

function App() {
  const { 
    todos, 
    loading, 
    error, 
    createTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodo,
    refreshTodos 
  } = useTodos();

  const handleCreateTodo = async (title: string, description?: string) => {
    await createTodo({ title, description });
  };

  const handleUpdateTodo = async (id: number, title: string, description?: string) => {
    await updateTodo(id, { title, description });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Modern Todo App
          </h1>
          <p className="text-gray-600">
            React + Python FastAPI で作成されたモダンなTodoアプリ
          </p>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="text-orange-500" size={20} />
              <span className="text-sm font-medium">
                進行中: {totalCount - completedCount}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-sm font-medium">
                完了: {completedCount}
              </span>
            </div>
          </div>
          <button
            onClick={refreshTodos}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            更新
          </button>
        </div>

        <TodoForm onSubmit={handleCreateTodo} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading && todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">読み込み中...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">
                まだTodoがありません。<br />
                上記のフォームから新しいTodoを作成してください。
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;