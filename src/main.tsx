import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "@ant-design/v5-patch-for-react-19";
import "@/i18n";
import App from "./App";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";
import "@/assets/css/main.css";
import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/assets/vendor/aos/aos.css";
import "@/assets/vendor/swiper/swiper-bundle.min.css";
import "@/assets/vendor/glightbox/css/glightbox.min.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ToastContainer position="top-right" autoClose={4000} theme="light" />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
