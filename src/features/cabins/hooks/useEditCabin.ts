import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cabin, NewCabin } from "../types/Cabin.ts";
import { createEditCabin } from "../apiCabins.ts";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation<
    Cabin,
    Error,
    { newCabinData: NewCabin; id: number }
  >({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editCabin, isEditing };
}
