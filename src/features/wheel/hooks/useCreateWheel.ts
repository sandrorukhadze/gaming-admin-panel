import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWheel } from "../api/wheel.api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";
import type { Wheel } from "../model/wheel.types";

export function useCreateWheel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Wheel) => createWheel(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.wheels,
      });
    },
  });
}
