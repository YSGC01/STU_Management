import { supabase } from "@/utils/supabase.js";

export async function signUp(email, password, metaData = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `User-${Date.now()}`,
        avatar:
          "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
        ...metaData,
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUser(newUserMetaData = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetaData,
  });

  if (error) {
    console.error("Error updating user:", error.message);
    throw new Error(error.message);
  }

  return data;
}
