
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { ArrowLeft, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CreateClassroom = () => {
  const [classroomName, setClassroomName] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const generateClassCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classroomName.trim()) return;

    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newClassroom = {
      id: Date.now(),
      name: classroomName,
      description: description,
      code: generateClassCode(),
      studentCount: 0,
      createdAt: new Date().toISOString()
    };

    console.log('Created classroom:', newClassroom);
    setIsCreating(false);
    navigate('/classroom');
  };

  return (
    <Layout userRole="teacher">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            to="/classroom"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Classroom</h1>
            <p className="text-gray-600 mt-2">
              Set up a new coding classroom for your students
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-card p-8">
          <form onSubmit={handleCreateClassroom} className="space-y-6">
            <div>
              <label htmlFor="classroomName" className="block text-sm font-medium text-gray-700 mb-2">
                Classroom Name *
              </label>
              <input
                type="text"
                id="classroomName"
                value={classroomName}
                onChange={(e) => setClassroomName(e.target.value)}
                placeholder="e.g., Advanced Python Programming"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this classroom is about..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Classroom Code</h4>
                  <p className="text-sm text-blue-700">
                    A unique code will be generated automatically for students to join your classroom
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Link
                to="/classroom"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!classroomName.trim() || isCreating}
                className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : 'Create Classroom'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateClassroom;
