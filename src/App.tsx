import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticleManagement from "./pages/ArticleManagement";
import ArticleDetail from "./pages/ArticleDetail";
import CreateArticle from "./pages/CreateArticle";
import PlagiarismChecker from "./pages/PlagiarismChecker";
import ReviewerManagement from "./pages/ReviewerManagement";
import ReviewerDetail from "./pages/ReviewerDetail";
import UserManagement from "./pages/UserManagement";
import UserDetail from "./pages/UserDetail";
import PublicationSettings from "./pages/PublicationSettings";

function RequireAuth() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles" element={<ArticleManagement />} />
          <Route path="/articles/new" element={<CreateArticle />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/plagiarism" element={<PlagiarismChecker />} />
          <Route path="/reviewers" element={<ReviewerManagement />} />
          <Route path="/reviewers/:id" element={<ReviewerDetail />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/settings" element={<PublicationSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
