# 🔐 로그인 & 인증 시스템 가이드

## ✨ 추가된 기능

Mock 데이터 기반의 완전한 로그인 및 인증 시스템이 추가되었습니다!

## 📦 새로 추가된 파일

```
src/
├── api/
│   └── authApi.ts              # 인증 API (Mock)
├── contexts/
│   └── AuthContext.tsx         # 인증 Context (전역 상태)
├── components/
│   └── ProtectedRoute.tsx      # 보호된 라우트 컴포넌트
└── pages/
    └── Login.tsx               # 로그인 페이지
```

## 🔑 테스트 계정

| 이름   | 아이디  | 비밀번호   | 역할  |
| ------ | ------- | ---------- | ----- |
| 관리자 | `admin` | `admin123` | admin |
| 김철수 | `user`  | `user123`  | user  |
| 이영희 | `demo`  | `demo123`  | user  |

## 🎯 주요 기능

### 1. 로그인 페이지 (`/login`)

- ✅ Zod 기반 유효성 검사
- ✅ 에러 메시지 표시
- ✅ 로딩 상태 표시
- ✅ 빠른 로그인 버튼 (테스트용)
- ✅ 아름다운 그라데이션 디자인

### 2. 인증 상태 관리

- ✅ Context API로 전역 상태 관리
- ✅ LocalStorage에 토큰 저장
- ✅ 자동 로그인 (새로고침 후에도 유지)
- ✅ useAuth 훅으로 어디서든 사용 가능

### 3. 보호된 라우트

- ✅ 로그인하지 않으면 자동으로 로그인 페이지로 이동
- ✅ 로그인 후 원래 가려던 페이지로 자동 이동
- ✅ 로딩 상태 표시

### 4. 로그아웃

- ✅ 모든 페이지 헤더에 로그아웃 버튼
- ✅ 현재 사용자 정보 표시 (이름, 역할)

## 🚀 사용 방법

### 1. 로그인

```
1. 브라우저에서 http://localhost:5174/ 접속
2. 자동으로 로그인 페이지로 이동
3. 테스트 계정 중 하나 선택하여 "적용" 클릭
4. "로그인" 버튼 클릭
```

### 2. 인증된 페이지 접근

로그인 후 모든 페이지에 자유롭게 접근할 수 있습니다:

- Home: `/`
- Grid: `/grid/`
- CRUD v1: `/crud/`
- CRUD v2: `/crud-v2/`

### 3. 로그아웃

상단 네비게이션 바의 "로그아웃" 버튼을 클릭하면 로그인 페이지로 이동합니다.

## 💻 코드 예시

### useAuth 훅 사용하기

```typescript
import { useAuth } from "./contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>환영합니다, {user?.name}님!</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <p>로그인이 필요합니다</p>
      )}
    </div>
  );
}
```

### 보호된 라우트 만들기

```typescript
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/my-page",
    element: (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    ),
  },
]);
```

## 🔧 커스터마이징

### 1. 새로운 사용자 추가

`src/api/authApi.ts` 파일에서 `mockUsers` 배열에 추가:

```typescript
const mockUsers = [
  {
    id: 4,
    username: "newuser",
    password: "password123",
    email: "newuser@example.com",
    role: "user" as const,
    name: "새로운 사용자",
  },
];
```

### 2. 실제 API로 전환

`src/api/authApi.ts`를 수정하여 실제 백엔드 API를 호출:

```typescript
import apiClient from "./apiClient";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    const { token, user } = response.data;

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  },
};
```

### 3. 토큰 만료 처리

`src/api/apiClient.ts`의 인터셉터가 자동으로 401 에러를 처리합니다:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 - 로그아웃 처리
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## 🔐 보안 고려사항

### 현재 구현 (Mock)

- ⚠️ 비밀번호가 평문으로 저장됨
- ⚠️ 토큰이 실제 JWT가 아님
- ⚠️ 서버 측 검증 없음

### 프로덕션 권장사항

1. **비밀번호 해싱**: bcrypt 등 사용
2. **JWT 토큰**: 실제 JWT 사용 (만료 시간 포함)
3. **HTTPS**: 프로덕션에서는 필수
4. **Refresh Token**: 장기 인증을 위한 리프레시 토큰
5. **CSRF 보호**: Cross-Site Request Forgery 방어
6. **Rate Limiting**: 무차별 대입 공격 방어

## 📝 API 명세 (프로덕션용)

### POST /auth/login

**요청:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**응답:**

```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "name": "관리자"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### POST /auth/logout

**요청:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**응답:**

```json
{
  "message": "로그아웃 되었습니다."
}
```

### GET /auth/me

현재 로그인한 사용자 정보 조회

**헤더:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**응답:**

```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "name": "관리자"
  }
}
```

## 🎨 UI/UX 특징

- ✨ 그라데이션 배경 (보라색 → 핑크색)
- 🎯 카드 기반 레이아웃
- 📱 반응형 디자인
- ⚡ 로딩 상태 시각화
- ❌ 명확한 에러 메시지
- 🚀 빠른 로그인 버튼 (개발용)

## 🔗 관련 파일

- `src/main.tsx` - AuthProvider 및 라우트 설정
- `src/HomeNew.tsx` - 사용자 정보 표시 및 로그아웃
- `src/EmployeeCRUDv2.tsx` - 사용자 정보 표시 및 로그아웃

---

**🎉 이제 완전한 인증 시스템이 구현되었습니다!**

로그인 후 모든 기능을 사용할 수 있으며, 개발 중에는 빠른 로그인 버튼으로 편리하게 테스트할 수 있습니다.
