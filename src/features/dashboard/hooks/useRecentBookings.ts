import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { getBookingsAfterDate } from "../../bookings/apiBookings.ts";
import { BookingStatisticApi } from "../types/Statistic.ts";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery<BookingStatisticApi[]>({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isLoading, error, numDays };
}
