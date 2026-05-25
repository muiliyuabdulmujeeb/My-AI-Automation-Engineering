import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { LabDetailPage } from "./pages/LabDetailPage";
import { LabsPage } from "./pages/LabsPage";
import { LessonPage } from "./pages/LessonPage";
import { LearningPathsPage } from "./pages/LearningPathsPage";
import { NotesPage } from "./pages/NotesPage";
import { PartDetailPage } from "./pages/PartDetailPage";
import { PortfolioProjectDetailPage } from "./pages/PortfolioProjectDetailPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { QuizDetailPage } from "./pages/QuizDetailPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { SkillChecksPage } from "./pages/SkillChecksPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/parts/:partId" element={<PartDetailPage />} />
        <Route path="/parts/:partId/lessons/:lessonId" element={<LessonPage />} />
        <Route path="/paths" element={<LearningPathsPage />} />
        <Route path="/labs" element={<LabsPage />} />
        <Route path="/labs/:labId" element={<LabDetailPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:quizId" element={<QuizDetailPage />} />
        <Route path="/skill-checks" element={<SkillChecksPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<PortfolioProjectDetailPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
