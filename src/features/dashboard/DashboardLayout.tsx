import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings.ts";
import Spinner from "../../ui/Spinner.tsx";
import useRecentStays from "./hooks/useRecentStays.ts";
import Stats from "./Stats.tsx";
import useCabins from "../cabins/hooks/useCabins.ts";
import SalesChart from "./SalesChart.tsx";
import DurationChart from "./DurationChart.tsx";
import TodayActivity from "../check-in-out/TodayActivity.tsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isBookingLoading, bookings } = useRecentBookings();

  const {
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const cabinCount = cabins?.length ?? 0;

  if (isBookingLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numsDays={numDays}
        cabinCount={cabinCount}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
