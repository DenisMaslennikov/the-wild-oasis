import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Booking } from "../../bookings/types/Booking.ts";
import { updateBooking } from "../../bookings/apiBookings.ts";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation<
    Booking,
    Error,
    {
      bookingId: number;
      breakfast:
        | {
            hasBreakfast: boolean;
            extrasPrice: number;
            totalPrice: number;
          }
        | Record<string, never>;
    }
  >({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(Number(bookingId), {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
      navigate("/");
    },

    onError: () => toast.error(`There was on error while checking in`),
  });
  return { checkin, isCheckingIn };
}
