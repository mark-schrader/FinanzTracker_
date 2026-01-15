import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";
import exp from "constants";

describe("Spar-Challenge Button zum Challenge Modal Öffnen", () => {
  it("öffnet Challenge-Modal beim Klick", async () => {
    fetchMock.mockResolvedValueOnce([]);

    const wrapper = mount(SparChallenge);

    const button = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Neue Challenges"));

    expect(button).toBeDefined();
    await button!.trigger("click");
    expect(wrapper.vm.showChallengeModal).toBe(true);
  });
});
