import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { CreatePostModal } from "../../components/CreatePostModal";
import { Plus, BarChart3, Filter } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const TeacherPolls = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const pollTypes = ["all", "multiple-choice", "open-ended"];

  useEffect(() => {
    const fetchPolls = async () => {
      const teacherData = localStorage.getItem("teacherData");
      if (!teacherData) return;

      const teacher = JSON.parse(teacherData);
      const teacherId = teacher.teacher._id;

      try {
        const res = await axios.get("http://localhost:5000/poll/all");

        const filtered = res.data
          .filter((poll: any) => poll.classroom.teacher._id === teacherId)
          .map((poll: any) => ({
            id: poll._id,
            title: poll.question,
            pollType: poll.type === "mcq" ? "multiple-choice" : "open-ended",
            options: poll.options || [],
            responses: poll.responses || [],
            classroomName: `${poll.classroom.name} (${poll.classroom.code})`,
            createdAt: poll.createdAt,
          }));

        setPosts(filtered);
      } catch (err) {
        console.error("Error fetching polls", err);
      }
    };

    fetchPolls();
  }, []);

  const filteredPosts =
    selectedType === "all"
      ? posts
      : posts.filter((post) => post.pollType === selectedType);

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Polls</h1>
            <p className="text-gray-600 mt-2">
              Create and manage interactive polls for your students
            </p>
          </div>
          <Link to="/create-poll">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Create Poll</span>
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard title="Total Polls" count={posts.length} color="green" />
          <StatsCard
            title="Multiple Choice"
            count={posts.filter((p) => p.pollType === "multiple-choice").length}
            color="blue"
          />
          <StatsCard
            title="Open Ended"
            count={posts.filter((p) => p.pollType === "open-ended").length}
            color="purple"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {pollTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all"
                  ? "All Types"
                  : type.charAt(0).toUpperCase() +
                    type.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Polls List */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const totalVotes =
                post.responses?.reduce(
                  (acc: number, r: any) => acc + r.count,
                  0
                ) || 0;

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow p-5 border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Classroom:{" "}
                    <span className="font-medium">{post.classroomName}</span>
                  </p>

                  {post.pollType === "multiple-choice" ? (
                    <div className="space-y-2">
                      {post.options.map((option: string) => {
                        const res = post.responses.find(
                          (r: any) => r.answer === option
                        );
                        const count = res?.count || 0;
                        const percent = totalVotes
                          ? ((count / totalVotes) * 100).toFixed(1)
                          : "0";

                        return (
                          <div key={option}>
                            <div className="flex justify-between text-sm text-gray-700">
                              <span>{option}</span>
                              <span>
                                {count} votes ({percent}%)
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="italic text-sm text-gray-500">
                      Open-ended question. Responses are stored privately.
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 text-lg">
              No polls to display
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(newPost) => {
            setPosts([newPost, ...posts]);
            setShowCreateModal(false);
          }}
        />
      )}
    </Layout>
  );
};

// Reusable StatsCard
const StatsCard = ({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-card">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
        <BarChart3 className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  </div>
);

export default TeacherPolls;
