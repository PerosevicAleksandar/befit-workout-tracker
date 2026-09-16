import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { AuthShell, Field } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register")({ head: () => ({ meta: [
  { title: "Create Account — BeFit" }, { name: "description", content: "Create your BeFit workout tracking account." },
  { property: "og:title", content: "Create Account — BeFit" }, { property: "og:description", content: "Create your BeFit workout tracking account." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: RegisterPage });

function RegisterPage() { return <AuthShell title="Create account" subtitle="Start building a training record you can be proud of." footer={<>Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Log In</Link></>}><form className="grid gap-5" onSubmit={(event) => event.preventDefault()}><Field label="Username" htmlFor="username" required><input className="form-control" id="username" placeholder="Alex" required /></Field><Field label="Email" htmlFor="email" required><input className="form-control" id="email" type="email" placeholder="alex@example.com" required /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Password" htmlFor="password" required><input className="form-control" id="password" type="password" placeholder="Password" required /></Field><Field label="Confirm Password" htmlFor="confirm-password" required><input className="form-control" id="confirm-password" type="password" placeholder="Repeat password" required /></Field></div><Button size="lg" className="mt-2 w-full"><UserPlus /> Create Account</Button></form></AuthShell>; }
