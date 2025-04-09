import type { BaseBooking } from "../../bookings/types/Booking.ts";

export interface CheckIn {
  isPaid: true;
  status: "checked-in";
}

export interface CheckInWithBreakfast extends CheckIn {
  hasBreakfast: boolean;
  extrasPrice: number;
  totalPrice: number;
}

export interface CheckOut {
  status: "checked-out";
}

export interface BookingWithGuestFullNameNationalityCountryFlag
  extends BaseBooking {
  id: number;
  guests: {
    fullName: string;
    nationality: string;
    countryFlag: string;
  };
}
