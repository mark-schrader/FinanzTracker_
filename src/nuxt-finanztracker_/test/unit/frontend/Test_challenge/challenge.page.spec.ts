import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchMock } from "../../../setup.frontend";
import SparChallenge from "../../../../pages/challenge.vue";

describe("Spar-Challenge Page Mounting", () => {
  it("mountet die Challenge Seite ohn Fehlern", async () => {
    fetchMock.mockResolvedValueOnce([]); // onMounted
    const wrapper = mount(SparChallenge);
    expect(wrapper.exists()).toBe(true);
  });
});
