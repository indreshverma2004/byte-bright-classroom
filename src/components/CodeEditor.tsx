
import React, { useState } from 'react';
import { X, Play, Send } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ language, onClose, onSubmit }) => {
  const [code, setCode] = useState('# Write your solution here\n');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    setOutput('Running code...\n\nOutput:\nHello, World!\n\nExecution completed successfully.');
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">{language}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editor and Output */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Solution</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm border-none resize-none focus:outline-none bg-gray-900 text-green-400"
              style={{ fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
            />
          </div>

          {/* Output Panel */}
          <div className="w-1/3 border-l border-gray-200 flex flex-col">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Output</span>
            </div>
            <div className="flex-1 p-4 bg-gray-100 overflow-auto">
              <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                {output || 'Click "Run" to execute your code'}
              </pre>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Press Ctrl+Enter to run code
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRun}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
