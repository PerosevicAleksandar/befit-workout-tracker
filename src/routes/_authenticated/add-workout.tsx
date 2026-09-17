import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppShell, Field, PageHeader } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/add-workout")({
  head: () => ({ meta: [
    { title: "Add Workout — BeFit" }, { name: "description", content: "Record a workout in BeFit." },
    { property: "og:title", content: "Add Workout — BeFit" }, { property: "og:description", content: "Record a workout in BeFit." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AddWorkoutPage,
});

function AddWorkoutPage() {
  return <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><PageHeader eyebrow="Training log" title="Add Workout" description="Capture the essentials from today’s session." />
    <form className="grid gap-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8" onSubmit={(event) => event.preventDefault()}>
      <Field label="Workout Type" htmlFor="workout-type" required><select id="workout-type" required defaultValue="" className="form-control"><option value="" disabled>Select workout type</option><option>Full Body</option><option>Upper Body</option><option>Lower Body</option><option>Cardio</option><option>Other</option></select></Field>
      <div className="grid gap-6 sm:grid-cols-2"><Field label="Date" htmlFor="date" required><input className="form-control" id="date" type="date" required /></Field><Field label="Duration (minutes)" htmlFor="duration" required><input className="form-control" id="duration" type="number" min="1" placeholder="45" required /></Field></div>
      <Field label="Comment" htmlFor="comment"><textarea className="form-control min-h-32 resize-y" id="comment" placeholder="How did the workout feel?" /></Field>
      <Button type="submit" size="lg" className="mt-1 w-full sm:w-fit"><Save /> Save Workout</Button>
    </form>
  </div></AppShell>;
}
