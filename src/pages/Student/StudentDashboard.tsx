import React, { useEffect, useState } from "react";
import { ClassroomCard } from "../../components/ClassroomCard";
import { Sidebar } from "./Sidebar";
import { Plus } from "lucide-react";
import { JoinClassModal } from "../../components/JoinClassModal";

export const StudentDashboard: React.FC = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [classrooms, setClassrooms] = useState<any[]>([]);

  const fetchAndUpdateStudentData = async () => {
    const stored = localStorage.getItem("studentData");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const studentId = parsed?.student?._id;

      if (!studentId) return;

      // ✅ Fetch updated student data
      const res = await fetch(`http://localhost:5000/student/${studentId}`);
      if (!res.ok) throw new Error("Failed to fetch updated student info");

      const updatedStudent = await res.json();

      // ✅ Save new data
      localStorage.setItem(
        "studentData",
        JSON.stringify({ student: updatedStudent })
      );
      setStudentName(updatedStudent.name || "Student");

      // ✅ Extract populated classrooms
      const classroomList = updatedStudent.enrollments.map(
        (e: any) => e.classroom
      );
      setClassrooms(classroomList);
    } catch (error) {
      console.error("Failed to refresh student data:", error);
    }
  };

  useEffect(() => {
    fetchAndUpdateStudentData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

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

          {/* Classrooms */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Classrooms
            </h2>
            {classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <ClassroomCard
                  key={classroom._id}
                  name={classroom.name}
                  code={classroom.code}
                  studentCount={classroom.students?.length || 0}
                  userRole="student"
                />
              ))
            ) : (
              <p className="text-gray-600">
                You're not enrolled in any classrooms yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <JoinClassModal
          onClose={() => setShowJoinModal(false)}
          onSuccess={fetchAndUpdateStudentData} // 👈 reload classrooms after joining
        />
      )}
    </div>
  );
};
