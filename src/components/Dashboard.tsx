
import React, { useState } from 'react';
import { Layout } from './Layout';
import { ClassroomCard } from './ClassroomCard';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { JoinClassModal } from './JoinClassModal';
import { Plus, Users, Code, BarChart3 } from 'lucide-react';

interface DashboardProps {
  userRole: 'teacher' | 'student';
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'question' as const,
      title: 'Two Sum Problem',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      language: 'Python',
      testCases: [
        { input: '[2,7,11,15], 9', output: '[0,1]' },
        { input: '[3,2,4], 6', output: '[1,2]' }
      ],
      isVisible: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      type: 'poll' as const,
      title: 'Which programming concept is most challenging?',
      pollType: 'multiple-choice' as const,
      options: ['Recursion', 'Pointers', 'Object-oriented Programming', 'Data Structures'],
      createdAt: new Date().toISOString(),
    }
  ]);

  const stats = [
    { icon: Users, label: 'Active Students', value: '24', color: 'text-blue-600' },
    { icon: Code, label: 'Coding Tasks', value: '8', color: 'text-green-600' },
    { icon: BarChart3, label: 'Polls Created', value: '3', color: 'text-orange-600' },
  ];

  return (
    <Layout userRole={userRole}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userRole === 'teacher' ? 'Teacher' : 'Student'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              {userRole === 'teacher' 
                ? 'Manage your classroom and create engaging coding challenges'
                : 'Continue your coding journey and complete assignments'
              }
            </p>
          </div>
          
          {userRole === 'teacher' ? (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Post</span>
            </button>
          ) : (
            <button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Join Class</span>
            </button>
          )}
        </div>

        {/* Stats */}
        {userRole === 'teacher' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Classroom */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Classroom</h2>
          <ClassroomCard 
            name="Advanced Python Programming"
            code="ABC123"
            studentCount={24}
            userRole={userRole}
          />
        </div>

        {/* Recent Posts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                userRole={userRole}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(newPost) => {
            setPosts([newPost, ...posts]);
            setShowCreateModal(false);
          }}
        />
      )}

      {showJoinModal && (
        <JoinClassModal
          onClose={() => setShowJoinModal(false)}
          onJoin={(code) => {
            console.log('Joining class with code:', code);
            setShowJoinModal(false);
          }}
        />
      )}
    </Layout>
  );
};
