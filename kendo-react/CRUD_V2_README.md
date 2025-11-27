# KendoReact CRUD Demo - v2 (최신 방식)

## 🚀 업그레이드 완료!

기존 CRUD 예제를 **2024-2025 최신 React 개발 방식**으로 업그레이드했습니다.

## 📦 추가된 패키지

```bash
npm install @tanstack/react-query zod react-hook-form @hookform/resolvers axios
```

## 🏗️ 새로운 파일 구조

```
src/
├── api/
│   └── employeeApi.ts          # API 클라이언트 (LocalStorage Mock)
├── hooks/
│   └── useEmployees.ts         # 커스텀 훅 (비즈니스 로직 분리)
├── schemas/
│   └── employeeSchema.ts       # Zod 유효성 검사 스키마
├── utils/
│   └── toast.ts                # 토스트 알림 유틸리티
├── EmployeeCRUD.tsx            # v1 - 기본 방식
├── EmployeeCRUDv2.tsx          # v2 - 최신 방식 ⭐
└── HomeNew.tsx                 # 업데이트된 홈페이지
```

## ✨ 주요 개선사항

### 1. **TanStack Query (React Query)**

- 서버 상태 관리 자동화
- 자동 캐싱 (5분)
- 로딩/에러 상태 자동 관리
- 낙관적 업데이트 가능

```typescript
const { data: employees, isLoading } = useQuery({
  queryKey: ["employees"],
  queryFn: employeeApi.getAll,
  staleTime: 1000 * 60 * 5,
});
```

### 2. **Zod 스키마 기반 유효성 검사**

- 타입 안전한 유효성 검사
- 명확한 에러 메시지
- 런타임 타입 체크

```typescript
const employeeSchema = z.object({
  firstName: z.string().min(1, "성을 입력하세요"),
  email: z.string().email("유효한 이메일을 입력하세요"),
  phone: z.string().regex(/^01[0-9]-\d{4}-\d{4}$/, "올바른 형식이 아닙니다"),
  // ...
});
```

### 3. **React Hook Form**

- 최적화된 폼 성능 (불필요한 리렌더링 최소화)
- 간편한 폼 상태 관리
- Zod와 완벽한 통합

```typescript
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(employeeSchema),
  mode: "onChange",
});
```

### 4. **데이터 영속성 (LocalStorage)**

- 새로고침해도 데이터 유지
- 실제 백엔드 API처럼 동작하는 Mock API
- 네트워크 지연 시뮬레이션

### 5. **커스텀 훅으로 비즈니스 로직 분리**

```typescript
const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee } =
  useEmployees();
```

## 🎯 기능 비교표

| 기능          | v1 (기본)       | v2 (최신)         |
| ------------- | --------------- | ----------------- |
| 상태 관리     | useState        | TanStack Query    |
| 데이터 영속성 | ❌              | ✅ LocalStorage   |
| 폼 관리       | KendoReact Form | React Hook Form   |
| 유효성 검사   | 기본 required   | Zod 스키마        |
| 로딩 상태     | ❌              | ✅                |
| 에러 핸들링   | alert           | Toast (확장 가능) |
| 타입 안전성   | TypeScript      | TypeScript + Zod  |
| 캐싱          | ❌              | ✅ 자동 (5분)     |
| API 구조      | ❌              | ✅ 분리됨         |

## 🌐 접속 방법

서버 실행:

```bash
npm run dev
```

접속 URL:

- 홈: http://localhost:5174/
- Grid: http://localhost:5174/grid/
- CRUD v1 (기본): http://localhost:5174/crud/
- **CRUD v2 (최신)**: http://localhost:5174/crud-v2/ ⭐

## 📚 사용된 주요 라이브러리

- **React 18.3** - 최신 React
- **TypeScript 5.5** - 타입 안전성
- **Vite 5.4** - 빠른 빌드 도구
- **KendoReact 13.0** - UI 컴포넌트
- **TanStack Query** - 서버 상태 관리
- **Zod** - 스키마 기반 유효성 검사
- **React Hook Form** - 폼 최적화
- **React Router 6** - 라우팅

## 🔄 실제 백엔드 연동 시

현재는 LocalStorage를 사용하지만, 실제 백엔드 연동 시:

```typescript
// src/api/employeeApi.ts
import axios from "axios";

const API_BASE_URL = "https://api.example.com";

export const employeeApi = {
  getAll: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/employees`);
    return data;
  },
  create: async (employee) => {
    const { data } = await axios.post(`${API_BASE_URL}/employees`, employee);
    return data;
  },
  // ...
};
```

## 💡 추가 개선 가능 사항

1. **react-hot-toast** 또는 **sonner** 추가 (더 나은 알림)
2. **React Query Devtools** 추가 (디버깅)
3. **Tanstack Table** 사용 (더 강력한 테이블)
4. **Axios Interceptors** (인증, 에러 처리)
5. **Optimistic Updates** (낙관적 업데이트)
6. **Infinite Query** (무한 스크롤)

## 📖 참고 자료

- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Zod 문서](https://zod.dev/)
- [React Hook Form 문서](https://react-hook-form.com/)
- [KendoReact 문서](https://www.telerik.com/kendo-react-ui/components/)

---

**🎉 이제 최신 방식의 React CRUD 애플리케이션을 사용할 수 있습니다!**
