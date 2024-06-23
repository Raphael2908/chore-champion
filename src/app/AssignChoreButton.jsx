'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AssignChoreButton = ({children}) => {
  const [showModal, setShowModal] = useState(false);

  const Modal = ({children}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here, e.g., sending data to Supabase
        // console.log(choreName + choreScore + assignee)
        axios.post('http://localhost:3000/api/assignChore', {
            choreName: choreName,
            choreScore: choreScore, 
            choreUserId: assignee
        })
        Swal.fire({
            title: 'Chore Assigned',
            text: `Chore: ${choreName}, Score: ${choreScore}, Assignee: ${assignee}`,
            icon: 'success',
        }).then((result) => window.location.reload());
        setShowModal(false);
    };
    const [choreName, setChoreName] = useState('');
    const [choreScore, setChoreScore] = useState('');
    const [assignee, setAssignee] = useState('');
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Assign a New Chore</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="choreName" className="block text-gray-700">Chore Name</label>
                <input
                  type="text"
                  id="choreName"
                  value={choreName}
                  onChange={(e) => setChoreName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="choreScore" className="block text-gray-700">Chore Score</label>
                <input
                  type="number"
                  id="choreScore"
                  value={choreScore}
                  onChange={(e) => setChoreScore(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="assignee" className="block text-gray-700">Assignee</label>
                <select
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="" disabled>Select assignee</option>
                {children.map((child, index) => (
                  <option key={index} value={child.id}>
                    {child.full_name}
                  </option>
                ))}
              </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  }

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        type="button"
      >
        Assign chore
      </button>
      {showModal && <Modal children={children} />}
    </div>
  );
};

export default AssignChoreButton;
