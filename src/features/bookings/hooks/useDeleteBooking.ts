import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../apiBookings.ts";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBooking,
    isPending: isDeleting,
    error,
  } = useMutation<null, Error, number>({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (_, bookingId) => {
      toast.success(`Booking #${bookingId} deleted successfully.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.removeQueries({ queryKey: ["booking", bookingId] });
    },
  });
  return { deleteBooking, isDeleting, error };
}
