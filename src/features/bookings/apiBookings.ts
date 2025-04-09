import { getToday } from "../../utils/helpers.ts";
import supabase from "../../services/supabase.ts";
import type { DetailedBookingApi, UpdateBooking } from "./types/Booking.ts";
import type { Filter } from "../../types/Filter.ts";
import type { SortBy } from "../../types/SortBy.ts";
import { ApiResultsWithCount } from "../../types/ApiResultsWithCount.ts";
import { PAGE_SIZE } from "../../utils/constants.ts";
import {
  BookingStatisticApi,
  StaysStatisticApi,
} from "../dashboard/types/Statistic.ts";
import { BookingWithGuestFullNameNationalityCountryFlag } from "../check-in-out/types/CheckInOut.ts";

export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter: Filter | null;
  sortBy: SortBy | null;
  page: number | null;
}): Promise<ApiResultsWithCount<DetailedBookingApi[]>> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)", { count: "exact" });

  if (filter) {
    switch (filter.method) {
      case "gte":
        query = query.gte(filter.field, filter.value);
        break;
      case "lte":
        query = query.lte(filter.field, filter.value);
        break;
      case "eq":
        query = query.eq(filter.field, filter.value);
        break;
      case "neq":
        query = query.neq(filter.field, filter.value);
        break;
      case "gt":
        query = query.gt(filter.field, filter.value);
        break;
      case "lt":
        query = query.lt(filter.field, filter.value);
        break;
      default:
        query = query.eq(filter.field, filter.value);
    }
  }

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } =
    await query.overrideTypes<DetailedBookingApi[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }))
    .overrideTypes<BookingStatisticApi[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday())
    .overrideTypes<StaysStatisticApi[]>();

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at")
    .overrideTypes<BookingWithGuestFullNameNationalityCountryFlag[]>();

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function updateBooking(id: number, obj: UpdateBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
