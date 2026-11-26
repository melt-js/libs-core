export function encodeCode(code: string): string
export function decodeCode(base64: string): string
export function readCodeParam(search?: string): string
export function buildShareUrl(code: string, base?: string, example?: string): string
export function draftKey(name?: string): string
export function readDraft(name?: string): string
export function saveDraft(name: string | undefined, code: string): void
export function clearDraft(name?: string): void
export function pickInitialCode(options?: { name?: string; fallback?: string; search?: string }): string
/** 读分享链接里的示例名；没有返回空串 */
export function readExampleParam(search?: string): string
/** ?playground=1 且（没有 example 或对得上当前示例）时返回 true */
export function shouldAutoOpen(name?: string, search?: string): boolean
/** 清掉「分享代码已消费」标记（宿主显式复位时用） */
export function resetSharedConsumed(): void

/** 主题偏好：?theme=dark 覆盖一切，其次 localStorage，默认 light */
export function readTheme(): 'light' | 'dark'
export function saveTheme(theme: 'light' | 'dark'): void
/** monaco 的主题名直接对应 vs / vs-dark */
export function monacoThemeOf(theme: 'light' | 'dark'): 'vs' | 'vs-dark'
