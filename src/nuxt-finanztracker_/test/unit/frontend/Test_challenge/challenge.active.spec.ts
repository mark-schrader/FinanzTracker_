import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

describe("Spar-Challenge Aktive Challenges als Computed", () => {
  it("filtert aktive Challenges korrekt", async () => {
    fetchMock.mockResolvedValueOnce([{ id: 1, saved: 50, target: 100 }]);

    const wrapper = mount(SparChallenge);

    await wrapper.vm.$nextTick();
    await Promise.resolve(); //Warte auf fetch Mock
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.activeChallenges.length).toBe(1);
    expect(wrapper.vm.completedChallenges).toBe(0);
  });
});
