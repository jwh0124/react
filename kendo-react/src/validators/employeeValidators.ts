export const requiredValidator = (value: any) =>
  value ? "" : "필수 입력 항목입니다.";

export const emailValidator = (value: string) => {
  if (!value) return "필수 입력 항목입니다.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "";
};

export const phoneValidator = (value: string) => {
  if (!value) return "필수 입력 항목입니다.";
  if (!/^\d{3}-\d{4}-\d{4}$/.test(value)) {
    return "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
  }
  return "";
};

export const salaryValidator = (value: number) => {
  if (value === undefined || value === null) return "필수 입력 항목입니다.";
  if (value < 0) return "연봉은 0 이상이어야 합니다.";
  return "";
};
