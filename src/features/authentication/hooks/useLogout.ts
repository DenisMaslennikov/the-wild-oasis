import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../apiAuth.ts";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoginOut } = useMutation<void, Error>({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { isLoginOut, logout };
}
