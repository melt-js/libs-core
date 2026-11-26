/** Lazily loads pinned highlight.js CDN assets and returns escaped token markup. */
export function highlightCode(source: string): Promise<string>
/** 空闲预热：提前拉 highlight.js CDN，失败静默 */
export function preloadHighlighter(): Promise<unknown>
