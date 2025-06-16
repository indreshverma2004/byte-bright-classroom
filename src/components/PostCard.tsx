
import React, { useState } from 'react';
import { 
  Code, 
  BarChart3, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash, 
  Play,
  Send
} from 'lucide-react';
import { CodeEditor } from './CodeEditor';

interface Post {
  id: number;
  type: 'question' | 'poll';
  title: string;
  description?: string;
  language?: string;
  testCases?: Array<{ input: string; output: string }>;
  isVisible?: boolean;
  pollType?: 'multiple-choice' | 'open-ended';
  options?: string[];
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  userRole: 'teacher' | 'student';
  onEdit: () => void;
  onDelete: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, userRole, onEdit, onDelete }) => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [openAnswer, setOpenAnswer] = useState<string>('');

  const handleSubmitCode = (code: string) => {
    console.log('Submitting code:', code);
    setShowCodeEditor(false);
  };

  const handleSubmitPoll = () => {
    console.log('Submitting poll answer:', selectedAnswer || openAnswer);
    setSelectedAnswer('');
    setOpenAnswer('');
  };

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-lg transition-all duration-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${post.type === 'question' ? 'bg-blue-100' : 'bg-green-100'}`}>
            {post.type === 'question' ? (
              <Code className="w-5 h-5 text-blue-600" />
            ) : (
              <BarChart3 className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              {post.language && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{post.language}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {userRole === 'teacher' && post.type === 'question' && (
            <button className={`p-2 rounded-lg ${post.isVisible ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
              {post.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          )}
          {userRole === 'teacher' && (
            <>
              <button onClick={onEdit} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={onDelete} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {post.description && (
        <p className="text-gray-700 mb-4">{post.description}</p>
      )}

      {/* Test Cases for Coding Questions */}
      {post.type === 'question' && post.testCases && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Test Cases:</h4>
          {post.testCases.map((testCase, index) => (
            <div key={index} className="text-sm text-gray-700 mb-1">
              <span className="font-mono bg-white px-2 py-1 rounded mr-2">Input: {testCase.input}</span>
              <span className="font-mono bg-white px-2 py-1 rounded">Output: {testCase.output}</span>
            </div>
          ))}
        </div>
      )}

      {/* Poll Options */}
      {post.type === 'poll' && post.options && userRole === 'student' && (
        <div className="space-y-3 mb-4">
          {post.pollType === 'multiple-choice' ? (
            post.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`poll-${post.id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))
          ) : (
            <textarea
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {post.type === 'question' && userRole === 'student' && (
          <button
            onClick={() => setShowCodeEditor(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Solve</span>
          </button>
        )}

        {post.type === 'poll' && userRole === 'student' && (selectedAnswer || openAnswer) && (
          <button
            onClick={handleSubmitPoll}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Submit</span>
          </button>
        )}
      </div>

      {/* Code Editor Modal */}
      {showCodeEditor && (
        <CodeEditor
          language={post.language || 'python'}
          onClose={() => setShowCodeEditor(false)}
          onSubmit={handleSubmitCode}
        />
      )}
    </div>
  );
};
