export interface DemoTabsScrollState {
  overflowing: boolean
  canScrollLeft: boolean
  canScrollRight: boolean
}
export function createDemoTabsController(options: {
  root: HTMLElement
  viewport: HTMLElement
  list: HTMLElement
  onChange?: (state: DemoTabsScrollState) => void
}): {
  refresh(revealActive?: boolean): void
  scroll(direction: -1 | 1): void
  dispose(): void
}
