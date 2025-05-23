import supabase from "../../services/supabase.ts";
import type { Settings, UpdateSettings } from "./types/Settings.ts";

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single<Settings>()!;

  if (error || !data) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: UpdateSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single<Settings>();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
