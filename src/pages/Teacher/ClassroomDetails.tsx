import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard";
import { ArrowLeft, Copy, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const ClassroomDetails = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/classroom/${id}`);
        const data = await res.json();
        setClassroom(data);

        const combinedPosts = [
          ...(data.questions || []).map((q: any) => ({
            ...q,
            id: q._id,
            type: "question",
            title: q.question,
            createdAt: q.createdAt || q.Date || new Date().toISOString(),
          })),
          ...(data.polls || []).map((p: any) => ({
            ...p,
            id: p._id,
            type: "poll",
            title: p.question,
            createdAt: p.createdAt || p.Date || new Date().toISOString(),
          })),
        ];

        combinedPosts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(combinedPosts);
      } catch (error) {
        console.error("Failed to fetch classroom details", error);
      }
    };

    fetchClassroom();
  }, [id]);

  const copyCode = () => {
    if (classroom?.code) {
      navigator.clipboard.writeText(classroom.code);
    }
  };

  if (!classroom) return <div className="p-10 text-gray-600">Loading...</div>;

  return (
    <Layout userRole="teacher">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            to="/classroom"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{classroom.name}</h1>
            <p className="text-gray-600 mt-2">{classroom.description}</p>
          </div>
        </div>

        {/* Classroom Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm opacity-90">
                  {classroom.students?.length || 0} students
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm opacity-90">Class Code:</span>
                <button
                  onClick={copyCode}
                  className="flex items-center space-x-1 px-2 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
                >
                  <span className="font-mono font-bold">{classroom.code}</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="polls" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {posts.filter((p) => p.type === "question").length > 0 ? (
              posts
                .filter((p) => p.type === "question")
                .map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    userRole="teacher"
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))
            ) : (
              <p className="text-gray-500">No questions found.</p>
            )}
          </TabsContent>

          <TabsContent value="polls" className="space-y-4">
  {posts.filter((p) => p.type === "poll").length > 0 ? (
    posts
      .filter((p) => p.type === "poll")
      .map((post) => {
        const isTextPoll = post.options?.length === 0;

        // === Text-Based Polls ===
        if (isTextPoll && post.textResponses) {
          const grouped: Record<string, number> = {};
          post.textResponses.forEach((resp: any) => {
            const ans = resp.answer.trim();
            grouped[ans] = (grouped[ans] || 0) + 1;
          });

          const sortedAnswers = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

          return (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow border">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">Text-based poll responses:</p>
              <ul className="space-y-2">
                {sortedAnswers.map(([answer, count], index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{answer}</span> —{" "}
                    <span className="text-gray-500">{count} vote{count > 1 ? "s" : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // === Multiple Choice Polls ===
        const totalVotes =
          post.responses?.reduce((acc: number, r: any) => acc + r.count, 0) || 0;

        return (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">Multiple Choice Responses:</p>
            {post.options.map((option: string) => {
              const res = post.responses?.find((r: any) => r.answer === option);
              const count = res?.count || 0;
              const percent = totalVotes
                ? ((count / totalVotes) * 100).toFixed(1)
                : "0";

              return (
                <div key={option} className="mb-3">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>{option}</span>
                    <span>
                      {count} vote{count !== 1 ? "s" : ""} ({percent}%)
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
        );
      })
  ) : (
    <p className="text-gray-500">No polls found.</p>
  )}
</TabsContent>


        </Tabs>
      </div>
    </Layout>
  );
};

export default ClassroomDetails;
