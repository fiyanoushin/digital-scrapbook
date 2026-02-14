import { supabase } from "./supabaseClient";

/* Sign in */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data.user;
}

/* Sign out */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

/* Get current user */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/* Listen to auth state */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}
