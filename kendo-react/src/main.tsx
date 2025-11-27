import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@progress/kendo-theme-default/dist/all.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import HomeNew from "./HomeNew.tsx";
import Grid from "./grid/Grid.tsx";
import EmployeeCRUD from "./EmployeeCRUD.tsx";
import EmployeeCRUDv2 from "./EmployeeCRUDv2.tsx";
import Login from "./pages/Login.tsx";
import "./index.css";

// QueryClient 생성 - TanStack Query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeNew />
      </ProtectedRoute>
    ),
  },
  {
    path: "/grid/",
    element: (
      <ProtectedRoute>
        <Grid />
      </ProtectedRoute>
    ),
  },
  {
    path: "/crud/",
    element: (
      <ProtectedRoute>
        <EmployeeCRUD />
      </ProtectedRoute>
    ),
  },
  {
    path: "/crud-v2/",
    element: (
      <ProtectedRoute>
        <EmployeeCRUDv2 />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
