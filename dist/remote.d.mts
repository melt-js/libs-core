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
export type HelCompsAutoInstall = boolean | readonly string[]
export type HelAutoInstallOptions = {
  /**
   * comps 包在入口留了 install 钩子（install(Vue) / install()）时自动触发。
   * false（默认）不注册；true 注册所有 comps-*；数组只注册列出的包（全名或短名）。
   */
  needCompsAutoInstall?: HelCompsAutoInstall
  /** 传给 install 的 Vue 运行时；不传则以无参方式调用 install。 */
  vue?: unknown
}
export type HelPreloadOptions = HelAddressOptions & HelAutoInstallOptions & {
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
/** True for native module scripts recorded from HEL metadata. */
export function isHelModuleAsset(url: string): boolean
export function resolveHelDep(dep: HelDep, options?: HelAddressOptions): HelLoadSpec
/** Stable libs-* -> comps-* -> other ordering; validates conflicting identities. */
export function resolveHelDeps(options: HelPreloadOptions): HelLoadSpec[]
export function installCompsLib(lib: object, vue?: unknown): boolean
export function assertHelExports<T extends object>(
  moduleName: string, host: string, lib: T | null | undefined, requiredExports?: readonly string[],
): asserts lib is T

export interface HelLoader {
  /** On-demand load. Shares requests and the serial queue with preload. */
  loadHelLib<T extends object = HelLibRecord>(
    dep: string | HelLoadSpec<T>, options?: HelAddressOptions & HelAutoInstallOptions,
  ): Promise<T>
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
/** Pass the sub-app's document so qiankun can scope CSS even when HEL reuses code. */
export function loadHelLibWithScopedStyles<T extends object = HelLibRecord>(
  dep: string | HelLoadSpec<T>, scopedDocument: Document,
): Promise<T>
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

export function resolveComponentHosts(
  packageName: string,
  options?: { source?: string; bases?: Record<string, string>; origin?: string; version?: string; projectName?: string },
): Array<{ source: string; host: string }>
