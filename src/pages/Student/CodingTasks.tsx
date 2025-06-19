
import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { PostCard } from '../../components/PostCard';
import { CreatePostModal } from '../../components/CreatePostModal';
import { Plus, Code, Filter } from 'lucide-react';

const CodingTasks = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
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
      id: 3,
      type: 'question' as const,
      title: 'Valid Parentheses',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      language: 'Java',
      testCases: [
        { input: '"()"', output: 'true' },
        { input: '"()[]{}"', output: 'true' },
        { input: '"(]"', output: 'false' }
      ],
      isVisible: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const languages = ['all', 'Python', 'Java', 'C++', 'JavaScript'];

  const filteredPosts = selectedLanguage === 'all' 
    ? posts 
    : posts.filter(post => post.language === selectedLanguage);

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coding Tasks</h1>
            <p className="text-gray-600 mt-2">
              Manage all your coding questions and assignments
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Question</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.filter(p => p.isVisible).length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{posts.filter(p => !p.isVisible).length}</p>
                <p className="text-sm text-gray-600">Draft</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Submissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>

        {/* Questions List */}
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
                {selectedLanguage === 'all' ? 'No coding questions yet' : `No ${selectedLanguage} questions yet`}
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Question</span>
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

export default CodingTasks;
