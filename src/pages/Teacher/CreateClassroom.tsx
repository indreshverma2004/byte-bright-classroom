import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateClassroom() {
  const navigate = useNavigate();
  const teacherData = JSON.parse(localStorage.getItem("teacherData") || "{}");
  const teacherId = teacherData.teacher?._id;

  const [form, setForm] = useState({
    name: "",
    code: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.code) {
      setError("Both fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/teacher/create-classroom",
        {
          ...form,
          teacher: teacherId,
        }
      );

      setSuccess("Classroom created successfully!");
      setError("");
      setTimeout(() => {
        navigate("/teacher-dashboard"); // or wherever the teacher dashboard lives
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Classroom
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g. JavaScript Essentials"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject Code
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g. JSE101"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Create Classroom
          </button>
        </form>
      </div>
    </div>
  );
}
