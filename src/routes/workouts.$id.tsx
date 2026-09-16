import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3, Dumbbell, MessageSquareText, Trash2 } from "lucide-react";
import { AppShell } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { formatWorkoutDate, workouts } from "@/data/workouts";

export const Route = createFileRoute("/workouts/$id")({
  head: () => ({ meta: [
    { title: "Workout Details — BeFit" }, { name: "description", content: "Review the details of your BeFit workout." },
    { property: "og:title", content: "Workout Details — BeFit" }, { property: "og:description", content: "Review the details of your BeFit workout." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: WorkoutDetailsPage,
});

function WorkoutDetailsPage() {
  const { id } = Route.useParams();
  const workout = workouts.find((item) => item.id === id) ?? workouts[0];
  return <AppShell><div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8"><Link to="/workouts" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Back to My Workouts</Link>
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><div className="border-b border-border bg-sport p-6 text-sport-foreground sm:p-8"><p className="mb-2 text-xs font-bold uppercase text-sport-muted">Workout details</p><h1 className="font-display text-3xl font-extrabold tracking-normal">{workout.type}</h1></div>
      <dl className="grid gap-px bg-border sm:grid-cols-2"><Detail icon={Dumbbell} label="Workout Type" value={workout.type} /><Detail icon={CalendarDays} label="Date" value={formatWorkoutDate(workout.date)} /><Detail icon={Clock3} label="Duration" value={`${workout.duration} minutes`} /><Detail icon={MessageSquareText} label="Comment" value={workout.comment || "No comment added."} /></dl>
      <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:justify-between sm:p-8"><Button variant="outline" asChild><Link to="/workouts"><ArrowLeft /> Back to My Workouts</Link></Button><Button variant="destructive"><Trash2 /> Delete Workout</Button></div>
    </div>
  </div></AppShell>;
}

function Detail({ icon: Icon, label, value }: { icon: typeof Dumbbell; label: string; value: string }) { return <div className="bg-card p-5 sm:p-6"><div className="mb-3 flex items-center gap-2 text-primary"><Icon className="size-4" /><dt className="text-xs font-bold uppercase">{label}</dt></div><dd className="font-semibold leading-6">{value}</dd></div>; }
