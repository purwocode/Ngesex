"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to Vercel", completed: false },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          completed: false,
        },
      ]);
      setInput("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans dark:from-slate-900 dark:to-slate-800">
      <main className="flex w-full max-w-2xl flex-col gap-8 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {completedCount} of {todos.length} tasks completed
          </p>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No tasks yet! Add one to get started.
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 text-blue-500 rounded cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-lg ${todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800 dark:text-white"
                      }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to Next.js + React
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a simple todo list application built with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Next.js 16+ - React framework</li>
            <li>React Hooks (useState) - State management</li>
            <li>Tailwind CSS - Styling</li>
            <li>Lucide React - Icons</li>
            <li>TypeScript - Type safety</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
