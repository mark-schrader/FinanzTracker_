import { config } from '@vue/test-utils'

config.global.stubs = {
  NuxtLink: true,
  NuxtPage: true,
  ClientOnly: true
}
