import { useQuery } from "@tanstack/react-query";
import { getWheelById } from "../api/wheel.api";
import type { Wheel } from "../model/wheel.types";

export function useWheelById(id: string | null, enabled: boolean) {
  return useQuery<Wheel>({
    queryKey: ["wheels", "detail", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Wheel id is required");
      }

      return getWheelById(id);
    },
    enabled: enabled && Boolean(id),
  });
}
