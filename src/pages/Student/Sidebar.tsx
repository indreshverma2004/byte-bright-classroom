import React from "react";
import { Home, Code, BarChart3, FileText, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const studentItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/",
      active: location.pathname === "/student-dashboard" || location.pathname === "/",
    },
    {
      icon: BookOpen,
      label: "My Classes",
      path: "/my-classes",
      active: location.pathname === "/my-classes",
    },
    {
      icon: Code,
      label: "Coding Tasks",
      path: "/coding-tasks",
      active: location.pathname === "/coding-tasks",
    },
    {
      icon: BarChart3,
      label: "Polls",
      path: "/student-polls",
      active: location.pathname === "/student-polls",
    },
    {
      icon: FileText,
      label: "My Submissions",
      path: "/my-submissions",
      active: location.pathname === "/my-submissions",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CodeClasssdklfjsdlj</h1>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        {studentItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 group ${
              item.active
                ? "bg-primary-50 text-primary-600 border-r-2 border-primary-500"
                : "text-gray-700"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${
                item.active
                  ? "text-primary-600"
                  : "text-gray-500 group-hover:text-primary-500"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
