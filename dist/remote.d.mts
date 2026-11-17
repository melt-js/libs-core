export type HelLibRecord = Record<string, unknown>
export { loadCdnResources } from './cdn.mjs'
export const HEL_BASES: Readonly<{ unpkg: string }>

export type HelLoadSpec<T extends object = HelLibRecord> = {
  name: string
  /** Explicit entry: metadata URL or development server HTML entry. */
  host: string
  platform?: string
  appGroupName?: string
  requiredExports?: string[]
  custom?: Record<string, unknown>
  __type?: T
}

export type HelAddressOptions = {
  /** Defaults to unpkg. Package names/scopes are preserved; github derives owner from @scope. */
  type?: 'custom' | 'unpkg' | 'github'
  /** Required for custom and unscoped github refs. Custom paths preserve the package's actual scope. */
  base?: string
}

export type HelDep = string | HelLoadSpec
export type HelLoadingType = 'blocks' | 'dots'
export type HelLoadingOptions = {
  /** Animation preset. Defaults to `dots` (three bouncing dots); `blocks` keeps the four morphing squares. */
  type?: HelLoadingType
  text?: string
  background?: string
  color?: string
}
/** Full-screen startup overlay. No-op outside the browser; cleanup is idempotent. */
export const HEL_LOADING_TYPES: readonly HelLoadingType[]
export function showHelLoading(options?: boolean | HelLoadingOptions): () => void
export type HelPreloadOptions = HelAddressOptions & {
  deps: readonly HelDep[]
  /** Disabled by default. true or an options object enables the startup overlay. */
  loading?: boolean | HelLoadingOptions
  /** Dynamically import/mount the app after preload, before dismissing loading. */
  loadApp?: () => unknown | Promise<unknown>
}
export type HelLoadPhase = 'config' | 'meta' | 'assets' | 'ready' | 'exports'

export class HelLoadError extends Error {
  readonly moduleName: string
  readonly host: string
  readonly phase: HelLoadPhase
  readonly missingExports: string[]
  readonly cause: unknown
  constructor(options: {
    moduleName: string
    host: string
    phase: HelLoadPhase
    message: string
    missingExports?: string[]
    cause?: unknown
  })
}

export function isHelMetaHost(host: string): boolean
export function resolveHelDep(dep: HelDep, options?: HelAddressOptions): HelLoadSpec
/** Stable libs-* -> comps-* -> other ordering; validates conflicting identities. */
export function resolveHelDeps(options: HelPreloadOptions): HelLoadSpec[]
export function assertHelExports<T extends object>(
  moduleName: string, host: string, lib: T | null | undefined, requiredExports?: readonly string[],
): asserts lib is T

export interface HelLoader {
  /** On-demand load. Shares requests and the serial queue with preload. */
  loadHelLib<T extends object = HelLibRecord>(dep: string | HelLoadSpec<T>, options?: HelAddressOptions): Promise<T>
  /** Explicit caller order, retained for callers with a dependency chain. */
  loadHelLibsSerial(specs: readonly HelLoadSpec[]): Promise<HelLibRecord[]>
  /** Resolves after all batches and optional loadApp. Always cleans up startup loading. */
  preloadHelLibs(options: HelPreloadOptions): Promise<Record<string, HelLibRecord>>
}

export type HelFetchLib = (name: string, options: {
  platform?: string
  hook: { onFetchMetaSuccess: (meta: unknown) => void }
  custom: Record<string, unknown>
}) => Promise<HelLibRecord>

/** Use one instance per runtime; separate instances have independent queues/caches. */
export function createHelLoader(fetchLib?: HelFetchLib): HelLoader
export const loadHelLib: HelLoader['loadHelLib']
export const loadHelLibsSerial: HelLoader['loadHelLibsSerial']
export const preloadHelLibs: HelLoader['preloadHelLibs']

/** Use dep for protocol-based loading, or loader for host-specific runtime setup. */
export type HelComponentOptions = HelAddressOptions & {
  exportName: string
  onError?: (error: unknown) => void
} & ({ dep: HelDep; loader?: never } | { loader: () => Promise<object>; dep?: never })
export type HelComponentState = {
  status: 'loading' | 'ready' | 'error'
  component: object | null
  error: unknown
}
export function loadHelComponent<T extends object = object>(options: HelComponentOptions): Promise<T>
export function createHelComponentResource(options: HelComponentOptions, onChange?: (state: HelComponentState) => void): {
  getState(): HelComponentState
  load(): Promise<void>
  retry(): Promise<void>
  fail(error: unknown): void
  dispose(): void
}

export function resolveHelHost(options: {
  packageName: string
  target: 'unpkg' | 'github' | 'sftp'
  version?: string
  baseUrl?: string
  projectName?: string
}): string
