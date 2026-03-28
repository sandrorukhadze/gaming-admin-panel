import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWheel } from "../api/wheel.api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";
import type { Wheel } from "../model/wheel.types";

interface UpdateWheelParams {
  id: string;
  payload: Wheel;
}

export function useUpdateWheel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateWheelParams) =>
      updateWheel(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.wheels,
      });
    },
  });
}
