'use client';

import { useState } from 'react';
import useTodos from '../../hooks/use.js';
import {DragDropContext,Droppable,Draggable,} from '@hello-pangea/dnd';

export default function Home() {
  const { todos, add, update, remove } = useTodos();
  const [title, set_title] = useState('');
  const [desc, set_desc] = useState('');
  const [show_done, set_show_done] = useState(false);
  const [edit_id, set_edit_id] = useState(null);
  const [edit_title, set_edit_title] = useState('');
  const [edit_desc, set_edit_desc] = useState('');

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

  const start_edit = (item) => {
    set_edit_id(item.id);
    set_edit_title(item.title);
    set_edit_desc(item.description);
  };

  const handle_save = () => {
    const updated = todos.map((t) =>
      t.id === edit_id ? { ...t, title: edit_title, description: edit_desc } : t
    );
    localStorage.setItem('todos', JSON.stringify(updated));
    set_edit_id(null);
  };

  const handle_cancel = () => {
    set_edit_id(null);
    set_edit_title('');
    set_edit_desc('');
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
                            {edit_id === item.id ? (
                              <>
                                <input
                                  className="w-full p-1 mb-1 text-white rounded"
                                  value={edit_title}
                                  onChange={(e) => set_edit_title(e.target.value)}
                                />
                                <textarea
                                  className="w-full p-1 mb-2 text-white rounded"
                                  value={edit_desc}
                                  onChange={(e) => set_edit_desc(e.target.value)}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={handle_save}
                                    className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handle_cancel}
                                    className="text-xs bg-gray-600 text-white px-2 py-1 rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <h3 className="font-semibold text-white">{item.title}</h3>
                                <p className="text-sm text-white whitespace-pre-wrap break-words">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <button
                                    onClick={() => start_edit(item)}
                                    className="text-xs bg-yellow-300 text-black bg-gray-700 px-2 py-1 rounded"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => remove(item.id)}
                                    className="text-xs bg-red-600 text-white bg-gray-700 px-2 py-1 rounded"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
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
