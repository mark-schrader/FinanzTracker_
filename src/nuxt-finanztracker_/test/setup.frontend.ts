// test/setup.frontend.ts

import { config } from "@vue/test-utils";
import { vi, beforeAll, afterEach } from "vitest";
import { Window } from "happy-dom";

// DOM SETUP (because Vitest runs in node environment)
beforeAll(() => {
  const window = new Window();

  global.window = window as any;
  global.document = window.document as any;
  global.navigator = window.navigator as any;
});

// Reset mocks between tests
afterEach(() => {
  vi.clearAllMocks();
});

// Global Component Stubs (Nuxt / UI)
config.global.stubs = {
  InlineAlert: true,
  CurrentTime: true,
  categoryManager: true,
  bewegungstabelle: true,
  bewegungstabelle_aktion: true,
  NuxtLink: true,
  NuxtPage: true,
  ClientOnly: true,
};

// useAlert Mock
vi.stubGlobal("useAlert", () => ({
  showAlertBox: false,
  alertMessage: "",
  alertType: "",
  showAlert: vi.fn(),
}));

/*$fetch Mock (Nuxt)                                                  
export const fetchMock = vi.fn(async () => ({
  ok: true,
  json: async () => ({}),
}))*/

// $fetch Mock (Nuxt)
export const fetchMock = vi.fn();
vi.stubGlobal("$fetch", fetchMock);

// definePageMeta (Nuxt)
vi.stubGlobal("definePageMeta", () => {});

// Nuxt App Composables
vi.mock("#app", () => ({
  useFetch: vi.fn(() => ({
    data: {
      value: [
        { id: 1, name: "Lebensmittel", type: "expense" },
        { id: 2, name: "Miete", type: "expense" },
        { id: 3, name: "Gehalt", type: "income" },
      ],
    },
    pending: { value: false },
    error: { value: null },
  })),

  useAsyncData: vi.fn(() => ({
    data: { value: [] },
    pending: { value: false },
    error: { value: null },
  })),

  navigateTo: vi.fn(),
}));

// Supabase User Mock
vi.stubGlobal("useSupabaseUser", () => ({
  value: {
    id: "test-user",
    email: "test@test.de",
  },
}));
