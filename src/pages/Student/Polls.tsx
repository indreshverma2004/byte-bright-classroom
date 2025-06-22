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
    _id: string;
    name: string;
    teacher: {
      name: string;
    };
  };
  Date: string; // This is the creation time of the poll
  responses?: {
    answer: string;
    count: number;
    voters: {
      _id: string;
    }[];
  }[];
}

const StudentPolls: React.FC = () => {
  const [studentId, setStudentId] = useState<string>("");
  const [polls, setPolls] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  // ✅ Check if the poll is still active (within 5 minutes / 300 seconds)
  const isPollActive = (pollDate: string): boolean => {
    const pollTime = new Date(pollDate).getTime();
    if (isNaN(pollTime)) {
      console.warn("Invalid poll date format:", pollDate);
      return false;
    }
    const now = Date.now();
    return now - pollTime <= 300000; // 300,000 ms = 5 min
  };

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    if (!studentData) return;

    try {
      const parsed = JSON.parse(studentData);
      setStudentId(parsed.student._id);
      const enrolledIds = parsed.student.enrollments.map(
        (e: any) => e.classroom
      );

      const fetchPolls = async () => {
        const res = await axios.get("http://localhost:5000/poll/all");
        const allPolls: Question[] = res.data;

        const filtered = allPolls.filter((poll) =>
          enrolledIds.includes(poll.classroom._id || poll.classroom)
        );

        const submittedMap: Record<string, boolean> = {};
        const answerMap: Record<string, string> = {};

        filtered.forEach((poll) => {
          poll.responses?.forEach((resp) => {
            const found = resp.voters.find(
              (voter) => voter._id === parsed.student._id
            );
            if (found) {
              submittedMap[poll._id] = true;
              answerMap[poll._id] = resp.answer;
            }
          });
        });

        // ✅ Sort by date descending (latest first)
        const sorted = filtered.sort(
          (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
        );

        setPolls(sorted);
        setSubmitted(submittedMap);
        setAnswers(answerMap);
      };

      fetchPolls();
    } catch (err) {
      console.error("Error parsing student data", err);
    }
  }, []);

  const handleSubmit = async (pollId: string, pollDate: string) => {
    const answer = answers[pollId];
    if (!answer?.trim()) {
      alert("Please enter or select an answer.");
      return;
    }

    if (!isPollActive(pollDate)) {
      alert("⏰ Time to answer this poll has expired.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/poll/vote/${pollId}`, {
        studentId,
        answer,
      });
      setSubmitted((prev) => ({ ...prev, [pollId]: true }));
    } catch (err) {
      console.error("Error submitting answer", err);
      alert("Failed to submit your answer.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-30">
        <Sidebar />
      </div>

      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          All Classroom Polls
        </h1>

        {polls.length === 0 ? (
          <p>No polls found from your enrolled classrooms.</p>
        ) : (
          polls.map((poll) => (
            <div
              key={poll._id}
              className="p-6 mb-6 bg-white border border-primary-500 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {poll.question}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Classroom: {poll.classroom.name} | Teacher:{" "}
                {poll.classroom.teacher.name}
              </p>

              {poll.type === "mcq" && poll.options ? (
                <select
                  value={answers[poll._id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [poll._id]: e.target.value,
                    }))
                  }
                  disabled={submitted[poll._id]}
                  className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
                >
                  <option value="">Select an option</option>
                  {poll.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={answers[poll._id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [poll._id]: e.target.value,
                    }))
                  }
                  disabled={submitted[poll._id]}
                  className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
                  placeholder="Type your answer"
                />
              )}

              <div className="flex items-center">
                {!isPollActive(poll.Date) ? (
                  <span className="text-red-500 font-medium text-sm">
                    ⏰ Time to submit this poll has expired.
                  </span>
                ) : (
                  <button
                    onClick={() => handleSubmit(poll._id, poll.Date)}
                    disabled={submitted[poll._id]}
                    className={`${
                      submitted[poll._id]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700"
                    } text-white px-6 py-2 rounded-md`}
                  >
                    {submitted[poll._id] ? "Submitted" : "Submit"}
                  </button>
                )}

                {submitted[poll._id] && (
                  <span className="ml-4 text-green-600 text-sm font-medium">
                    ✅ Your answer: {answers[poll._id]}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentPolls;
