import type { Profile } from "./types";

const BASE = import.meta.env.VITE_API_URL ?? "";

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${BASE}/api/profile`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
