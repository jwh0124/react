// 커스텀 훅 - 비즈니스 로직 분리
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi, type Employee } from "../api/employeeApi";
import { toast } from "../utils/toast";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  // 조회
  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: employeeApi.getAll,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  // 생성
  const createMutation = useMutation({
    mutationFn: employeeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("직원이 추가되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`추가 실패: ${error.message}`);
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Employee> }) =>
      employeeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("직원 정보가 수정되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`수정 실패: ${error.message}`);
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: employeeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("직원이 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });

  return {
    employees,
    isLoading,
    error,
    createEmployee: createMutation.mutateAsync,
    updateEmployee: updateMutation.mutateAsync,
    deleteEmployee: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
