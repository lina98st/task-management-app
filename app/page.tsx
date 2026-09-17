import Link from "next/link";
import { ChartNoAxesCombined, CircleCheckBig, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

const features = [
  {
    title: "Secure access",
    description: "Protected accounts and private user specific task data.",
    icon: ShieldCheck,
  },
  {
    title: "Simple task management",
    description: "Create, update, organize and complete your daily tasks.",
    icon: CircleCheckBig,
  },
  {
    title: "Clear overview",
    description: "Track open and completed work from one dashboard.",
    icon: ChartNoAxesCombined,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-white">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo />

          <nav aria-label="Main navigation" className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:bg-[var(--bg-card)]"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28 lg:py-36">
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Keep your work organized
          <span className="mt-2 block text-[var(--accent-light)]">
            without unnecessary complexity
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-muted)] sm:text-lg">
          One focused place to create, organize and complete your daily tasks.
        </p>

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Create account
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)]"
          >
            Sign in
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="border-y border-[var(--border)] bg-[var(--bg-surface)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <h2
              id="features-heading"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Everything you need to stay focused
            </h2>

            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] sm:text-base">
              A simple workflow for planning tasks and tracking progress.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--accent-light)]">
                    <Icon aria-hidden="true" size={22} strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Dashboard preview
              </p>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Your work at a glance
              </p>
            </div>

            <span className="rounded-full bg-[var(--bg-surface)] px-3 py-1 text-xs font-medium text-white">
              Preview
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <p className="text-sm font-medium text-white">Total tasks</p>
              <p className="mt-4 text-3xl font-semibold text-white">12</p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <p className="text-sm font-medium text-white">Open</p>
              <p className="mt-4 text-3xl font-semibold text-[var(--accent-light)]">
                7
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <p className="text-sm font-medium text-white">Done</p>
              <p className="mt-4 text-3xl font-semibold text-[var(--success)]">
                5
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Task Management App</p>
          <p>Created by Alina Schmidt</p>
        </div>
      </footer>
    </main>
  );
}
