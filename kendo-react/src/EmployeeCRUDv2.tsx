import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Loader } from "@progress/kendo-react-indicators";

import {
  employeeSchema,
  type EmployeeFormData,
} from "./schemas/employeeSchema";
import { useEmployees } from "./hooks/useEmployees";
import { Employee } from "./api/employeeApi";
import { useAuth } from "./contexts/AuthContext";

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

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
  });

  const handleAdd = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      hireDate: new Date(),
      salary: 0,
      department: "",
    });
    setIsNew(true);
    setShowDialog(true);
  };

  const handleEdit = (dataItem: Employee) => {
    setEditItem(dataItem);
    reset({
      firstName: dataItem.firstName,
      lastName: dataItem.lastName,
      email: dataItem.email,
      phone: dataItem.phone,
      hireDate: new Date(dataItem.hireDate),
      salary: dataItem.salary,
      department: dataItem.department,
    });
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
      setShowDialog(false);
      setEditItem(null);
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditItem(null);
    reset();
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

        <Grid data={employees} style={{ height: "500px" }}>
          <GridToolbar>
            <Button themeColor="primary" onClick={handleAdd}>
              신규 직원 추가
            </Button>
            <span style={{ marginLeft: "16px", color: "#666" }}>
              총 {employees.length}명
            </span>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="80px" />
          <GridColumn field="firstName" title="성" width="120px" />
          <GridColumn field="lastName" title="이름" width="120px" />
          <GridColumn field="email" title="이메일" width="220px" />
          <GridColumn field="phone" title="전화번호" width="150px" />
          <GridColumn
            field="hireDate"
            title="입사일"
            width="150px"
            format="{0:yyyy-MM-dd}"
          />
          <GridColumn
            field="salary"
            title="연봉 (원)"
            width="150px"
            format="{0:n0}"
          />
          <GridColumn field="department" title="부서" width="120px" />
        </Grid>

        <div style={{ marginTop: "30px" }}>
          <h3>직원 목록 (CRUD 액션 포함)</h3>
          <table
            className="k-table k-table-md"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th style={{ width: "60px" }}>ID</th>
                <th>성</th>
                <th>이름</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>입사일</th>
                <th>연봉</th>
                <th>부서</th>
                <th style={{ width: "200px" }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    {new Date(employee.hireDate).toLocaleDateString("ko-KR")}
                  </td>
                  <td>{employee.salary.toLocaleString()}원</td>
                  <td>{employee.department}</td>
                  <td>
                    <Button
                      themeColor="primary"
                      fillMode="flat"
                      size="small"
                      onClick={() => handleEdit(employee)}
                      className="k-mr-2"
                    >
                      수정
                    </Button>
                    <Button
                      themeColor="error"
                      fillMode="flat"
                      size="small"
                      onClick={() => handleDelete(employee)}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showDialog && (
          <Dialog
            title={isNew ? "신규 직원 추가" : "직원 정보 수정"}
            onClose={handleCancel}
            width={550}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="k-form-fieldset" style={{ padding: "20px" }}>
                <div className="k-mb-4">
                  <label className="k-label k-form-label">성 *</label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="예: 김" />
                    )}
                  />
                  {errors.firstName && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.firstName.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">이름 *</label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="예: 철수" />
                    )}
                  />
                  {errors.lastName && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.lastName.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">이메일 *</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="예: kim@example.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">전화번호 *</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="예: 010-1234-5678" />
                    )}
                  />
                  {errors.phone && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">입사일 *</label>
                  <Controller
                    name="hireDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        format="yyyy-MM-dd"
                      />
                    )}
                  />
                  {errors.hireDate && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.hireDate.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">연봉 (원) *</label>
                  <Controller
                    name="salary"
                    control={control}
                    render={({ field }) => (
                      <NumericTextBox
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        format="n0"
                        min={0}
                      />
                    )}
                  />
                  {errors.salary && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.salary.message}
                    </div>
                  )}
                </div>

                <div className="k-mb-4">
                  <label className="k-label k-form-label">부서 *</label>
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="예: 개발팀" />
                    )}
                  />
                  {errors.department && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors.department.message}
                    </div>
                  )}
                </div>
              </fieldset>

              <DialogActionsBar>
                <Button onClick={handleCancel} type="button">
                  취소
                </Button>
                <Button
                  themeColor="primary"
                  type="submit"
                  disabled={!isValid || isCreating || isUpdating}
                >
                  {isCreating || isUpdating
                    ? "처리 중..."
                    : isNew
                    ? "추가"
                    : "저장"}
                </Button>
              </DialogActionsBar>
            </form>
          </Dialog>
        )}
      </section>
    </div>
  );
}
