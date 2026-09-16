import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { AuthShell, Field } from "@/components/befit/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ head: () => ({ meta: [
  { title: "Log In — BeFit" }, { name: "description", content: "Log in to your BeFit workout tracker." },
  { property: "og:title", content: "Log In — BeFit" }, { property: "og:description", content: "Log in to your BeFit workout tracker." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: LoginPage });

function LoginPage() { return <AuthShell title="Log in" subtitle="Welcome back. Your next workout starts here." footer={<>Don&apos;t have an account? <Link to="/register" className="font-bold text-primary hover:underline">Create Account</Link></>}><form className="grid gap-5" onSubmit={(event) => event.preventDefault()}><Field label="Email" htmlFor="email" required><input className="form-control" id="email" type="email" placeholder="alex@example.com" required /></Field><Field label="Password" htmlFor="password" required><input className="form-control" id="password" type="password" placeholder="Enter your password" required /></Field><Button size="lg" className="mt-2 w-full"><LogIn /> Log In</Button></form></AuthShell>; }
