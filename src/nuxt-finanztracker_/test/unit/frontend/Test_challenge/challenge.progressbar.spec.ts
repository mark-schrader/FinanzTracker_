import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

describe("Spar-Challenge Progress Bar Berechnung", () => {
  it("berechnet challengeProgress korrekt", async () => {
    fetchMock.mockResolvedValueOnce([]);

    const wrapper = mount(SparChallenge);

    expect(wrapper.vm.challengeProgress({ saved: 50, target: 100 })).toBe(50);
    expect(wrapper.vm.challengeProgress({ saved: 0, target: 0 })).toBe(0);
  });
});
