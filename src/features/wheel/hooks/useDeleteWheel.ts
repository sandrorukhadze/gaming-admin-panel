import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWheel } from "../api/wheel.api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";

export function useDeleteWheel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteWheel(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.wheels,
      });
    },
  });
}
