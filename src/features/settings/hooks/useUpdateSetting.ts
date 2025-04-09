import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Settings, UpdateSettings } from "../types/Settings.ts";
import { updateSetting as updateSettingApi } from "../apiSettings.ts";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation<
    Settings,
    Error,
    UpdateSettings
  >({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateSetting, isUpdating };
}
