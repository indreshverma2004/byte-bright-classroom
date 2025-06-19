
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { ClassroomCard } from '../../components/ClassroomCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClassroomList = () => {
  const [classrooms] = useState([
    {
      id: 1,
      name: 'Advanced Python Programming',
      code: 'ABC123',
      studentCount: 24,
      createdAt: '2024-01-15',
      description: 'Advanced concepts in Python programming including OOP, data structures, and algorithms.'
    },
    {
      id: 2,
      name: 'Web Development Basics',
      code: 'WEB456',
      studentCount: 18,
      createdAt: '2024-02-01',
      description: 'Introduction to HTML, CSS, and JavaScript for web development.'
    },
    {
      id: 3,
      name: 'Data Structures & Algorithms',
      code: 'DSA789',
      studentCount: 32,
      createdAt: '2024-01-20',
      description: 'Comprehensive course on data structures and algorithmic problem solving.'
    }
  ]);

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Classrooms</h1>
            <p className="text-gray-600 mt-2">
              Manage all your coding classrooms in one place
            </p>
          </div>
          
          <Link
            to="/classroom/create"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Classroom</span>
          </Link>
        </div>

        {/* Classrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Link key={classroom.id} to={`/classroom/${classroom.id}`}>
              <div className="bg-white rounded-lg shadow-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02] p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{classroom.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{classroom.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{classroom.studentCount} students</span>
                      <span className="text-sm text-gray-500">Code: {classroom.code}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    Created: {new Date(classroom.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {classrooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No classrooms created yet</div>
            <Link
              to="/classroom/create"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Classroom</span>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClassroomList;
