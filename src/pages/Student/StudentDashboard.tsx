import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { ClassroomCard } from "../../components/ClassroomCard";
import { PostCard } from "../../components/PostCard";
import { JoinClassModal } from "../../components/JoinClassModal";
import { Sidebar } from "./Sidebar";
import { Plus } from "lucide-react";

export const StudentDashboard: React.FC = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    if (studentData) {
      const parsed = JSON.parse(studentData);
      setStudentName(parsed.name || "Student");
    }
  }, []);

  return (
    <div>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar/>
        {/* Main content area */}
        <div className="flex-1 p-8 ml-64">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {studentName}! 👋
                </h1>
                <p className="text-gray-600 mt-2">
                  Continue your coding journey and complete assignments.
                </p>
              </div>

              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Join Class</span>
              </button>
            </div>

            {/* Classroom Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Classroom
              </h2>
              <ClassroomCard
                name="Advanced Python Programming"
                code="ABC123"
                studentCount={24}
                userRole="student"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <JoinClassModal
          onClose={() => setShowJoinModal(false)}
          onJoin={(code) => {
            console.log("Student joining class with code:", code);
            setShowJoinModal(false);
          }}
        />
      )}
    </div>
  );
};
