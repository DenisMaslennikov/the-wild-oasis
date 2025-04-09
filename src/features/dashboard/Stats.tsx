import { BookingStatisticApi, StaysStatisticApi } from "./types/Statistic.ts";
import Stat from "./Stat.tsx";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.ts";

function Stats({
  bookings,
  confirmedStays,
  numsDays,
  cabinCount,
}: {
  bookings?: BookingStatisticApi[];
  confirmedStays?: StaysStatisticApi[];
  numsDays: number;
  cabinCount: number;
}) {
  // 1.
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, el) => acc + el.totalPrice, 0) ?? 0;

  // 3.
  const checkins = confirmedStays?.length ?? 0;

  // 4.
  const occupations =
    ((confirmedStays?.reduce((acc, el) => acc + el.numNights, 0) ?? 0) /
      (numsDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={`${occupations.toFixed(2)}%`}
      />
    </>
  );
}

export default Stats;
