import supabase, { supabaseUrl } from "../../services/supabase.ts";

import type { Login } from "./types/Login.ts";
import type { BaseUser, UpdateUser } from "./types/User.ts";

export async function signup({ fullName, email, password }: BaseUser) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: Login) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  avatar,
  fullName,
}: UpdateUser) {
  // 1. update password OR fullName

  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  if (!updateData) throw new Error("No data for update");

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  // 2.  Upload avatar image
  if (!avatar) return data;
  const fileName = `avatar-${data.user?.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  // 3. Update avatar in the user
  const { data: avatarUpdateData, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return avatarUpdateData;
}
