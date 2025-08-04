"use client";
import { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!task) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });
    setTask('');
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="bg-gray-900 text-white p-2 rounded-md flex-grow"
          placeholder="Add a new task"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md ml-2">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center justify-between bg-gray-900 p-2 rounded-md mb-2">
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)} className="bg-red-500 hover:bg-red-400 text-white p-1 rounded-md">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
