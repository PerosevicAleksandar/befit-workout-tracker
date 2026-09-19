import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppShell, Field, PageHeader } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { createWorkout } from "@/data/workouts";

export const Route = createFileRoute("/_authenticated/add-workout")({
  head: () => ({ meta: [
    { title: "Add Workout — BeFit" }, { name: "description", content: "Record a workout in BeFit." },
    { property: "og:title", content: "Add Workout — BeFit" }, { property: "og:description", content: "Record a workout in BeFit." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AddWorkoutPage,
});

function AddWorkoutPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    const minutes = Number(duration);
    if (!Number.isFinite(minutes) || minutes < 1) {
      setError("Please enter a duration of at least 1 minute.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createWorkout({ type, date, duration: Math.round(minutes), comment });
      await navigate({ to: "/workouts" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the workout. Please try again.");
      setSaving(false);
    }
  };

  return <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><PageHeader eyebrow="Training log" title="Add Workout" description="Capture the essentials from today’s session." />
    <form className="grid gap-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8" onSubmit={handleSubmit}>
      <Field label="Workout Type" htmlFor="workout-type" required><select id="workout-type" required value={type} onChange={(event) => setType(event.target.value)} className="form-control"><option value="" disabled>Select workout type</option><option>Full Body</option><option>Upper Body</option><option>Lower Body</option><option>Cardio</option><option>Other</option></select></Field>
      <div className="grid gap-6 sm:grid-cols-2"><Field label="Date" htmlFor="date" required><input className="form-control" id="date" type="date" required value={date} onChange={(event) => setDate(event.target.value)} /></Field><Field label="Duration (minutes)" htmlFor="duration" required><input className="form-control" id="duration" type="number" min="1" placeholder="45" required value={duration} onChange={(event) => setDuration(event.target.value)} /></Field></div>
      <Field label="Comment" htmlFor="comment"><textarea className="form-control min-h-32 resize-y" id="comment" placeholder="How did the workout feel?" value={comment} onChange={(event) => setComment(event.target.value)} /></Field>
      {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">{error}</p> : null}
      <Button type="submit" size="lg" disabled={saving} className="mt-1 w-full sm:w-fit"><Save /> {saving ? "Saving workout..." : "Save Workout"}</Button>
    </form>
  </div></AppShell>;
}
