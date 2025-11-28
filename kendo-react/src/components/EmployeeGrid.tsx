import * as React from "react";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Employee } from "../api/employeeApi";

interface EmployeeGridProps {
  employees: Employee[];
  onAdd: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeGrid: React.FC<EmployeeGridProps> = ({
  employees,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Grid data={employees} style={{ height: "500px" }}>
        <GridToolbar>
          <Button themeColor="primary" onClick={onAdd}>
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
                    onClick={() => onEdit(employee)}
                    className="k-mr-2"
                  >
                    수정
                  </Button>
                  <Button
                    themeColor="error"
                    fillMode="flat"
                    size="small"
                    onClick={() => onDelete(employee)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
