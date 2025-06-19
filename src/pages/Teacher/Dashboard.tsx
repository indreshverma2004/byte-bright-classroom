import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { ClassroomCard } from "../../components/ClassroomCard";
import { PostCard } from "../../components/PostCard";
import { JoinClassModal } from "../../components/JoinClassModal";
import { Plus } from "lucide-react";

export const TeacherDashboard: React.FC = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: "question" as const,
      title: "Two Sum Problem",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      language: "Python",
      testCases: [
        { input: "[2,7,11,15], 9", output: "[0,1]" },
        { input: "[3,2,4], 6", output: "[1,2]" },
      ],
      isVisible: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      type: "poll" as const,
      title: "Which programming concept is most challenging?",
      pollType: "multiple-choice" as const,
      options: [
        "Recursion",
        "Pointers",
        "Object-oriented Programming",
        "Data Structures",
      ],
      createdAt: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    if (studentData) {
      const parsed = JSON.parse(studentData);
      setStudentName(parsed.name || "Student");
    }
  }, []);

  return (
    <Layout userRole="student">
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
          <h2 className="text-2xl font-bold text-gray-900">Your Classroom</h2>
          <ClassroomCard
            name="Advanced Python Programming"
            code="ABC123"
            studentCount={24}
            userRole="student"
          />
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userRole="student"
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
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
    </Layout>
  );
};
