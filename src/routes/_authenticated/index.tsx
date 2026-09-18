import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Dumbbell, Plus, Timer } from "lucide-react";
import { AppShell } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/")({
  loader: async ({ context }) => {
    const user = (context as { user?: { id: string; email?: string } }).user;
    if (!user) return { username: "Athlete" };
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();
    return { username: data?.username ?? user.email?.split("@")[0] ?? "Athlete" };
  },
  head: () => ({ meta: [
    { title: "Home — BeFit Workout Tracker" },
    { name: "description", content: "Stay consistent and keep track of every workout with BeFit." },
    { property: "og:title", content: "Home — BeFit Workout Tracker" },
    { property: "og:description", content: "Stay consistent and keep track of every workout with BeFit." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function HomePage() {
  const { username } = Route.useLoaderData();
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14 lg:px-8">
        <section className="relative overflow-hidden rounded-lg bg-sport px-6 py-10 text-sport-foreground sm:px-10 sm:py-14">
          <div className="absolute right-0 top-0 hidden h-full w-2/5 items-center justify-center opacity-10 md:flex"><Dumbbell className="size-64" strokeWidth={1.2} /></div>
          <div className="relative max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-sport-muted"><span className="h-px w-8 bg-primary" />Today’s training</p>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">Welcome back, Alex <span aria-hidden>👋</span></h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-sport-muted sm:text-lg">Consistency beats intensity. Keep showing up, log the work, and let every session build on the last.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><Link to="/add-workout"><Plus /> Add Workout</Link></Button>
              <Button size="lg" variant="secondary" asChild><Link to="/workouts">View My Workouts <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <section className="mt-9" aria-labelledby="overview-heading">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-primary">At a glance</p><h2 id="overview-heading" className="mt-1 font-display text-2xl font-extrabold">Your progress</h2></div><p className="hidden text-sm text-muted-foreground sm:block">Keep the streak alive.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"><div className="mb-8 grid size-10 place-items-center rounded-md bg-accent text-primary"><Dumbbell className="size-5" /></div><p className="text-sm font-semibold text-muted-foreground">Total Workouts</p><p className="mt-1 font-display text-4xl font-extrabold">8</p></article>
            <article className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"><div className="mb-8 grid size-10 place-items-center rounded-md bg-accent text-primary"><CalendarDays className="size-5" /></div><p className="text-sm font-semibold text-muted-foreground">Last Workout</p><p className="mt-1 font-display text-2xl font-extrabold">Full Body</p><p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><Timer className="size-4" />55 minutes</p></article>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
