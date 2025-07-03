// page.js
'use client';

import { useState } from 'react';

export default function Home() {
  const [title, set_title] = useState('');
  const [desc, set_desc] = useState('');
  const cols = ['Pending', 'In Progress', 'Done'];

  const submit = (e) => {
    e.preventDefault();
    
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Todo App</h1>

      <form onSubmit={submit} className="mb-6 flex flex-col gap-2 max-w-md text-black">
        <input
          className="p-2 border rounded text-black"
          placeholder="Task Title"
          value={title}
          onChange={(e) => set_title(e.target.value)}
        />
        <textarea
          className="p-2 border rounded text-black"
          placeholder="Task Description"
          value={desc}
          onChange={(e) => set_desc(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cols.map((col) => (
          <div key={col} className="bg-white rounded-lg shadow p-4 text-black">
            <h2 className="text-xl font-semibold mb-2 text-black">{col}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
