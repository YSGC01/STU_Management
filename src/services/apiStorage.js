import { supabase } from "@/utils/supabase";

export async function uploadAvatar(avatarFile, newAvatarFileName) {
  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(newAvatarFileName, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading avatar:", error.message);
    return null;
  }
}
