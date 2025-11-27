import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@progress/kendo-react-buttons";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";

import "./Home.css";

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
    salary: 50000,
    department: "개발팀",
  },
  {
    id: 2,
    firstName: "이",
    lastName: "영희",
    email: "lee@example.com",
    phone: "010-2345-6789",
    hireDate: new Date("2021-03-20"),
    salary: 55000,
    department: "디자인팀",
  },
  {
    id: 3,
    firstName: "박",
    lastName: "민수",
    email: "park@example.com",
    phone: "010-3456-7890",
    hireDate: new Date("2019-07-10"),
    salary: 60000,
    department: "마케팅팀",
  },
];

export default function Home() {
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

  const CommandCell = (props: any) => {
    return (
      <td>
        <Button
          themeColor="primary"
          fillMode="flat"
          onClick={() => handleEdit(props.dataItem)}
          className="k-mr-2"
        >
          수정
        </Button>
        <Button
          themeColor="error"
          fillMode="flat"
          onClick={() => handleDelete(props.dataItem)}
        >
          삭제
        </Button>
      </td>
    );
  };
  return (
    <div className="page">
      <AppBar position="top">
        <AppBarSection>KendoReact - Grid CRUD Demo</AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <Link to="/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              Home
            </Button>
          </Link>
          <Link to="/grid/">
            <Button themeColor="primary" fillMode="flat">
              Grid
            </Button>
          </Link>
        </AppBarSection>
      </AppBar>

      <section className="section-container">
        <h2 className="k-mb-4">직원 관리 시스템 (Grid + Form CRUD)</h2>

        <Grid
          data={employees.map((emp) => ({
            ...emp,
            actions: emp,
          }))}
          style={{ height: "400px" }}
        >
          <GridToolbar>
            <Button themeColor="primary" onClick={handleAdd}>
              신규 직원 추가
            </Button>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="80px" />
          <GridColumn field="firstName" title="성" width="120px" />
          <GridColumn field="lastName" title="이름" width="120px" />
          <GridColumn field="email" title="이메일" width="200px" />
          <GridColumn field="phone" title="전화번호" width="150px" />
          <GridColumn
            field="hireDate"
            title="입사일"
            width="150px"
            format="{0:yyyy-MM-dd}"
          />
          <GridColumn
            field="salary"
            title="연봉"
            width="120px"
            format="{0:c}"
          />
          <GridColumn field="department" title="부서" width="120px" />
          <GridColumn
            title="액션"
            width="180px"
            cells={{ data: CommandCell }}
          />
        </Grid>

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
                        label="연봉"
                        format="c0"
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
      <footer className="footer">
        <div>Copyright © 2025 Progress Software. All rights reserved.</div>
      </footer>
    </div>
  );
}
