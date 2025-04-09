import type { BaseBooking } from "../../bookings/types/Booking.ts";

interface BookingStatisticApi {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

interface StaysStatisticApi extends BaseBooking {
  guests: { fullName: string };
}

export type { BookingStatisticApi, StaysStatisticApi };
