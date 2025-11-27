import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (인증 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어남
      console.error("API Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
        // 인증 만료 - 로그인 페이지로 리다이렉트 등
        console.error("인증이 만료되었습니다.");
      }
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함
      console.error("네트워크 오류:", error.request);
    } else {
      // 요청 설정 중에 오류 발생
      console.error("요청 오류:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
