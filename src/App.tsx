
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClassroomList from "./pages/Student/ClassroomList";
import ClassroomDetail from "./pages/ClassroomDetail";
import CodingTasks from "./pages/Student/CodingTasks";
import TeacherPolls from "./pages/Teacher/Polls";
import StudentPolls from "./pages/Student/Polls";
import Submissions from "./pages/Submissions";
import StudentLogin from "./pages/studentlogin";
const queryClient = new QueryClient();
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import Signup from "./pages/Signup";
import TeacherLogin from "./pages/teacherlogin";
import { TeacherDashboard } from "./pages/Teacher/Dashboard";
import CreatePoll from "./pages/Teacher/CreatePoll";
import CreateClassroom from "./pages/Teacher/CreateClassroom";
import StudentRegisterForm from "./pages/Student/studentRegister";
const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/classroom" element={<ClassroomList />} />
          <Route path="/classroom/create" element={<CreateClassroom />} />
          <Route path="/classroom/:id" element={<ClassroomDetail />} />
          <Route path="/coding-tasks" element={<CodingTasks />} />
          <Route path="/teacher-polls" element={<TeacherPolls />} />
          <Route path="/student-polls" element={<StudentPolls />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/student-register" element={<StudentRegisterForm />} />
          {/* Query Client Provider for React Query */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
);

export default App;
