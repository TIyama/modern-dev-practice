import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoCreate {
  title: string;
  description?: string;
}

export interface TodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const todoApi = {
  // 全てのTodoを取得
  getAllTodos: (): Promise<Todo[]> => 
    api.get('/todos').then(response => response.data),
  
  // 新しいTodoを作成
  createTodo: (todo: TodoCreate): Promise<Todo> => 
    api.post('/todos', todo).then(response => response.data),
  
  // Todoを更新
  updateTodo: (id: number, todo: TodoUpdate): Promise<Todo> => 
    api.put(`/todos/${id}`, todo).then(response => response.data),
  
  // Todoを削除
  deleteTodo: (id: number): Promise<void> => 
    api.delete(`/todos/${id}`).then(() => {}),
};