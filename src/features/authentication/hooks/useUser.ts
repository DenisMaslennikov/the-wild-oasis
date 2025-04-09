import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "@supabase/supabase-js";
import { getCurrentUser } from "../apiAuth.ts";

export default function useUser() {
  const { isLoading, data: user } = useQuery<AuthUser | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
