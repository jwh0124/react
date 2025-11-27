// API 클라이언트 - REST API 통신
import apiClient from "./apiClient";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hireDate: Date;
  salary: number;
  department: string;
}

// API 응답 타입
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 날짜 변환 헬퍼 함수
const parseEmployee = (emp: any): Employee => ({
  ...emp,
  hireDate: new Date(emp.hireDate),
});

// API 함수들 - REST API 통신
export const employeeApi = {
  // 전체 조회 - GET /employees
  getAll: async (): Promise<Employee[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Employee[]>>(
        "/employees"
      );
      return response.data.data.map(parseEmployee);
    } catch (error) {
      console.error("직원 목록 조회 실패:", error);
      throw new Error("직원 목록을 불러오는데 실패했습니다.");
    }
  },

  // 단일 조회 - GET /employees/:id
  getById: async (id: number): Promise<Employee> => {
    try {
      const response = await apiClient.get<ApiResponse<Employee>>(
        `/employees/${id}`
      );
      return parseEmployee(response.data.data);
    } catch (error) {
      console.error("직원 조회 실패:", error);
      throw new Error("직원 정보를 불러오는데 실패했습니다.");
    }
  },

  // 생성 - POST /employees
  create: async (employee: Omit<Employee, "id">): Promise<Employee> => {
    try {
      const response = await apiClient.post<ApiResponse<Employee>>(
        "/employees",
        employee
      );
      return parseEmployee(response.data.data);
    } catch (error) {
      console.error("직원 추가 실패:", error);
      throw new Error("직원 추가에 실패했습니다.");
    }
  },

  // 수정 - PUT /employees/:id 또는 PATCH /employees/:id
  update: async (
    id: number,
    employee: Partial<Employee>
  ): Promise<Employee> => {
    try {
      const response = await apiClient.put<ApiResponse<Employee>>(
        `/employees/${id}`,
        employee
      );
      return parseEmployee(response.data.data);
    } catch (error) {
      console.error("직원 수정 실패:", error);
      throw new Error("직원 정보 수정에 실패했습니다.");
    }
  },

  // 삭제 - DELETE /employees/:id
  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/employees/${id}`);
    } catch (error) {
      console.error("직원 삭제 실패:", error);
      throw new Error("직원 삭제에 실패했습니다.");
    }
  },
};
