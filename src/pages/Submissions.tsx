
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { FileText, User, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';

interface Submission {
  id: number;
  studentName: string;
  questionTitle: string;
  language: string;
  status: 'passed' | 'failed' | 'pending';
  score: number;
  submittedAt: string;
  testsPassed: number;
  totalTests: number;
}

const Submissions = () => {
  const [submissions] = useState<Submission[]>([
    {
      id: 1,
      studentName: 'Alice Johnson',
      questionTitle: 'Two Sum Problem',
      language: 'Python',
      status: 'passed',
      score: 100,
      submittedAt: '2024-03-15T10:30:00Z',
      testsPassed: 2,
      totalTests: 2
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      questionTitle: 'Two Sum Problem',
      language: 'Java',
      status: 'failed',
      score: 50,
      submittedAt: '2024-03-15T11:15:00Z',
      testsPassed: 1,
      totalTests: 2
    },
    {
      id: 3,
      studentName: 'Carol Davis',
      questionTitle: 'Valid Parentheses',
      language: 'Python',
      status: 'passed',
      score: 100,
      submittedAt: '2024-03-15T09:45:00Z',
      testsPassed: 3,
      totalTests: 3
    },
    {
      id: 4,
      studentName: 'David Wilson',
      questionTitle: 'Two Sum Problem',
      language: 'C++',
      status: 'pending',
      score: 0,
      submittedAt: '2024-03-15T12:00:00Z',
      testsPassed: 0,
      totalTests: 2
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const statusOptions = ['all', 'passed', 'failed', 'pending'];

  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === statusFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
            <p className="text-gray-600 mt-2">
              Review and grade student submissions
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
                <p className="text-sm text-gray-600">Total Submissions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'passed').length}</p>
                <p className="text-sm text-gray-600">Passed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-red-50 text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'failed').length}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{submissions.filter(s => s.status === 'pending').length}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.studentName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.questionTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        {submission.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.score}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {submission.testsPassed}/{submission.totalTests}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              {statusFilter === 'all' ? 'No submissions yet' : `No ${statusFilter} submissions yet`}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Submissions;
