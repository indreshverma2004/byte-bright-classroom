import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";

type QuestionType = "mcq" | "text";

interface Question {
  _id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  classroom: {
    name: string;
    teacher: {
      name: string;
    };
  };
  createdAt: string;
  responses?: {
    answer: string;
    count: number;
    voters: {
      _id: string;
      name: string;
      email: string;
    }[];
  }[];
}

const StudentLatestQuestion: React.FC = () => {
  const [latestQuestion, setLatestQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");

    if (studentData) {
      const parsed = JSON.parse(studentData);
      setStudentId(parsed.studentId);

      const fetchLatestQuestion = async () => {
        try {
          const res = await axios.get("http://localhost:5000/poll/all");
          const allQuestions: Question[] = res.data;

          if (allQuestions.length > 0) {
            const sorted = allQuestions.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            const latest = sorted[0];

            let existingAnswer = "";
            latest.responses?.forEach((resp) => {
              const found = resp.voters.find(
                (voter) => voter._id === parsed.studentId
              );
              if (found) {
                existingAnswer = resp.answer;
              }
            });

            setLatestQuestion(latest);
            if (existingAnswer) {
              setAnswer(existingAnswer);
              setSubmitStatus("✅ You have already submitted your answer.");
            }
          }
        } catch (err) {
          console.error("Error fetching latest question", err);
        }
      };

      fetchLatestQuestion();
    }
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please select or enter your answer.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/poll/vote/${latestQuestion?._id}`,
        {
          studentId,
          answer,
        }
      );
      setSubmitStatus("✅ Answer submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("❌ Failed to submit your answer.");
    }
  };

  if (!latestQuestion) {
    return <div className="p-6">Loading latest question...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Latest Question
        </h1>

        <div className="p-6 bg-white shadow-md rounded-lg border border-primary-500">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {latestQuestion.question}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Classroom: {latestQuestion.classroom.name} | Teacher:{" "}
            {latestQuestion.classroom.teacher.name}
          </p>

          {latestQuestion.type === "mcq" && latestQuestion.options ? (
            <select
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!submitStatus}
              className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
            >
              <option value="">Select an option</option>
              {latestQuestion.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={!!submitStatus}
              className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={!!submitStatus}
            className={`${
              submitStatus
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700"
            } text-white px-6 py-2 rounded-md`}
          >
            Submit
          </button>

          {submitStatus && (
            <p className="mt-4 text-sm font-medium text-green-600">
              {submitStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLatestQuestion;
