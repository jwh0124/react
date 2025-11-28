import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";

import { type EmployeeFormData } from "./schemas/employeeSchema";
import { useEmployees } from "./hooks/useEmployees";
import { Employee } from "./api/employeeApi";
import { useAuth } from "./contexts/AuthContext";
import { EmployeeFormModal } from "./components/EmployeeFormModal";
import { EmployeeGrid } from "./components/EmployeeGrid";

export default function EmployeeCRUDv2() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    employees,
    isLoading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    isCreating,
    isUpdating,
  } = useEmployees();

  const [editItem, setEditItem] = React.useState<Employee | null>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);

  const handleAdd = () => {
    setEditItem(null);
    setIsNew(true);
    setShowDialog(true);
  };

  const handleEdit = (dataItem: Employee) => {
    setEditItem(dataItem);
    setIsNew(false);
    setShowDialog(true);
  };

  const handleDelete = async (dataItem: Employee) => {
    if (
      window.confirm(
        `${dataItem.firstName} ${dataItem.lastName}를 삭제하시겠습니까?`
      )
    ) {
      try {
        await deleteEmployee(dataItem.id);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (isNew) {
        await createEmployee(data);
      } else if (editItem) {
        await updateEmployee({ id: editItem.id, data });
      }
      handleCancel();
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditItem(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="page">
        <AppBar position="top">
          <AppBarSection>
            KendoReact ❤️ Vite - Grid CRUD Demo (v2)
          </AppBarSection>
        </AppBar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <Loader size="large" type="infinite-spinner" />
          <span style={{ marginLeft: "16px" }}>데이터 로딩 중...</span>
        </div>
      </div>
    );
  }

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

        <EmployeeGrid
          employees={employees}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <EmployeeFormModal
          showDialog={showDialog}
          isNew={isNew}
          editItem={editItem}
          isCreating={isCreating}
          isUpdating={isUpdating}
          onSubmit={onSubmit}
          onCancel={handleCancel}
        />
      </section>
    </div>
  );
}
