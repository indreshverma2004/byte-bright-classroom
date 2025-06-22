import React, { useEffect, useState } from "react";

export default function CreatePoll() {
  const [teacherData, setTeacherData] = useState<any>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [classroomId, setClassroomId] = useState("");
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState(["", ""]);

  // Load teacher data and classroom info
  useEffect(() => {
    const storedData = localStorage.getItem("teacherData");
    if (!storedData) return;

    const parsed = JSON.parse(storedData);
    setTeacherData(parsed.teacher);

    const classroomIds: string[] = parsed.teacher.classrooms;

    // Fetch classroom details
    Promise.all(
      classroomIds.map((id) =>
        fetch(`http://localhost:5000/classroom/${id}`).then((res) => res.json())
      )
    )
      .then((results) => {
        setClassrooms(results);
        if (results.length === 1) {
          setClassroomId(results[0]._id); // auto-select if only 1
        }
      })
      .catch((err) => console.error("Failed to load classroom info", err));
  }, []);

  // Add a new empty option
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  // Update a specific option
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  // Handle poll submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !classroomId) {
      alert("Please provide both classroom and question.");
      return;
    }

    const pollData = {
      classroom: classroomId,
      question,
      type,
      options: type === "mcq" ? options.filter((opt) => opt.trim()) : [],
    };

    try {
      const res = await fetch("http://localhost:5000/poll/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Poll created successfully!");
        setQuestion("");
        setOptions(["", ""]);
        setType("mcq");
      } else {
        console.error(data);
        alert("Failed to create poll.");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating poll.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>

      {teacherData ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Classroom Dropdown */}
          <div>
            <label className="block font-medium">Classroom</label>
            <select
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name} ({classroom.code})
                </option>
              ))}
            </select>
          </div>

          {/* Question Input */}
          <div>
            <label className="block font-medium">Question</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your poll question"
              required
            />
          </div>

          {/* Poll Type */}
          <div>
            <label className="block font-medium">Poll Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="text">Text Response</option>
            </select>
          </div>

          {/* Options (if MCQ) */}
          {type === "mcq" && (
            <div>
              <label className="block font-medium">Options</label>
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full border p-2 mb-2 rounded"
                  placeholder={`Option ${index + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="text-blue-500 mt-1"
              >
                + Add Option
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Poll
          </button>
        </form>
      ) : (
        <p>Loading teacher data...</p>
      )}
    </div>
  );
}
