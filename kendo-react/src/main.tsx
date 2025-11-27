import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@progress/kendo-theme-default/dist/all.css";
import HomeNew from "./HomeNew.tsx";
import Grid from "./grid/Grid.tsx";
import EmployeeCRUD from "./EmployeeCRUD.tsx";
import EmployeeCRUDv2 from "./EmployeeCRUDv2.tsx";
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
    path: "/",
    element: <HomeNew />,
  },
  {
    path: "/grid/",
    element: <Grid />,
  },
  {
    path: "/crud/",
    element: <EmployeeCRUD />,
  },
  {
    path: "/crud-v2/",
    element: <EmployeeCRUDv2 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
