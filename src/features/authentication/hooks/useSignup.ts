import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupApi } from "../apiAuth.ts";

import type { BaseUser } from "../types/User.ts";

export default function useSignup() {
  const {
    mutate: signup,
    isPending: isSignup,
    error,
  } = useMutation<unknown, Error, BaseUser>({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Plese verufy the new account from the user's email address",
      );
    },
  });

  return { signup, isSignup, error };
}
