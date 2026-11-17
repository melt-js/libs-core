export type FullscreenTarget = string | Element | null | (() => Element | null)
export function createDemoFullscreen(options?: { target?: FullscreenTarget; onChange?: (active: boolean) => void }): {
  readonly active: boolean
  enter(trigger?: HTMLElement): void
  exit(): void
  toggle(trigger?: HTMLElement): void
  dispose(): void
}
