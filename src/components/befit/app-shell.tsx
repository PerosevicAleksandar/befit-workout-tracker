import { Link } from "@tanstack/react-router";
import { Dumbbell, Home, LogOut, Menu, Moon, Plus, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/" as const, label: "Home", icon: Home },
  { to: "/add-workout" as const, label: "Add Workout", icon: Plus },
  { to: "/workouts" as const, label: "My Workouts", icon: Dumbbell },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("befit-theme");
    const enabled = saved === "dark";
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("befit-theme", next ? "dark" : "light");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="BeFit home">
            <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Dumbbell className="size-5" /></span>
            <span className="font-display text-xl font-extrabold tracking-normal">BeFit</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
                <Icon className="size-4" />{label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button variant="ghost" asChild><Link to="/login"><LogOut /> Logout</Link></Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-6xl gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} activeOptions={{ exact: to === "/" }} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
                  <Icon className="size-4" />{label}
                </Link>
              ))}
              <div className="my-2 border-t border-border" />
              <Button variant="ghost" className="justify-start" onClick={toggleTheme}>{dark ? <Sun /> : <Moon />} {dark ? "Light Mode" : "Dark Mode"}</Button>
              <Button variant="ghost" className="justify-start" asChild><Link to="/login" onClick={() => setMenuOpen(false)}><LogOut /> Logout</Link></Button>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p>
      <h1 className="font-display text-3xl font-extrabold tracking-normal sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
    </div>
  );
}

export function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: ReactNode }) {
  return <div className="grid gap-2"><label htmlFor={htmlFor} className="text-sm font-semibold">{label}{required && <span className="text-primary"> *</span>}</label>{children}</div>;
}

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[0.85fr_1.15fr]">
      <section className="relative hidden overflow-hidden bg-sport p-12 text-sport-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-extrabold"><span className="grid size-9 place-items-center rounded-md bg-sport-foreground/15"><Dumbbell /></span>BeFit</Link>
        <div className="relative z-10 max-w-md"><p className="mb-4 text-sm font-bold uppercase text-sport-muted">Build your rhythm</p><h2 className="font-display text-5xl font-extrabold leading-tight tracking-normal">Every workout moves you forward.</h2><p className="mt-5 text-lg text-sport-muted">Track the work. Notice the progress. Keep showing up.</p></div>
        <p className="text-sm text-sport-muted">Simple training. Real momentum.</p>
      </section>
      <section className="flex items-center justify-center bg-background px-5 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 flex items-center gap-2 font-display text-xl font-extrabold lg:hidden"><span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><Dumbbell /></span>BeFit</Link>
          <p className="mb-2 text-xs font-bold uppercase text-primary">Welcome to BeFit</p>
          <h1 className="font-display text-3xl font-extrabold tracking-normal">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-7 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </section>
    </main>
  );
}
