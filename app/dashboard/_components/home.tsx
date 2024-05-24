import { useState } from 'react';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState('Yellow Branding');

  return (
    <div className="min-h-screen bg-gray-100 ">
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Assigned Tasks</h2>
              <p>You don't assigned to any task</p>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded shadow mt-6">
              <h2 className="text-lg font-bold mb-4">People</h2>
              <p>There's no people in your workspace</p>
            </div>
          </div>
          <div>
            <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Projects</h2>
              <div className="mb-2">
                <button className="w-full bg-gray-200 p-2 rounded">New Project</button>
              </div>
              <div className="mb-2">
                <button className="w-full bg-blue-600 text-white p-2 rounded">{selectedProject}</button>
              </div>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-md p-4 rounded shadow mt-6">
              <h2 className="text-lg font-bold mb-4">Private Notepad</h2>
              <textarea className="w-full p-2 border rounded" placeholder="Write down anything here..."></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
