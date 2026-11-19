import { useEffect, useState } from "react";
import { fetchProfile } from "./api";
import type { Profile } from "./types";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
      {children}
    </span>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    fetchProfile().then(setProfile).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (error) return <p className="p-8 text-red-600">Could not load profile: {error}</p>;
  if (!profile) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-sm">
          <span className="font-semibold">{profile.name}</span>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="rounded border border-slate-300 px-2 py-1 dark:border-slate-700"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-4xl font-bold sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-xl text-indigo-600 dark:text-indigo-400">{profile.title}</p>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{profile.tagline}</p>
          <p className="mt-1 text-sm text-slate-500">{profile.location}</p>
        </div>

        <Section id="about" title="About">
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{profile.bio}</p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="space-y-4">
            {profile.skills.map((g) => (
              <div key={g.category}>
                <h3 className="mb-2 font-semibold">{g.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-6">
            {profile.experience.map((e) => (
              <div key={e.company + e.period}>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="font-semibold">{e.role} · {e.company}</h3>
                  <span className="text-sm text-slate-500">{e.period}</span>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
                  {e.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.projects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-slate-200 p-4 transition hover:shadow-md dark:border-slate-800"
              >
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <ul className="space-y-1">
            <li><a className="text-indigo-600 hover:underline dark:text-indigo-400" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
            <li><a className="text-indigo-600 hover:underline dark:text-indigo-400" href={profile.contact.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="text-indigo-600 hover:underline dark:text-indigo-400" href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </Section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} {profile.name}</footer>
    </div>
  );
}
