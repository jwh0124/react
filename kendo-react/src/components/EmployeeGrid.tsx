import * as React from "react";
import { 
  Grid, 
  GridColumn, 
  GridToolbar,
  GridCellProps,
  GridPageChangeEvent
} from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Employee, employeeApi } from "../api/employeeApi";
import { EmployeeFormModal } from "./EmployeeFormModal";
import { type EmployeeFormData } from "../schemas/employeeSchema";
import { toast } from "../utils/toast";

interface EmployeeGridProps {
  // props 없음 - 완전 자립형 컴포넌트
}

const CommandCell = (props: GridCellProps & { onEdit: (employee: Employee) => void; onDelete: (employee: Employee) => void }) => {
  const { dataItem, onEdit, onDelete } = props;
  
  return (
    <td className="k-command-cell">
      <Button
        themeColor="primary"
        fillMode="flat"
        size="small"
        onClick={() => onEdit(dataItem)}
        style={{ marginRight: "8px" }}
      >
        수정
      </Button>
      <Button
        themeColor="error"
        fillMode="flat"
        size="small"
        onClick={() => onDelete(dataItem)}
      >
        삭제
      </Button>
    </td>
  );
};

export const EmployeeGrid: React.FC<EmployeeGridProps> = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [page, setPage] = React.useState({ skip: 0, take: 10 });
  const [editItem, setEditItem] = React.useState<Employee | null>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  
  const excelExportRef = React.useRef<ExcelExport | null>(null);

  // 데이터 로드
  const fetchEmployees = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      toast.error("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 로드
  React.useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // 페이징 처리된 데이터
  const pagedEmployees = React.useMemo(() => {
    return employees.slice(page.skip, page.skip + page.take);
  }, [employees, page.skip, page.take]);

  const handleExcelExport = () => {
    if (excelExportRef.current) {
      excelExportRef.current.save();
    }
  };

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
    if (window.confirm(`${dataItem.firstName} ${dataItem.lastName}를 삭제하시겠습니까?`)) {
      setIsLoading(true);
      try {
        await employeeApi.delete(dataItem.id);
        toast.success("직원이 삭제되었습니다.");
        await fetchEmployees();
      } catch (error) {
        console.error("삭제 실패:", error);
        toast.error("삭제에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        await employeeApi.create(data);
        toast.success("직원이 추가되었습니다.");
      } else if (editItem) {
        await employeeApi.update(editItem.id, data);
        toast.success("직원 정보가 수정되었습니다.");
      }
      await fetchEmployees();
      handleCancel();
    } catch (error) {
      console.error("저장 실패:", error);
      toast.error("저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditItem(null);
  };

  const handlePageChange = (event: GridPageChangeEvent) => {
    setPage({ skip: event.page.skip, take: event.page.take });
  };

  return (
    <>
    <ExcelExport data={employees} ref={excelExportRef}>
      <Grid 
        data={pagedEmployees} 
        style={{ height: "500px" }}
        pageable={true}
        skip={page.skip}
        take={page.take}
        total={employees.length}
        onPageChange={handlePageChange}
        showLoader={isLoading}
      >
        <GridToolbar>
          <Button 
            themeColor="primary" 
            onClick={handleExcelExport}
            iconClass="k-icon k-font-icon k-i-file-excel"
            style={{ marginRight: "8px" }}
          >
            Excel
          </Button>
          <Button themeColor="primary" onClick={handleAdd}>
            신규 직원 추가
          </Button>
          <span style={{ marginLeft: "auto", color: "#666" }}>
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
      <GridColumn
        title="액션"
        width="200px"
        cells={{
          data: (props) => <CommandCell {...props} onEdit={handleEdit} onDelete={handleDelete} />
        }}
      />
    </Grid>
    </ExcelExport>
    <EmployeeFormModal
      showDialog={showDialog}
      isNew={isNew}
      editItem={editItem}
      isCreating={isSubmitting}
      isUpdating={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
    </>
  );
};
