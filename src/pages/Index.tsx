
import React, { useState } from 'react';
import { Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CodeClass</h1>
            <p className="text-gray-600">Choose your role to get started</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setUserRole('teacher')}
              className="w-full flex items-center space-x-4 p-6 bg-white rounded-lg shadow-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">I'm a Teacher</h3>
                <p className="text-sm text-gray-600">Create classrooms and manage coding assignments</p>
              </div>
            </button>

            <button
              onClick={() => setUserRole('student')}
              className="w-full flex items-center space-x-4 p-6 bg-white rounded-lg shadow-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="p-3 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <Link to="/student-login" className="text-left w-full">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">I'm a Student</h3>
                <p className="text-sm text-gray-600">Join classrooms and solve coding challenges</p>
              </div>
              </Link>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              A modern platform for coding education and collaboration
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Index;
