
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { Plus, BarChart3, Filter } from 'lucide-react';

const Polls = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 2,
      type: 'poll' as const,
      title: 'Which programming concept is most challenging?',
      pollType: 'multiple-choice' as const,
      options: ['Recursion', 'Pointers', 'Object-oriented Programming', 'Data Structures'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      type: 'poll' as const,
      title: 'What motivates you to code?',
      pollType: 'open-ended' as const,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ]);

  const [selectedType, setSelectedType] = useState('all');
  const pollTypes = ['all', 'multiple-choice', 'open-ended'];

  const filteredPosts = selectedType === 'all' 
    ? posts 
    : posts.filter(post => post.pollType === selectedType);

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Polls</h1>
            <p className="text-gray-600 mt-2">
              Create and manage interactive polls for your students
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Poll</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-sm text-gray-600">Total Polls</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.pollType === 'multiple-choice').length}</p>
                <p className="text-sm text-gray-600">Multiple Choice</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.pollType === 'open-ended').length}</p>
                <p className="text-sm text-gray-600">Open Ended</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-gray-600">Total Responses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {pollTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Polls List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                userRole="teacher"
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                {selectedType === 'all' ? 'No polls yet' : `No ${selectedType.replace('-', ' ')} polls yet`}
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Poll</span>
              </button>
            </div>
          )}
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
    </Layout>
  );
};

export default Polls;
