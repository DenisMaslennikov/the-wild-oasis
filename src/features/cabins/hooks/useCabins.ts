import { useQuery } from "@tanstack/react-query";
import type { Cabin, CabinApi } from "../types/Cabin.ts";
import { getCabins } from "../apiCabins.ts";
import { toCabin } from "../utils/transform.ts";

export default function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery<CabinApi[], Error, Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
    select: (data: CabinApi[]) => data.map(toCabin),
  });
  return { cabins, isLoading, error };
}
