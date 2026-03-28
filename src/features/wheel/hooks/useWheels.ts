import { useQuery } from "@tanstack/react-query";
import { getWheels } from "../api/wheel.api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";
import type { Wheel } from "../model/wheel.types";

export function useWheels() {
  return useQuery<Wheel[]>({
    queryKey: QUERY_KEYS.wheels,
    queryFn: getWheels,
  });
}
