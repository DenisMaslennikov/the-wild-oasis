import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Booking } from "../../bookings/types/Booking.ts";
import { updateBooking } from "../../bookings/apiBookings.ts";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation<
    Booking,
    Error,
    number
  >({
    mutationFn: (bookingId) =>
      updateBooking(Number(bookingId), {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ type: "active" });
    },

    onError: () => toast.error(`There was on error while checking out`),
  });
  return { checkout, isCheckingOut };
}
