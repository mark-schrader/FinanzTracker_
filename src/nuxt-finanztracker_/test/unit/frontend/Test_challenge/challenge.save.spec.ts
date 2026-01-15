import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

describe("Spar-Challenge SaveChallenges ohne Auswahl", () => {
  it("verhindert Speichern ohne Auswahl", async () => {
    fetchMock.mockResolvedValueOnce([]);

    global.alert = vi.fn(); // 👈 DAS IST DER FIX

    const wrapper = mount(SparChallenge);

    await wrapper.vm.saveChallenge();

    expect(global.alert).toHaveBeenCalled();
  });
});
