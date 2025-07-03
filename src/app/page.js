

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Todo App</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Pending</h2>
          {/* Pending*/}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">In Progress</h2>
          {/* In Progress*/}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Done</h2>
          {/* Done*/}
        </div>
      </div>
    </main>
  );
}
