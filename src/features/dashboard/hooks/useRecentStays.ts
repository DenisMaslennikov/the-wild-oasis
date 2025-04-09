import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { getStaysAfterDate } from "../../bookings/apiBookings.ts";
import { StaysStatisticApi } from "../types/Statistic.ts";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery<StaysStatisticApi[]>({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (el) => el.status === "checked-in" || el.status === "checked-out",
  );

  return { stays, isLoading, error, confirmedStays, numDays };
}
