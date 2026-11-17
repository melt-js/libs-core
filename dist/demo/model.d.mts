export interface ModelBinding { prop: string; event: string; getValue?: ((...args: unknown[]) => unknown) | null }
export function defaultModelEvent(prop: string): string
export function normalizeModel(input: unknown): ModelBinding | null
export function normalizeModels(models: unknown): ModelBinding[]
export function schemaModels(schema?: unknown[]): ModelBinding[]
export function componentOptions(component: unknown): unknown
export function componentPropNames(component: unknown): string[]
export function componentEmitNames(component: unknown): string[]
export function componentModels(component: unknown, options?: { isVue2?: boolean }): ModelBinding[]
export function fallbackModels(schema?: unknown[], options?: { isVue2?: boolean }): ModelBinding[]
export function resolveModels(options?: { component?: unknown; schema?: unknown[]; models?: unknown; isVue2?: boolean }): ModelBinding[]
export function isSameValue(a: unknown, b: unknown): boolean
