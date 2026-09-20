import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3, Dumbbell, MessageSquareText, Trash2 } from "lucide-react";
import { AppShell } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { deleteWorkout, fetchWorkout, formatWorkoutDate } from "@/data/workouts";

export const Route = createFileRoute("/_authenticated/workouts_/$id")({
  loader: ({ params }) => fetchWorkout(params.id),
  head: () => ({ meta: [
    { title: "Workout Details — BeFit" }, { name: "description", content: "Review the details of your BeFit workout." },
    { property: "og:title", content: "Workout Details — BeFit" }, { property: "og:description", content: "Review the details of your BeFit workout." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WorkoutDetailsPage,
  pendingComponent: () => <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><p className="text-sm font-semibold text-muted-foreground">Loading workout...</p></div></AppShell>,
  errorComponent: ({ error }) => <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><Link to="/workouts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to My Workouts</Link><div className="rounded-lg border border-dashed border-border py-16 text-center"><h1 className="font-display text-xl font-extrabold">Could not load this workout</h1><p className="mt-2 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p></div></div></AppShell>,
  notFoundComponent: () => <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><Link to="/workouts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to My Workouts</Link><div className="rounded-lg border border-dashed border-border py-16 text-center"><h1 className="font-display text-xl font-extrabold">Workout not found</h1></div></div></AppShell>,
});

function WorkoutDetailsPage() {
  const workout = Route.useLoaderData();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!workout) {
    return <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><Link to="/workouts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to My Workouts</Link><div className="rounded-lg border border-dashed border-border py-16 text-center"><h1 className="font-display text-xl font-extrabold">Workout not found</h1></div></div></AppShell>;
  }

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteWorkout(workout.id);
      await navigate({ to: "/workouts" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete the workout.");
      setDeleting(false);
    }
  };

  return <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><Link to="/workouts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to My Workouts</Link>
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><div className="border-b border-border bg-sport p-6 text-sport-foreground sm:p-8"><p className="mb-2 text-xs font-bold uppercase text-sport-muted">Workout details</p><h1 className="font-display text-3xl font-extrabold tracking-normal">{workout.type}</h1></div>
      <dl className="grid gap-px bg-border sm:grid-cols-2"><Detail icon={Dumbbell} label="Workout Type" value={workout.type} /><Detail icon={CalendarDays} label="Date" value={formatWorkoutDate(workout.date)} /><Detail icon={Clock3} label="Duration" value={`${workout.duration} minutes`} /><Detail icon={MessageSquareText} label="Comment" value={workout.comment || "No comment added."} /></dl>
      {error ? <p className="border-t border-border px-5 py-4 text-sm font-semibold text-destructive sm:px-8">{error}</p> : null}
      <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:justify-between sm:p-8"><Button variant="outline" asChild><Link to="/workouts"><ArrowLeft /> Back to My Workouts</Link></Button><Button variant="destructive" disabled={deleting} onClick={handleDelete}><Trash2 /> {deleting ? "Deleting..." : "Delete Workout"}</Button></div>
    </div>
  </div></AppShell>;
}

function Detail({ icon: Icon, label, value }: { icon: typeof Dumbbell; label: string; value: string }) { return <div className="bg-card p-5 sm:p-6"><div className="mb-3 flex items-center gap-2 text-primary"><Icon className="size-4" /><dt className="text-xs font-bold uppercase">{label}</dt></div><dd className="font-semibold leading-6">{value}</dd></div>; }
