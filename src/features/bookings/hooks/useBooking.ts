import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../apiBookings.ts";
import type { DetailedBookingApi, Booking } from "../types/Booking.ts";
import { toBooking } from "../utils/transform.ts";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery<DetailedBookingApi, Error, Booking>({
    queryKey: ["booking", Number(bookingId)],
    queryFn: () => getBooking(Number(bookingId)),
    select: (booking) => toBooking(booking),
    retry: false,
  });

  return { isLoading, booking, error };
}
