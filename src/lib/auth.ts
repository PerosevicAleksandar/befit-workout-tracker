import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Makes sure the signed-in user has a matching row in `profiles`.
 * Runs after sign-up (when a session exists straight away) and after sign-in,
 * so accounts created before email confirmation still get their profile.
 */
export async function ensureProfile(user: User) {
  const username =
    (user.user_metadata?.["username"] as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "Athlete";

  const { data } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (data) return;

  await supabase.from("profiles").insert({ id: user.id, username });
}

export function authErrorMessage(error: { message?: string } | null, fallback: string) {
  if (!error?.message) return fallback;
  return error.message;
}
