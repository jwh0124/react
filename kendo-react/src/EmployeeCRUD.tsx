import * as React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { NumericTextBox } from "@progress/kendo-react-inputs";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hireDate: Date;
  salary: number;
  department: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    firstName: "김",
    lastName: "철수",
    email: "kim@example.com",
    phone: "010-1234-5678",
    hireDate: new Date("2020-01-15"),
    salary: 50000000,
    department: "개발팀",
  },
  {
    id: 2,
    firstName: "이",
    lastName: "영희",
    email: "lee@example.com",
    phone: "010-2345-6789",
    hireDate: new Date("2021-03-20"),
    salary: 55000000,
    department: "디자인팀",
  },
  {
    id: 3,
    firstName: "박",
    lastName: "민수",
    email: "park@example.com",
    phone: "010-3456-7890",
    hireDate: new Date("2019-07-10"),
    salary: 60000000,
    department: "마케팅팀",
  },
];

export default function EmployeeCRUD() {
  const [employees, setEmployees] =
    React.useState<Employee[]>(initialEmployees);
  const [editItem, setEditItem] = React.useState<Employee | null>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);

  const handleAdd = () => {
    setEditItem({
      id: Math.max(...employees.map((e) => e.id), 0) + 1,
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
    setEditItem({ ...dataItem });
    setIsNew(false);
    setShowDialog(true);
  };

  const handleDelete = (dataItem: Employee) => {
    if (
      window.confirm(
        `${dataItem.firstName} ${dataItem.lastName}를 삭제하시겠습니까?`
      )
    ) {
      setEmployees(employees.filter((e) => e.id !== dataItem.id));
    }
  };

  const handleSubmit = (dataItem: { [name: string]: any }) => {
    const employee = dataItem as Employee;

    if (isNew) {
      setEmployees([...employees, employee]);
    } else {
      setEmployees(employees.map((e) => (e.id === employee.id ? employee : e)));
    }

    setShowDialog(false);
    setEditItem(null);
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditItem(null);
  };

  return (
    <div className="page">
      <AppBar position="top">
        <AppBarSection>KendoReact ❤️ Vite - Grid CRUD Demo</AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
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
            <Button themeColor="primary" fillMode="flat">
              CRUD Demo
            </Button>
          </Link>
        </AppBarSection>
      </AppBar>

      <section className="section-container" style={{ padding: "20px" }}>
        <h2 className="k-mb-4">직원 관리 시스템 (Grid + Form CRUD)</h2>

        <Grid data={employees} style={{ height: "500px" }}>
          <GridToolbar>
            <Button themeColor="primary" onClick={handleAdd}>
              신규 직원 추가
            </Button>
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

        {showDialog && editItem && (
          <Dialog
            title={isNew ? "신규 직원 추가" : "직원 정보 수정"}
            onClose={handleCancel}
            width={500}
          >
            <Form
              initialValues={editItem}
              onSubmit={handleSubmit}
              render={(formRenderProps) => (
                <FormElement style={{ maxWidth: 650 }}>
                  <fieldset className="k-form-fieldset">
                    <div className="k-mb-3">
                      <Field
                        name="firstName"
                        component={Input}
                        label="성"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="lastName"
                        component={Input}
                        label="이름"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="email"
                        component={Input}
                        label="이메일"
                        type="email"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="phone"
                        component={Input}
                        label="전화번호"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="hireDate"
                        component={DatePicker}
                        label="입사일"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="salary"
                        component={NumericTextBox}
                        label="연봉 (원)"
                        format="n0"
                        required
                      />
                    </div>
                    <div className="k-mb-3">
                      <Field
                        name="department"
                        component={Input}
                        label="부서"
                        required
                      />
                    </div>
                  </fieldset>
                  <DialogActionsBar>
                    <Button onClick={handleCancel}>취소</Button>
                    <Button
                      themeColor="primary"
                      type="submit"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      {isNew ? "추가" : "저장"}
                    </Button>
                  </DialogActionsBar>
                </FormElement>
              )}
            />
          </Dialog>
        )}
      </section>
    </div>
  );
}
