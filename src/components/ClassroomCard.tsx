
import React from 'react';
import { Users, Copy, Settings } from 'lucide-react';

interface ClassroomCardProps {
  name: string;
  code: string;
  studentCount: number;
  userRole: 'teacher' | 'student';
}

export const ClassroomCard: React.FC<ClassroomCardProps> = ({ 
  name, 
  code, 
  studentCount, 
  userRole 
}) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm opacity-90">{studentCount} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm opacity-90">Class Code:</span>
              <button
                onClick={copyCode}
                className="flex items-center space-x-1 px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
              >
                <span className="font-mono font-bold">{code}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        
        {userRole === 'teacher' && (
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
