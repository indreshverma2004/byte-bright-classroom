import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { ClassroomCard } from "../../components/ClassroomCard";
import { PostCard } from "../../components/PostCard";
import { Plus } from "lucide-react";

export const TeacherDashboard: React.FC = () => {
  const [teacherName, setTeacherName] = useState("Teacher");
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
    const teacherData = localStorage.getItem("teacherData");
    if (teacherData) {
      const parsed = JSON.parse(teacherData);
      setTeacherName(parsed.name || "Teacher");
    }
  }, []);

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {teacherName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your classes, posts, and students efficiently.
            </p>
          </div>

          <a
            href="/classroom/create"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create Class</span>
          </a>
        </div>

        {/* Classroom Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Classrooms</h2>
          <ClassroomCard
            name="Advanced Python Programming"
            code="ABC123"
            studentCount={24}
            userRole="teacher"
          />
          {/* Add more classrooms dynamically if needed */}
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userRole="teacher"
                onEdit={() => console.log("Edit post", post.id)}
                onDelete={() => console.log("Delete post", post.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
