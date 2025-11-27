import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardTitle,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { useAuth } from "./contexts/AuthContext";

export default function HomeSimple() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="page">
      <AppBar position="top">
        <AppBarSection>KendoReact ❤️ Vite</AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <span style={{ marginRight: "16px", color: "#fff" }}>
            👤 {user?.name} ({user?.role})
          </span>
          <Link to="/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              Home
            </Button>
          </Link>
          <Link to="/grid/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              Grid
            </Button>
          </Link>
          <Link to="/crud/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              CRUD v1
            </Button>
          </Link>
          <Link to="/crud-v2/">
            <Button themeColor="primary" fillMode="flat" className="k-mr-1">
              CRUD v2 (최신)
            </Button>
          </Link>
          <Button themeColor="error" fillMode="flat" onClick={handleLogout}>
            로그아웃
          </Button>
        </AppBarSection>
      </AppBar>

      <section className="section-container" style={{ padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 className="welcome-title">Welcome to KendoReact</h1>
          <h3 className="welcome-subtitle">
            Comprehensive React UI Component Library
          </h3>
        </div>

        <div
          className="cards-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Grid Demo</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                강력한 Grid 컴포넌트로 데이터를 표시하고 관리하세요. 정렬,
                필터링, 그룹화, Excel/PDF 내보내기 등 다양한 기능을 제공합니다.
              </p>
            </CardBody>
            <CardActions>
              <Link to="/grid/">
                <Button themeColor="primary">Grid 보기</Button>
              </Link>
            </CardActions>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CRUD Demo v1</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                기본적인 CRUD 예제입니다. Grid + Form을 사용하여 직원 정보를
                추가, 수정, 삭제할 수 있습니다. (로컬 상태 관리)
              </p>
            </CardBody>
            <CardActions>
              <Link to="/crud/">
                <Button themeColor="primary">CRUD v1 보기</Button>
              </Link>
            </CardActions>
          </Card>

          <Card style={{ border: "2px solid #ff6358" }}>
            <CardHeader>
              <CardTitle>🔥 CRUD Demo v2 (최신)</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                <strong>2024-2025 최신 방식!</strong>
                <br />
                ✨ TanStack Query (서버 상태 관리)
                <br />
                ✨ Zod (스키마 기반 유효성 검사)
                <br />
                ✨ React Hook Form (폼 최적화)
                <br />✨ LocalStorage (데이터 영속성)
              </p>
            </CardBody>
            <CardActions>
              <Link to="/crud-v2/">
                <Button themeColor="error">CRUD v2 보기 (추천!)</Button>
              </Link>
            </CardActions>
          </Card>
        </div>

        <div
          style={{
            marginTop: "60px",
            padding: "30px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>🎯 주요 기능 비교</h3>
          <table className="k-table k-table-md" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>기능</th>
                <th>CRUD v1 (기본)</th>
                <th>CRUD v2 (최신)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>상태 관리</strong>
                </td>
                <td>useState (로컬)</td>
                <td>TanStack Query (서버 상태)</td>
              </tr>
              <tr>
                <td>
                  <strong>데이터 영속성</strong>
                </td>
                <td>❌ 새로고침 시 초기화</td>
                <td>✅ LocalStorage 저장</td>
              </tr>
              <tr>
                <td>
                  <strong>폼 관리</strong>
                </td>
                <td>KendoReact Form</td>
                <td>React Hook Form</td>
              </tr>
              <tr>
                <td>
                  <strong>유효성 검사</strong>
                </td>
                <td>기본 required</td>
                <td>Zod 스키마 기반</td>
              </tr>
              <tr>
                <td>
                  <strong>로딩 상태</strong>
                </td>
                <td>❌</td>
                <td>✅ Loader 표시</td>
              </tr>
              <tr>
                <td>
                  <strong>에러 핸들링</strong>
                </td>
                <td>기본 alert</td>
                <td>Toast 알림 (확장 가능)</td>
              </tr>
              <tr>
                <td>
                  <strong>타입 안전성</strong>
                </td>
                <td>TypeScript</td>
                <td>TypeScript + Zod</td>
              </tr>
              <tr>
                <td>
                  <strong>캐싱</strong>
                </td>
                <td>❌</td>
                <td>✅ 자동 캐싱 (5분)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer
        className="footer"
        style={{
          marginTop: "60px",
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div>Copyright © 2025 Progress Software. All rights reserved.</div>
      </footer>
    </div>
  );
}
