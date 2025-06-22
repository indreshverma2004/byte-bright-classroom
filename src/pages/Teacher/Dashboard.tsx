import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { ClassroomCard } from "../../components/ClassroomCard";
import { Plus } from "lucide-react";

export const TeacherDashboard: React.FC = () => {
  const [teacherName, setTeacherName] = useState("Teacher");
  const [classroomData, setClassroomData] = useState<any[]>([]);

  useEffect(() => {
    const teacherDataString = localStorage.getItem("teacherData");
    if (!teacherDataString) return;

    try {
      const teacherData = JSON.parse(teacherDataString);
      setTeacherName(teacherData.teacher.name || "Teacher");

      const classroomIds: string[] = teacherData.teacher.classrooms;

      // Fetch each classroom by ID using Promise.all
      Promise.all(
        classroomIds.map((id) =>
          fetch(`http://localhost:5000/classroom/${id}`).then((res) =>
            res.json()
          )
        )
      )
        .then((classroomResults) => {
          setClassroomData(classroomResults);
        })
        .catch((err) => console.error("Failed to load classrooms", err));
    } catch (error) {
      console.error("Error parsing teacher data", error);
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
          {classroomData.length > 0 ? (
            classroomData.map((classroom) => (
              <ClassroomCard
                key={classroom._id}
                name={classroom.name}
                code={classroom.code}
                studentCount={classroom.students?.length || 0}
                userRole="teacher"
              />
            ))
          ) : (
            <p className="text-gray-600">You don't have any classrooms yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};
