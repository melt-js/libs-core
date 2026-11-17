export function createSplitPaneController(options: {
  root: HTMLElement
  onChange?: (state: { width: number; min: number; max: number }) => void
  initialWidth?: number; minPanel?: number; maxPanel?: number; minPreview?: number
}): {
  start(event: PointerEvent, target?: HTMLElement): void; move(event: PointerEvent): void; stop(event?: PointerEvent): void
  reset(): void; key(event: KeyboardEvent): void; dispose(): void
}
