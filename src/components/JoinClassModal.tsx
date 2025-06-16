
import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

interface JoinClassModalProps {
  onClose: () => void;
  onJoin: (code: string) => void;
}

export const JoinClassModal: React.FC<JoinClassModalProps> = ({ onClose, onJoin }) => {
  const [classCode, setClassCode] = useState('');

  const handleSubmit = () => {
    if (classCode.trim()) {
      onJoin(classCode.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="w-5 h-5 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Join Classroom</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Code
            </label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent font-mono text-center text-lg tracking-wider"
              placeholder="Enter class code..."
              maxLength={6}
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Ask your teacher for the class code to join their classroom.
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!classCode.trim()}
              className="flex-1 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Join Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
