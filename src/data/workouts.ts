import { supabase } from "@/integrations/supabase/client";

export type Workout = {
  id: string;
  type: string;
  date: string;
  duration: number;
  comment: string | null;
};

export function formatWorkoutDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const { data, error } = await supabase
    .from("workouts")
    .select("id, type, date, duration, comment")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchWorkout(id: string): Promise<Workout | null> {
  const { data, error } = await supabase
    .from("workouts")
    .select("id, type, date, duration, comment")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function createWorkout(input: {
  type: string;
  date: string;
  duration: number;
  comment: string;
}) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("You need to be logged in to save a workout.");

  const { error } = await supabase.from("workouts").insert({
    user_id: userData.user.id,
    type: input.type,
    date: input.date,
    duration: input.duration,
    comment: input.comment.trim() ? input.comment.trim() : null,
  });
  if (error) throw error;
}

export async function deleteWorkout(id: string) {
  const { error } = await supabase.from("workouts").delete().eq("id", id);
  if (error) throw error;
}
