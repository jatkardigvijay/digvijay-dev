import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProfile } from "./api";

describe("fetchProfile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests /api/profile and returns the parsed JSON", async () => {
    const data = { name: "Jane" };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => data });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchProfile()).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith("/api/profile");
  });

  it("throws with the status code when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    await expect(fetchProfile()).rejects.toThrow("API error 500");
  });

  it("propagates network failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(fetchProfile()).rejects.toThrow("offline");
  });
});
