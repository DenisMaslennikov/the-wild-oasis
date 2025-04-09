import { useQuery } from "@tanstack/react-query";

import type { BookingWithGuestFullNameNationalityCountryFlag } from "../types/CheckInOut.ts";
import { getStaysTodayActivity } from "../../bookings/apiBookings.ts";

export default function useTodayActivity() {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery<BookingWithGuestFullNameNationalityCountryFlag[]>({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading, error };
}
