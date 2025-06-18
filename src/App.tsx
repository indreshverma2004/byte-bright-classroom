
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClassroomList from "./pages/ClassroomList";
import CreateClassroom from "./pages/CreateClassroom";
import ClassroomDetail from "./pages/ClassroomDetail";
import CodingTasks from "./pages/CodingTasks";
import Polls from "./pages/Polls";
import Submissions from "./pages/Submissions";
import StudentLogin from "./pages/studentlogin";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/classroom" element={<ClassroomList />} />
          <Route path="/classroom/create" element={<CreateClassroom />} />
          <Route path="/classroom/:id" element={<ClassroomDetail />} />
          <Route path="/coding-tasks" element={<CodingTasks />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/student-login" element={<StudentLogin />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
