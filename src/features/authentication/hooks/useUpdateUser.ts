import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser as updateCurrentUserApi } from "../apiAuth.ts";

import type { User } from "@supabase/supabase-js";
import type { UpdateUser } from "../types/User.ts";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending: isUserUpdating } = useMutation<
    { user: User },
    Error,
    UpdateUser
  >({
    mutationFn: updateCurrentUserApi,
    onSuccess: ({ user }) => {
      toast.success("User account updated successfully.");
      queryClient.setQueriesData({ queryKey: ["user"] }, user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast(error.message);
    },
  });
  return { updateCurrentUser, isUserUpdating };
}
