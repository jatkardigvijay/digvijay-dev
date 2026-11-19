import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import * as api from "./api";
import type { Profile } from "./types";

const profile: Profile = {
  name: "Jane Doe",
  title: "Engineer",
  tagline: "Builds things",
  location: "Pune",
  bio: "A short bio.",
  contact: {
    email: "jane@example.com",
    github: "https://github.com/jane",
    linkedin: "https://linkedin.com/in/jane",
  },
  skills: [{ category: "Backend", items: ["Java", "Spring"] }],
  experience: [
    { company: "Acme", role: "Developer", period: "2022 - Present", highlights: ["Built X"] },
  ],
  projects: [
    { name: "Proj", description: "A project", tech: ["React"], url: "https://example.com/proj" },
  ],
};

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  );
}

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.documentElement.classList.remove("dark");
    mockMatchMedia(false);
  });

  it("shows a loading state before the profile arrives", () => {
    vi.spyOn(api, "fetchProfile").mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows an error message when loading fails", async () => {
    vi.spyOn(api, "fetchProfile").mockRejectedValue(new Error("API error 500"));

    render(<App />);

    expect(await screen.findByText(/Could not load profile: API error 500/)).toBeInTheDocument();
  });

  it("renders every profile section once loaded", async () => {
    vi.spyOn(api, "fetchProfile").mockResolvedValue(profile);

    render(<App />);

    expect(await screen.findByRole("heading", { level: 1, name: "Jane Doe" })).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("A short bio.")).toBeInTheDocument();
    expect(screen.getByText("Spring")).toBeInTheDocument();
    expect(screen.getByText("Developer · Acme")).toBeInTheDocument();
    expect(screen.getByText("Built X")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Proj" })).toBeInTheDocument();
  });

  it("links to the project and contact details", async () => {
    vi.spyOn(api, "fetchProfile").mockResolvedValue(profile);

    render(<App />);
    await screen.findByRole("heading", { level: 1 });

    expect(screen.getByRole("link", { name: /Proj/ })).toHaveAttribute("href", "https://example.com/proj");
    expect(screen.getByRole("link", { name: "jane@example.com" })).toHaveAttribute(
      "href",
      "mailto:jane@example.com",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/jane");
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/jane",
    );
  });

  it("toggles the dark class when the theme button is clicked", async () => {
    vi.spyOn(api, "fetchProfile").mockResolvedValue(profile);
    const user = userEvent.setup();

    render(<App />);
    const button = await screen.findByRole("button", { name: "Toggle theme" });

    expect(button).toHaveTextContent("Dark");
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(button);
    expect(button).toHaveTextContent("Light");
    expect(document.documentElement).toHaveClass("dark");

    await user.click(button);
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("starts in dark mode when the system prefers dark", async () => {
    mockMatchMedia(true);
    vi.spyOn(api, "fetchProfile").mockResolvedValue(profile);

    render(<App />);
    await screen.findByRole("heading", { level: 1 });

    expect(document.documentElement).toHaveClass("dark");
  });
});
