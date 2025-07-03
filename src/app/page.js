'use client';

import { useState } from 'react';
import useTodos from '../../hooks/use.js';
import {DragDropContext,Droppable,Draggable,} from '@hello-pangea/dnd';

export default function Home() {
  const { todos, add, update, remove } = useTodos();
  const [title, set_title] = useState('');
  const [desc, set_desc] = useState('');
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
    update(id, new_status);
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

      <DragDropContext onDragEnd={handle_drag}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cols.map((col) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-lg shadow p-4 text-black min-h-[150px]"
                >
                  <h2 className="text-xl font-semibold mb-2 text-black">{col}</h2>
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
                            className="border p-3 rounded mb-2 bg-gray-50 text-black break-words"
                          >
                            <h3 className="font-semibold text-black">{item.title}</h3>
                            <p className="text-sm text-black whitespace-pre-wrap break-words">
                              {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {col !== 'Pending' && (
                                <button
                                  onClick={() => update(item.id, 'Pending')}
                                  className="text-xs bg-yellow-300 px-2 py-1 rounded text-black"
                                >
                                  Pending
                                </button>
                              )}
                              {col !== 'In Progress' && (
                                <button
                                  onClick={() => update(item.id, 'In Progress')}
                                  className="text-xs bg-blue-300 px-2 py-1 rounded text-black"
                                >
                                  In Progress
                                </button>
                              )}
                              {col !== 'Done' && (
                                <button
                                  onClick={() => update(item.id, 'Done')}
                                  className="text-xs bg-green-300 px-2 py-1 rounded text-black"
                                >
                                  Done
                                </button>
                              )}
                              <button
                                onClick={() => remove(item.id)}
                                className="text-xs bg-red-400 text-white px-2 py-1 rounded"
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
