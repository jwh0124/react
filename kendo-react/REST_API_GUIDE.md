# REST API 통신 설정 가이드

## 📡 REST API로 전환하기

현재 프로젝트는 LocalStorage를 사용한 Mock API와 실제 REST API 두 가지 방식을 모두 지원합니다.

## 🔧 설정 방법

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 API 서버 주소를 설정하세요:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

프로덕션 환경:

```bash
VITE_API_BASE_URL=https://api.yourcompany.com
```

### 2. API 클라이언트 전환

`src/hooks/useEmployees.ts` 파일에서 import를 변경하세요:

```typescript
// LocalStorage Mock API (현재)
import { employeeApi } from "../api/employeeApi";

// REST API로 변경
import { employeeApi } from "../api/employeeApiRest";
```

## 📋 백엔드 API 명세

### Base URL

```
http://localhost:3000/api
```

### 엔드포인트

#### 1. 전체 직원 조회

```
GET /employees
```

**응답 예시:**

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "김",
      "lastName": "철수",
      "email": "kim@example.com",
      "phone": "010-1234-5678",
      "hireDate": "2020-01-15T00:00:00.000Z",
      "salary": 50000000,
      "department": "개발팀"
    }
  ],
  "message": "success"
}
```

#### 2. 단일 직원 조회

```
GET /employees/:id
```

**응답 예시:**

```json
{
  "data": {
    "id": 1,
    "firstName": "김",
    "lastName": "철수",
    "email": "kim@example.com",
    "phone": "010-1234-5678",
    "hireDate": "2020-01-15T00:00:00.000Z",
    "salary": 50000000,
    "department": "개발팀"
  }
}
```

#### 3. 직원 생성

```
POST /employees
```

**요청 본문:**

```json
{
  "firstName": "이",
  "lastName": "영희",
  "email": "lee@example.com",
  "phone": "010-2345-6789",
  "hireDate": "2021-03-20T00:00:00.000Z",
  "salary": 55000000,
  "department": "디자인팀"
}
```

**응답 예시:**

```json
{
  "data": {
    "id": 4,
    "firstName": "이",
    "lastName": "영희",
    "email": "lee@example.com",
    "phone": "010-2345-6789",
    "hireDate": "2021-03-20T00:00:00.000Z",
    "salary": 55000000,
    "department": "디자인팀"
  },
  "message": "직원이 추가되었습니다."
}
```

#### 4. 직원 정보 수정

```
PUT /employees/:id
```

**요청 본문:** (부분 수정 가능)

```json
{
  "salary": 60000000,
  "department": "개발팀"
}
```

**응답 예시:**

```json
{
  "data": {
    "id": 1,
    "firstName": "김",
    "lastName": "철수",
    "email": "kim@example.com",
    "phone": "010-1234-5678",
    "hireDate": "2020-01-15T00:00:00.000Z",
    "salary": 60000000,
    "department": "개발팀"
  },
  "message": "직원 정보가 수정되었습니다."
}
```

#### 5. 직원 삭제

```
DELETE /employees/:id
```

**응답 예시:**

```json
{
  "message": "직원이 삭제되었습니다."
}
```

## 🔐 인증 (선택사항)

API에 인증이 필요한 경우, `src/api/apiClient.ts`에서 자동으로 Authorization 헤더를 추가합니다:

```typescript
// 로그인 후 토큰 저장
localStorage.setItem("auth_token", "your-jwt-token");

// 이후 모든 API 요청에 자동으로 헤더 추가됨
// Authorization: Bearer your-jwt-token
```

## 🛠️ 백엔드 예시 (Node.js + Express)

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let employees = [
  {
    id: 1,
    firstName: "김",
    lastName: "철수",
    email: "kim@example.com",
    phone: "010-1234-5678",
    hireDate: "2020-01-15T00:00:00.000Z",
    salary: 50000000,
    department: "개발팀",
  },
];

// 전체 조회
app.get("/api/employees", (req, res) => {
  res.json({ data: employees });
});

// 단일 조회
app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ message: "직원을 찾을 수 없습니다." });
  }
  res.json({ data: employee });
});

// 생성
app.post("/api/employees", (req, res) => {
  const newEmployee = {
    id: Math.max(...employees.map((e) => e.id), 0) + 1,
    ...req.body,
  };
  employees.push(newEmployee);
  res
    .status(201)
    .json({ data: newEmployee, message: "직원이 추가되었습니다." });
});

// 수정
app.put("/api/employees/:id", (req, res) => {
  const index = employees.findIndex((e) => e.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "직원을 찾을 수 없습니다." });
  }
  employees[index] = { ...employees[index], ...req.body };
  res.json({ data: employees[index], message: "직원 정보가 수정되었습니다." });
});

// 삭제
app.delete("/api/employees/:id", (req, res) => {
  employees = employees.filter((e) => e.id !== parseInt(req.params.id));
  res.json({ message: "직원이 삭제되었습니다." });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## 🔄 에러 처리

API 클라이언트는 자동으로 다음 에러를 처리합니다:

- **401 Unauthorized** - 인증 만료
- **404 Not Found** - 리소스를 찾을 수 없음
- **500 Internal Server Error** - 서버 오류
- **Network Error** - 네트워크 연결 실패

커스텀 에러 처리가 필요한 경우 `src/api/apiClient.ts`의 인터셉터를 수정하세요.

## 📦 CORS 설정

백엔드에서 CORS를 허용해야 합니다:

```javascript
// Node.js + Express
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5174", // 프론트엔드 URL
    credentials: true,
  })
);
```

## 🧪 테스트

API가 정상적으로 동작하는지 확인:

```bash
# 전체 조회
curl http://localhost:3000/api/employees

# 생성
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"홍","lastName":"길동","email":"hong@example.com","phone":"010-9999-8888","hireDate":"2023-01-01","salary":45000000,"department":"영업팀"}'
```

## 📝 참고사항

1. **날짜 형식**: ISO 8601 형식 (`YYYY-MM-DDTHH:mm:ss.sssZ`)
2. **타임존**: UTC 기준으로 저장/전송
3. **에러 응답**: 일관된 형식 사용
   ```json
   {
     "error": "에러 메시지",
     "code": "ERROR_CODE"
   }
   ```
