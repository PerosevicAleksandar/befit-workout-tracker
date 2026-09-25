import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { HomeSkeleton, WorkoutDetailsSkeleton, WorkoutsSkeleton } from "@/components/befit/skeletons";

function AuthPending() {
  const pathname = useLocation({ select: (l) => l.pathname });
  if (pathname.startsWith("/workouts/")) return <WorkoutDetailsSkeleton />;
  if (pathname.startsWith("/workouts")) return <WorkoutsSkeleton />;
  if (pathname === "/") return <HomeSkeleton />;
  return <div className="min-h-screen bg-background" />;
}

export const Route = createFileRoute("/_authenticated")({
  // Session lives in browser storage, so this subtree is checked client-side only.
  ssr: false,
  pendingMs: 0,
  pendingComponent: AuthPending,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login", search: {} });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
