
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { ArrowLeft, Plus, Users, Copy, Settings } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ClassroomDetail = () => {
  const { id } = useParams();
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
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      type: 'poll' as const,
      title: 'Which programming concept is most challenging?',
      pollType: 'multiple-choice' as const,
      options: ['Recursion', 'Pointers', 'Object-oriented Programming', 'Data Structures'],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    }
  ]);

  const classroom = {
    id: parseInt(id || '1'),
    name: 'Advanced Python Programming',
    code: 'ABC123',
    studentCount: 24,
    description: 'Advanced concepts in Python programming including OOP, data structures, and algorithms.'
  };

  const copyCode = () => {
    navigator.clipboard.writeText(classroom.code);
  };

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            to="/classroom"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{classroom.name}</h1>
            <p className="text-gray-600 mt-2">{classroom.description}</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Post</span>
          </button>
        </div>

        {/* Classroom Info Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm opacity-90">{classroom.studentCount} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm opacity-90">Class Code:</span>
                  <button
                    onClick={copyCode}
                    className="flex items-center space-x-1 px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
                  >
                    <span className="font-mono font-bold">{classroom.code}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
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
                <div className="text-gray-400 text-lg mb-4">No posts yet</div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Post</span>
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            {posts.filter(post => post.type === 'question').map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                userRole="teacher"
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </TabsContent>

          <TabsContent value="polls" className="space-y-4">
            {posts.filter(post => post.type === 'poll').map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                userRole="teacher"
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No announcements yet</div>
            </div>
          </TabsContent>
        </Tabs>
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

export default ClassroomDetail;
