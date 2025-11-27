// Zod 스키마 - 타입 안전한 유효성 검사
import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z
    .string()
    .min(1, "성을 입력하세요")
    .max(50, "성은 50자 이내로 입력하세요"),

  lastName: z
    .string()
    .min(1, "이름을 입력하세요")
    .max(50, "이름은 50자 이내로 입력하세요"),

  email: z
    .string()
    .min(1, "이메일을 입력하세요")
    .email("유효한 이메일 주소를 입력하세요"),

  phone: z
    .string()
    .min(1, "전화번호를 입력하세요")
    .regex(
      /^01[0-9]-\d{4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)"
    ),

  hireDate: z.date({
    message: "입사일을 선택하세요",
  }),

  salary: z
    .number()
    .min(1, "연봉을 입력하세요")
    .positive("연봉은 0보다 커야 합니다")
    .int("연봉은 정수로 입력하세요"),

  department: z
    .string()
    .min(1, "부서를 입력하세요")
    .max(100, "부서명은 100자 이내로 입력하세요"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
