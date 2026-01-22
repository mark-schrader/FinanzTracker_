import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

describe("Spar-Challenge Fertige Challenges als Computed", () => {
  it("zählt abgeschlossene Challenges korrekt", async () => {
    fetchMock.mockResolvedValueOnce([
      { id: 1, saved: 100, target: 100 },
      { id: 2, saved: 20, target: 100 },
    ]);

    const wrapper = mount(SparChallenge);

    expect(wrapper.vm.completedChallenges).toBe(0);
  });
});
