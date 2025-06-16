
import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (post: any) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSubmit }) => {
  const [postType, setPostType] = useState<'question' | 'poll'>('question');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('Python');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [isVisible, setIsVisible] = useState(true);
  const [pollType, setPollType] = useState<'multiple-choice' | 'open-ended'>('multiple-choice');
  const [options, setOptions] = useState(['']);

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(),
      type: postType,
      title,
      description,
      ...(postType === 'question' && {
        language,
        testCases: testCases.filter(tc => tc.input || tc.output),
        isVisible,
      }),
      ...(postType === 'poll' && {
        pollType,
        options: pollType === 'multiple-choice' ? options.filter(opt => opt.trim()) : undefined,
      }),
      createdAt: new Date().toISOString(),
    };
    
    onSubmit(newPost);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-5/6 overflow-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Create New Post</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Post Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="question"
                  checked={postType === 'question'}
                  onChange={(e) => setPostType(e.target.value as 'question')}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Coding Question</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="poll"
                  checked={postType === 'poll'}
                  onChange={(e) => setPostType(e.target.value as 'poll')}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Poll</span>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter post title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter description..."
            />
          </div>

          {/* Question-specific fields */}
          {postType === 'question' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                    <option>JavaScript</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(e) => setIsVisible(e.target.checked)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Visible to students</span>
                  </label>
                </div>
              </div>

              {/* Test Cases */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                  <button
                    onClick={addTestCase}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Test Case</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {testCases.map((testCase, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        value={testCase.input}
                        onChange={(e) => {
                          const updated = [...testCases];
                          updated[index].input = e.target.value;
                          setTestCases(updated);
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                        placeholder="Input"
                      />
                      <span className="text-gray-500">→</span>
                      <input
                        type="text"
                        value={testCase.output}
                        onChange={(e) => {
                          const updated = [...testCases];
                          updated[index].output = e.target.value;
                          setTestCases(updated);
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                        placeholder="Expected Output"
                      />
                      <button
                        onClick={() => removeTestCase(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Poll-specific fields */}
          {postType === 'poll' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poll Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="multiple-choice"
                      checked={pollType === 'multiple-choice'}
                      onChange={(e) => setPollType(e.target.value as 'multiple-choice')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span>Multiple Choice</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="open-ended"
                      checked={pollType === 'open-ended'}
                      onChange={(e) => setPollType(e.target.value as 'open-ended')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span>Open-ended</span>
                  </label>
                </div>
              </div>

              {pollType === 'multiple-choice' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Options</label>
                    <button
                      onClick={addOption}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Option</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const updated = [...options];
                            updated[index] = e.target.value;
                            setOptions(updated);
                          }}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={`Option ${index + 1}`}
                        />
                        <button
                          onClick={() => removeOption(index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};
