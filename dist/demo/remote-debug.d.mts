import type { HelLoadSpec } from '../remote.mjs'

export function setupDemoRemoteDebug(options: {
  deps: HelLoadSpec[]
  window?: Window
}): {
  deps: HelLoadSpec[]
  renderError(root: HTMLElement | null, error: unknown): void
}
