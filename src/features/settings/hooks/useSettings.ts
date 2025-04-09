import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../apiSettings.ts";
import { Settings } from "../types/Settings.ts";

export default function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery<Settings, Error>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
