'use client';

import { useState } from 'react';
import useTodos from '../../hooks/use.js';
import {DragDropContext,Droppable,Draggable,} from '@hello-pangea/dnd';

export default function Home() {
  const { todos, add, update, remove } = useTodos();
  const [title, set_title] = useState('');
  const [desc, set_desc] = useState('');
  const [show_done, set_show_done] = useState(false);

  const cols = ['Pending', 'In Progress', 'Done'];

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    add(title, desc);
    set_title('');
    set_desc('');
  };

  const handle_drag = (res) => {
    const { destination, draggableId } = res;
    if (!destination) return;

    const id = parseInt(draggableId);
    const new_status = destination.droppableId;

    const task = todos.find((t) => t.id === id);
    if (task && task.status !== 'Done' && new_status === 'Done') {
      set_show_done(true);
      setTimeout(() => set_show_done(false), 2000);
    }

    update(id, new_status);
  };

  const col_style = {
    'Pending': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Done': 'bg-green-500',
  };

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Todo App</h1>

      {show_done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      <form onSubmit={submit} className="mb-6 flex flex-col gap-2 max-w-md text-white">
        <input
          className="p-2 border rounded bg-gray-800 text-white"
          placeholder="Task Title"
          value={title}
          onChange={(e) => set_title(e.target.value)}
        />
        <textarea
          className="p-2 border rounded bg-gray-800 text-white"
          placeholder="Task Description"
          value={desc}
          onChange={(e) => set_desc(e.target.value)}
        />
        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Task
        </button>
      </form>

      <DragDropContext onDragEnd={handle_drag}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cols.map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-lg shadow p-4 min-h-[150px] ${col_style[col]}`}
                >
                  <h2 className="text-xl font-semibold mb-2 text-white">{col}</h2>
                  {todos
                    .filter((item) => item.status === col)
                    .map((item, index) => (
                      <Draggable
                        key={item.id.toString()}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(drag) => (
                          <div
                            ref={drag.innerRef}
                            {...drag.draggableProps}
                            {...drag.dragHandleProps}
                            className="border p-3 rounded mb-2 bg-gray-800 text-white break-words"
                          >
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-white whitespace-pre-wrap break-words">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              <button
                                onClick={() => remove(item.id)}
                                className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}
