// 인증 API - Mock 데이터
export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}

// Mock 사용자 데이터
const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@example.com",
    role: "admin" as const,
    name: "관리자",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@example.com",
    role: "user" as const,
    name: "김철수",
  },
  {
    id: 3,
    username: "demo",
    password: "demo123",
    email: "demo@example.com",
    role: "user" as const,
    name: "이영희",
  },
];

// 토큰 생성 (Mock)
const generateToken = (userId: number): string => {
  return `mock-token-${userId}-${Date.now()}`;
};

// 로그인 API
export const authApi = {
  // 로그인
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = mockUsers.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }

    const token = generateToken(user.id);
    const { password, ...userWithoutPassword } = user;

    // 토큰과 사용자 정보를 localStorage에 저장
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    return {
      user: userWithoutPassword,
      token,
      expiresIn: 3600, // 1시간
    };
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // 토큰 확인
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  // 인증 상태 확인
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },
};

// Mock 사용자 목록 (개발용)
export const MOCK_USERS = mockUsers.map(({ password, ...user }) => ({
  ...user,
  password: "***", // 비밀번호는 숨김
}));
