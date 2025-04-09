import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthResponse } from "@supabase/supabase-js";

import { login as loginApi } from "../apiAuth";
import type { Login } from "../types/Login.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    error,
    isPending: isLogin,
  } = useMutation<AuthResponse["data"], Error, Login>({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["user"] }, data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, error, isLogin };
}
