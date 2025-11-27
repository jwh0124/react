import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Loader } from "@progress/kendo-react-indicators";

import { useAuth } from "../contexts/AuthContext";
import { MOCK_USERS } from "../api/authApi";

const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력하세요"),
  password: z.string().min(1, "비밀번호를 입력하세요"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      setIsLoading(true);
      await login(data.username, data.password);

      // 로그인 성공 후 이전 페이지 또는 홈으로 이동
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 빠른 로그인 버튼
  const quickLogin = (username: string, password: string) => {
    setValue("username", username);
    setValue("password", password);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <CardHeader>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CardTitle>
              <h2 style={{ margin: 0 }}>🔐 로그인</h2>
            </CardTitle>
            <p style={{ color: "#666", marginTop: "8px" }}>
              KendoReact CRUD Demo
            </p>
          </div>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "20px" }}>
              <label className="k-label k-form-label">아이디</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="아이디를 입력하세요"
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.username && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.username.message}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="k-label k-form-label">비밀번호</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.password && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.password.message}
                </div>
              )}
            </div>

            {error && (
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                ❌ {error}
              </div>
            )}

            <Button
              themeColor="primary"
              type="submit"
              disabled={isLoading}
              style={{ width: "100%", height: "44px" }}
            >
              {isLoading ? (
                <>
                  <Loader size="small" type="infinite-spinner" />
                  <span style={{ marginLeft: "8px" }}>로그인 중...</span>
                </>
              ) : (
                "로그인"
              )}
            </Button>
          </form>

          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <h4
              style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}
            >
              💡 테스트 계정
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {MOCK_USERS.map((user) => (
                <div
                  key={user.id}
                  style={{
                    padding: "12px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "13px" }}>
                    <strong>{user.name}</strong>
                    <br />
                    <span style={{ color: "#666" }}>
                      {user.username} / {user.username}123
                    </span>
                  </div>
                  <Button
                    size="small"
                    fillMode="flat"
                    themeColor="primary"
                    onClick={() =>
                      quickLogin(user.username, `${user.username}123`)
                    }
                  >
                    적용
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
            }}
          >
            로그인하면 모든 기능을 사용할 수 있습니다
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
