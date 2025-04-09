import type { Guest, GuestApi } from "./Guest.ts";
import type { Cabin, CabinApi } from "../../cabins/types/Cabin.ts";
import type {
  CheckIn,
  CheckInWithBreakfast,
  CheckOut,
} from "../../check-in-out/types/CheckInOut.ts";

interface BaseBooking {
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
}

interface DetailedBookingApi extends BaseBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  cabins: CabinApi;
  guests: GuestApi;
}

interface Booking extends BaseBooking {
  id: number;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  cabins: Cabin;
  guests: Guest;
}

type UpdateBooking = CheckIn | CheckInWithBreakfast | CheckOut;

export type { DetailedBookingApi, Booking, UpdateBooking, BaseBooking };
