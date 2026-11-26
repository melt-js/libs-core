/** 空闲预热：首屏后延后执行，requestIdleCallback 不可用时退化为 setTimeout */
export function whenIdle(fn: () => void, timeout?: number): void
