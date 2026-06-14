import { afterEach, describe, expect, it, vi } from "vitest";

import { detectWebGLSupport, isLowPowerDevice } from "@/hooks/use-can-render-3d";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("detectWebGLSupport", () => {
  it("returns true when a webgl context is available", () => {
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: (type) => (type === "webgl" ? {} : null),
    });

    expect(detectWebGLSupport()).toBe(true);
  });

  it("falls back to experimental-webgl", () => {
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: (type) => (type === "experimental-webgl" ? {} : null),
    });

    expect(detectWebGLSupport()).toBe(true);
  });

  it("returns false when no context can be created", () => {
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: () => null,
    });

    expect(detectWebGLSupport()).toBe(false);
  });

  it("returns false when getContext throws", () => {
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: () => {
        throw new Error("blocked");
      },
    });

    expect(detectWebGLSupport()).toBe(false);
  });
});

describe("isLowPowerDevice", () => {
  function stubEnvironment({ cores, coarsePointer }) {
    vi.stubGlobal("navigator", { hardwareConcurrency: cores });
    vi.stubGlobal("window", {
      matchMedia: (query) => ({
        matches: query.includes("coarse") ? coarsePointer : false,
      }),
    });
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is true for few cores AND a coarse pointer (mobile)", () => {
    stubEnvironment({ cores: 4, coarsePointer: true });
    expect(isLowPowerDevice()).toBe(true);
  });

  it("is false for a powerful desktop with a fine pointer", () => {
    stubEnvironment({ cores: 16, coarsePointer: false });
    expect(isLowPowerDevice()).toBe(false);
  });

  it("is false when only one condition holds (few cores, fine pointer)", () => {
    stubEnvironment({ cores: 2, coarsePointer: false });
    expect(isLowPowerDevice()).toBe(false);
  });

  it("is false for many cores even with a coarse pointer (tablet/touch laptop)", () => {
    stubEnvironment({ cores: 12, coarsePointer: true });
    expect(isLowPowerDevice()).toBe(false);
  });
});
