import { AppShell } from "@/components/befit/app-shell";

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export function HomeSkeleton() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14 lg:px-8" aria-busy="true" aria-label="Loading dashboard">
        <section className="rounded-lg bg-sport px-6 py-10 sm:px-10 sm:py-14">
          <div className="h-3 w-32 animate-pulse rounded-md bg-sport-foreground/15" />
          <div className="mt-4 h-10 w-full max-w-md animate-pulse rounded-md bg-sport-foreground/15" />
          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded-md bg-sport-foreground/10" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><div className="h-11 w-40 animate-pulse rounded-md bg-sport-foreground/15" /><div className="h-11 w-48 animate-pulse rounded-md bg-sport-foreground/10" /></div>
        </section>
        <section className="mt-9">
          <Bar className="h-3 w-20" /><Bar className="mt-2 mb-4 h-7 w-40" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <article key={i} className="rounded-lg border border-border bg-card p-6 shadow-sm"><Bar className="mb-8 size-10" /><Bar className="h-4 w-28" /><Bar className="mt-2 h-9 w-24" /></article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function WorkoutsSkeleton() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14 lg:px-8" aria-busy="true" aria-label="Loading workouts">
        <div className="mb-8"><Bar className="h-3 w-24" /><Bar className="mt-3 h-9 w-56" /><Bar className="mt-3 h-4 w-64" /></div>
        <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-sm md:block">
          <div className="h-12 bg-muted" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-6 border-t border-border px-5 py-4"><Bar className="h-4 w-40" /><Bar className="h-4 w-28" /><Bar className="h-4 w-16" /><Bar className="ml-auto size-8" /></div>
          ))}
        </div>
        <div className="grid gap-3 md:hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-start justify-between rounded-lg border border-border bg-card p-4 shadow-sm"><div className="grid gap-2"><Bar className="h-4 w-32" /><Bar className="h-3 w-24" /><Bar className="h-3 w-16" /></div><Bar className="size-8" /></div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function WorkoutDetailsSkeleton() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14 lg:px-8" aria-busy="true" aria-label="Loading workout">
        <Bar className="mb-8 h-4 w-44" />
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="bg-sport p-6 sm:p-8"><div className="h-3 w-28 animate-pulse rounded-md bg-sport-foreground/15" /><div className="mt-3 h-8 w-48 animate-pulse rounded-md bg-sport-foreground/15" /></div>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (<div key={i} className="bg-card p-5 sm:p-6"><Bar className="h-3 w-24" /><Bar className="mt-3 h-5 w-36" /></div>))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
