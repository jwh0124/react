// API 클라이언트 - 실제 백엔드가 있다면 axios 사용
// 지금은 LocalStorage를 사용한 Mock API

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

const STORAGE_KEY = "employees";

// 초기 데이터
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

// LocalStorage에서 데이터 가져오기
const getStoredEmployees = (): Employee[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));
    return initialEmployees;
  }
  return JSON.parse(stored).map((emp: any) => ({
    ...emp,
    hireDate: new Date(emp.hireDate),
  }));
};

// LocalStorage에 데이터 저장
const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

// API 함수들 (실제 서버 통신처럼 동작)
export const employeeApi = {
  // 전체 조회
  getAll: async (): Promise<Employee[]> => {
    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredEmployees();
  },

  // 단일 조회
  getById: async (id: number): Promise<Employee | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const employees = getStoredEmployees();
    return employees.find((emp) => emp.id === id);
  },

  // 생성
  create: async (employee: Omit<Employee, "id">): Promise<Employee> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const employees = getStoredEmployees();
    const newEmployee = {
      ...employee,
      id: Math.max(...employees.map((e) => e.id), 0) + 1,
    };
    const updated = [...employees, newEmployee];
    saveEmployees(updated);
    return newEmployee;
  },

  // 수정
  update: async (
    id: number,
    employee: Partial<Employee>
  ): Promise<Employee> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const employees = getStoredEmployees();
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) throw new Error("직원을 찾을 수 없습니다.");

    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...employee } : emp
    );
    saveEmployees(updated);
    return updated[index];
  },

  // 삭제
  delete: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const employees = getStoredEmployees();
    const updated = employees.filter((emp) => emp.id !== id);
    saveEmployees(updated);
  },
};
