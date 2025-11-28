import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";

import { useAuth } from "./contexts/AuthContext";
import { EmployeeGrid } from "./components/EmployeeGrid";

export default function EmployeeCRUDv2() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="page">
      <AppBar position="top">
        <AppBarSection>
          KendoReact ❤️ Vite - Grid CRUD Demo (v2 - 최신)
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <span style={{ marginRight: "16px", color: "#fff" }}>
            👤 {user?.name} ({user?.role})
          </span>
          <Link to="/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              Home
            </Button>
          </Link>
          <Link to="/grid/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              Grid
            </Button>
          </Link>
          <Link to="/crud/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              CRUD v1
            </Button>
          </Link>
          <Link to="/crud-v2/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              CRUD v2
            </Button>
          </Link>
          <Button themeColor="error" fillMode="flat" onClick={handleLogout}>
            로그아웃
          </Button>
        </AppBarSection>
      </AppBar>

      <section className="section-container" style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 className="k-mb-2">직원 관리 시스템 v2 (최신 방식)</h2>
          <p style={{ color: "#666" }}>
            ✨ TanStack Query + Zod + React Hook Form + LocalStorage
          </p>
        </div>

        <EmployeeGrid />
      </section>
    </div>
  );
}
