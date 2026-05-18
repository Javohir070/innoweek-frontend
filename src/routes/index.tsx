import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LocaleLayout from "@/layouts/LocaleLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

const NewsPage = lazy(() => import("@/pages/NewsPage"));
const NewsDetailPage = lazy(() => import("@/pages/NewsDetailPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ProgramDetailPage = lazy(() => import("@/pages/ProgramDetailPage"));
const SpikersPage = lazy(() => import("@/pages/SpikersPage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const ChatbotPage = lazy(() => import("@/pages/ChatbotPage"));
const EcoIdeathonPage = lazy(() => import("@/pages/EcoIdeathonPage"));
const EcoIdeathonFormPage = lazy(() => import("@/pages/EcoIdeathonFormPage"));
const EcoIdeathonAppPage = lazy(() => import("@/pages/EcoIdeathonAppPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/uz" replace />} />
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:newsId" element={<NewsDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="program-detail/:programId" element={<ProgramDetailPage />} />
        <Route path="spikers" element={<SpikersPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="eco-ideathon-disabled" element={<EcoIdeathonPage />} />
        <Route
          path="eco-ideathon-disabled/form"
          element={<EcoIdeathonFormPage />}
        />
        <Route
          path="eco-ideathon-disabled/:appId"
          element={<EcoIdeathonAppPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/uz" replace />} />
    </Routes>
  );
}
