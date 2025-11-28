import { Button } from "@progress/kendo-react-buttons";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import * as React from "react";

import { Employee } from "../api/employeeApi";
import { type EmployeeFormData } from "../schemas/employeeSchema";
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
  salaryValidator,
} from "../validators/employeeValidators";

interface EmployeeFormModalProps {
  showDialog: boolean;
  isNew: boolean;
  editItem: Employee | null;
  isCreating: boolean;
  isUpdating: boolean;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
}

const INITIAL_EMPLOYEE: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hireDate: new Date(),
  salary: 0,
  department: "",
};

const toFormData = (employee: Employee): EmployeeFormData => ({
  ...employee,
  hireDate: new Date(employee.hireDate),
});

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  showDialog,
  isNew,
  editItem,
  isCreating,
  isUpdating,
  onSubmit,
  onCancel,
}) => {
  const initialValues = React.useMemo(() => {
    return editItem ? toFormData(editItem) : INITIAL_EMPLOYEE;
  }, [editItem]);

  if (!showDialog) return null;

  const handleFormSubmit = (dataItem: { [name: string]: any }) => {
    onSubmit(dataItem as EmployeeFormData);
  };

  return (
    <Dialog
      title={isNew ? "신규 직원 추가" : "직원 정보 수정"}
      onClose={onCancel}
      width={550}
    >
      <Form
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        render={(formRenderProps) => (
          <FormElement style={{ padding: "20px" }}>
            <fieldset className="k-form-fieldset">
              <div className="k-mb-4">
                <Field
                  name="firstName"
                  component={Input}
                  label="성 *"
                  placeholder="예: 김"
                  validator={requiredValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="lastName"
                  component={Input}
                  label="이름 *"
                  placeholder="예: 철수"
                  validator={requiredValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="email"
                  component={Input}
                  label="이메일 *"
                  type="email"
                  placeholder="예: kim@example.com"
                  validator={emailValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="phone"
                  component={Input}
                  label="전화번호 *"
                  placeholder="예: 010-1234-5678"
                  validator={phoneValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="hireDate"
                  component={DatePicker}
                  label="입사일 *"
                  format="yyyy-MM-dd"
                  validator={requiredValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="salary"
                  component={NumericTextBox}
                  label="연봉 (원) *"
                  format="n0"
                  min={0}
                  validator={salaryValidator}
                />
              </div>

              <div className="k-mb-4">
                <Field
                  name="department"
                  component={Input}
                  label="부서 *"
                  placeholder="예: 개발팀"
                  validator={requiredValidator}
                />
              </div>
            </fieldset>

            <DialogActionsBar>
              <Button onClick={onCancel} type="button">
                취소
              </Button>
              <Button
                themeColor="primary"
                type="submit"
                disabled={
                  !formRenderProps.allowSubmit || isCreating || isUpdating
                }
              >
                {isCreating || isUpdating
                  ? "처리 중..."
                  : isNew
                  ? "추가"
                  : "저장"}
              </Button>
            </DialogActionsBar>
          </FormElement>
        )}
      />
    </Dialog>
  );
};
