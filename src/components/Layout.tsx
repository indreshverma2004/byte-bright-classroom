
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  userRole: 'teacher' | 'student';
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex w-full">
      <Sidebar userRole={userRole} />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
