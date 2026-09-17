import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Dumbbell, Plus, Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { formatWorkoutDate, workouts } from "@/data/workouts";

export const Route = createFileRoute("/workouts")({
  head: () => ({ meta: [
    { title: "My Workouts — BeFit" }, { name: "description", content: "Review your recent BeFit workout history." },
    { property: "og:title", content: "My Workouts — BeFit" }, { property: "og:description", content: "Review your recent BeFit workout history." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: WorkoutsPage,
});

function WorkoutsPage() {
  return <AppShell><div className="mx-auto max-w-6xl px-5 py-10 sm:py-14 lg:px-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><PageHeader eyebrow="Training log" title="My Workouts" description="Your recent sessions, newest first." /><Button asChild className="mb-8 w-full sm:w-auto"><Link to="/add-workout"><Plus /> Add Workout</Link></Button></div>
    {workouts.length ? <><WorkoutTable /><WorkoutCards /></> : <EmptyState />}
  </div></AppShell>;
}

function WorkoutTable() {
  return <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-sm md:block"><table className="w-full text-left"><thead className="bg-muted text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-4 font-bold">Workout</th><th className="px-5 py-4 font-bold">Date</th><th className="px-5 py-4 font-bold">Duration</th><th className="px-5 py-4 text-right font-bold">Delete</th></tr></thead><tbody className="divide-y divide-border">{workouts.map((workout) => <tr key={workout.id} className="transition-colors hover:bg-muted/60"><td className="px-5 py-4"><Link to="/workouts/$id" params={{ id: workout.id }} className="inline-flex items-center gap-2 font-bold text-primary hover:underline">{workout.type}<ArrowRight className="size-4" /></Link></td><td className="px-5 py-4 text-sm text-muted-foreground">{formatWorkoutDate(workout.date)}</td><td className="px-5 py-4 text-sm font-semibold">{workout.duration} min</td><td className="px-5 py-4 text-right"><Button variant="ghost" size="icon" aria-label={`Delete ${workout.type}`} title="Delete workout"><Trash2 /></Button></td></tr>)}</tbody></table></div>;
}

function WorkoutCards() {
  return <div className="grid gap-3 md:hidden">{workouts.map((workout) => <article key={workout.id} className="rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/40"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><div className="min-w-0"><Link to="/workouts/$id" params={{ id: workout.id }} className="inline-flex max-w-full items-center gap-1.5 font-bold text-primary hover:underline"><span className="truncate">{workout.type}</span><ArrowRight className="size-4 shrink-0" /></Link><p className="mt-1 truncate text-sm text-muted-foreground">{formatWorkoutDate(workout.date)}</p><p className="mt-1 text-sm font-semibold">{workout.duration} min</p></div><Button variant="ghost" size="icon" className="shrink-0" aria-label={`Delete ${workout.type}`} title="Delete workout"><Trash2 /></Button></div></article>)}</div>;
}

function EmptyState() { return <div className="rounded-lg border border-dashed border-border py-16 text-center"><div className="mx-auto grid size-12 place-items-center rounded-md bg-accent text-primary"><Dumbbell /></div><h2 className="mt-5 font-display text-xl font-extrabold">No workouts yet. Go to the gym! 💪</h2><p className="mt-2 text-muted-foreground">Your workout history is waiting for you.</p><Button asChild className="mt-6"><Link to="/add-workout"><Plus /> Add Workout</Link></Button></div>; }
