import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Booking, DetailedBookingApi } from "../types/Booking.ts";
import { getBookings } from "../apiBookings.ts";
import { toBooking } from "../utils/transform.ts";
import type { Filter } from "../../../types/Filter.ts";
import { ApiResultsWithCount } from "../../../types/ApiResultsWithCount.ts";
import { PAGE_SIZE } from "../../../utils/constants.ts";

export default function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter: Filter | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, directionRaw] = sortByRaw.split("-");

  const direction: "asc" | "desc" = directionRaw === "asc" ? "asc" : "desc";

  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading, error } = useQuery<
    ApiResultsWithCount<DetailedBookingApi[]>,
    Error,
    ApiResultsWithCount<Booking[]>
  >({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    select: ({ data, count }) => {
      return { data: data.map(toBooking), count };
    },
  });

  const bookings = data?.data ?? [];
  // For Error
  // const bookings = data?.data;
  const count = data?.count ?? 0;

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}
