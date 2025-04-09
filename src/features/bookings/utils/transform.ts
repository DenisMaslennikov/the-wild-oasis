import type { Booking, DetailedBookingApi } from "../types/Booking.ts";
import { toCabin } from "../../cabins/utils/transform.ts";
import type { Guest, GuestApi } from "../types/Guest.ts";

function toBooking(api: DetailedBookingApi): Booking {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, cabinId, guestId, cabins, guests, ...data } = api;
  return {
    ...data,
    createdAt: new Date(created_at),
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    cabins: toCabin(cabins),
    guests: toGuest(guests),
  };
}

function toGuest(api: GuestApi): Guest {
  const { created_at, ...data } = api;
  return {
    ...data,
    createdAt: new Date(created_at),
  };
}

export { toBooking, toGuest };
