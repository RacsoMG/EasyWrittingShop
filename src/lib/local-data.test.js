import { beforeEach, describe, expect, it } from "vitest";

import { getFeaturedProjects, replaceRetiredImages } from "@/lib/local-data";

const RETIRED_URL = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80";
const REPLACEMENT_URL = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80";
const STORAGE_KEY = "easyworkshop_content";

describe("replaceRetiredImages", () => {
  it("swaps a retired image URL for its replacement", () => {
    const [project] = replaceRetiredImages([{ id: "p1", image_url: RETIRED_URL }]);

    expect(project).toEqual({ id: "p1", image_url: REPLACEMENT_URL });
  });

  it("leaves other image URLs untouched", () => {
    const projects = [{ id: "p2", image_url: "https://example.com/custom.jpg" }];

    expect(replaceRetiredImages(projects)).toEqual(projects);
  });
});

describe("getFeaturedProjects", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("gives the CBT study a working image and descriptive alt text on first visit", async () => {
    const projects = await getFeaturedProjects();
    const cbtStudy = projects.find((project) => project.title === "Clinical Psychology: CBT Outcomes Study");

    expect(cbtStudy.image_url).toBe(REPLACEMENT_URL);
    expect(cbtStudy.image_alt).toMatch(/cognitive behavioral therapy/i);
  });

  it("repairs the retired URL in previously persisted data", async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      projects: [{ id: "p1", title: "Stored", image_url: RETIRED_URL, is_active: true, is_featured: true }],
    }));

    const [stored] = await getFeaturedProjects();

    expect(stored.image_url).toBe(REPLACEMENT_URL);
  });
});
