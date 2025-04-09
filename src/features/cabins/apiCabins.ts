import supabase, { supabaseUrl } from "../../services/supabase.ts";
import type { Cabin, NewCabin } from "./types/Cabin.ts";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin: NewCabin, id?: number) {
  // https://dhwwdjeezvasandmimpm.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image.toString().startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single<Cabin>();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  if (hasImagePath) return data;

  const { error: storage_error } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storage_error) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storage_error);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
