'use client';

import { useEffect, useState } from 'react';

export default function useTodos() {

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const add = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: 'Pending',
    };
    setTodos([...todos, newTodo]);
  };

  const update = (id, status) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    ));
  };

  const remove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, add, update, remove };
}
