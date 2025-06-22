import React, { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import axios from "axios";

interface JoinClassModalProps {
  onClose: () => void;
  onSuccess?: () => void; // Optional: reload student + classroom data
}

export const JoinClassModal: React.FC<JoinClassModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [classCode, setClassCode] = useState("");
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    if (studentData) {
      try {
        const parsed = JSON.parse(studentData);
        setStudentId(parsed.student._id);
      } catch (err) {
        console.error("Failed to parse student data");
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!classCode.trim() || !studentId) return;

    setLoading(true);
    try {
      // Step 1: Enroll
      await axios.post("http://localhost:5000/student/enroll", {
        studentId,
        classCode,
      });

      // Step 2: Fetch latest student data
      const updatedRes = await axios.get(
        `http://localhost:5000/student/${studentId}`
      );
      const updatedStudent = updatedRes.data;

      // Step 3: Save to localStorage
      localStorage.setItem(
        "studentData",
        JSON.stringify({ student: updatedStudent })
      );

      alert("✅ Successfully enrolled in class!");

      // Step 4: Refresh UI
      if (onSuccess) onSuccess();

      onClose();
    } catch (error: any) {
      console.error("Error enrolling:", error);
      alert(error.response?.data?.message || "❌ Failed to join classroom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="w-5 h-5 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Join Classroom
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class Code
          </label>
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-500 focus:outline-none mb-4"
            placeholder="Enter class code..."
          />

          <p className="text-sm text-gray-600 mb-6">
            Ask your teacher for the class code to join their classroom.
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!classCode.trim() || loading}
              className="flex-1 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Joining..." : "Join Class"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
