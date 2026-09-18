import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { AuthShell, Field } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage, ensureProfile } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { registered?: boolean } => {
    const registered = search["registered"] === true || search["registered"] === "true";
    return registered ? { registered: true } : {};
  },
  head: () => ({ meta: [
    { title: "Log In — BeFit" }, { name: "description", content: "Log in to your BeFit workout tracker." },
    { property: "og:title", content: "Log In — BeFit" }, { property: "og:description", content: "Log in to your BeFit workout tracker." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LoginPage,
});

function LoginPage() {
  const { registered } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError || !data.user) {
      setError(authErrorMessage(signInError, "We couldn’t log you in. Check your email and password."));
      setLoading(false);
      return;
    }
    await ensureProfile(data.user);
    navigate({ to: "/", replace: true });
  }

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back. Your next workout starts here."
      footer={<>Don&apos;t have an account? <Link to="/register" className="font-bold text-primary hover:underline">Create Account</Link></>}
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {registered && (
          <p className="rounded-md border border-primary/40 bg-accent px-4 py-3 text-sm font-semibold text-primary">
            Account created successfully! You can now log in.
          </p>
        )}
        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}
        <Field label="Email" htmlFor="email" required>
          <input className="form-control" id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <input className="form-control" id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        </Field>
        <Button size="lg" className="mt-2 w-full" type="submit" disabled={loading}>
          <LogIn /> {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </AuthShell>
  );
}
