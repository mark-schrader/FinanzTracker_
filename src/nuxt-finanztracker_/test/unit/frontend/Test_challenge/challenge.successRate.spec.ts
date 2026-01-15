import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

vi.mock("v-calendar", () => ({
  Calendar: {
    template: "<div data-test='calendar' />",
  },
}));

describe("Spar-Challenge Success Rate", () => {
  it("setzt Erfolgsrate auf 0% bei leeren Challenges", async () => {
    fetchMock.mockResolvedValueOnce([]);

    const wrapper = mount(SparChallenge);

    expect(wrapper.vm.successRate).toBe(0);
  });
});
