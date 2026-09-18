import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { AuthShell, Field } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage, ensureProfile } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [
    { title: "Create Account — BeFit" }, { name: "description", content: "Create your BeFit workout tracking account." },
    { property: "og:title", content: "Create Account — BeFit" }, { property: "og:description", content: "Create your BeFit workout tracking account." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don’t match. Please re-enter them.");
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username.trim() },
        emailRedirectTo: window.location.origin,
      },
    });

    if (signUpError) {
      setError(authErrorMessage(signUpError, "We couldn’t create your account. Please try again."));
      setLoading(false);
      return;
    }

    // When email confirmation is off, a session exists right away — create the profile now.
    if (data.session && data.user) {
      await ensureProfile(data.user);
      await supabase.auth.signOut();
    }

    navigate({ to: "/login", search: { registered: true }, replace: true });
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Start building a training record you can be proud of."
      footer={<>Already have an account? <Link to="/login" search={{}} className="font-bold text-primary hover:underline">Log In</Link></>}
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}
        <Field label="Username" htmlFor="username" required>
          <input className="form-control" id="username" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <input className="form-control" id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Password" htmlFor="password" required>
            <input className="form-control" id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </Field>
          <Field label="Confirm Password" htmlFor="confirm-password" required>
            <input className="form-control" id="confirm-password" type="password" placeholder="Repeat password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
          </Field>
        </div>
        <Button size="lg" className="mt-2 w-full" type="submit" disabled={loading}>
          <UserPlus /> {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </AuthShell>
  );
}
