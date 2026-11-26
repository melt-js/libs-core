export declare const CODE_PLAY_ORIGIN: string

/** CodePlayer 站点地址：构建期注入 > sftp 自托管 > 官方站 */
export declare function resolveCodePlayOrigin(): string

/** unpkg 上的包地址规则 */
export declare const UNPKG_ORIGIN: string
export declare const HEL_SCOPE: string
export declare const HEL_TAG: string
/** libs-core 的 UMD 宿主版本，必须与各 leva 包构建时锁定的版本一致 */
export declare const HEL_CORE_VERSION: string

export interface HelPkgOptions {
  /** npm scope，默认 `@melt-js` */
  scope?: string
  /** 版本标签，默认 `latest`；发版后自动跟随，无需改代码 */
  tag?: string
}

export declare function unpkgHelBase(pkg: string, options?: HelPkgOptions): string
/** hel-meta.json 地址，即 preloadHelLibs 的 host */
export declare function unpkgHelMeta(pkg: string, options?: HelPkgOptions): string
/** 能独立运行的 UMD 产物（cdn/index.umd.cjs），挂 window.<LIB_NAME> */
export declare function unpkgHelUmd(pkg: string, options?: HelPkgOptions): string
/** @deprecated hel-lib-proxy 空壳，缺宿主 runtime 会抛 exposeLib 未定义 */
export declare function unpkgHelEntry(pkg: string, options?: HelPkgOptions): string

/** 框架 ↔ 需要预加载的 hel 包 */
export declare const HEL_PKGS_BY_FRAMEWORK: Record<string, string[]>

export declare function encodeCodePlayHash(files: Record<string, string>): string
export declare function decodeCodePlayHash(hash: string): Record<string, string> | null

export interface CodePlayBundle {
  files: Record<string, string>
  entry: string
  activeFile: string
  appType?: string
  vueVersion?: number
}

export declare function buildCodePlayUrl(options?: {
  files?: Record<string, string>
  entry?: string
  activeFile?: string
  appType?: string
  vueVersion?: number
  theme?: string
}): string

/**
 * 生成 CodePlayer 用的文件集合。
 *
 * hel 默认开启：index.html 依次挂 框架 UMD → libs-core 的 vendor/index UMD →
 * bindVueRuntime/bindReactRuntime → preloadHelLibs(host=hel-meta.json) → 各包 cdn/index.umd.cjs，
 * 结果挂在 window.helReady / window.helLibs。
 *
 * importmap 里框架本体改成 `data:text/javascript` 的桥接模块（从全局实例转发），
 * 避免和 hel 产物各持一套响应式系统。桥接必须是绝对 URL，相对路径在 CodePlayer 里会 404。
 */
export interface CodePlayFileOptions extends HelPkgOptions {
  hel?: boolean
  helPkgs?: string[]
  /**
   * 远程包对外导出的成员名。给了就会在 importmap 里注册一个 `demo` 桥接，
   * 示例代码里 `import { Xxx } from 'demo'` 才解析得到。
   */
  demoNames?: string[]
  /**
   * 需要预加载的 hel 包及其 hel-meta.json 候选地址（按顺序试）。
   * 不传则按框架默认包走 unpkg。
   */
  helDeps?: Array<string | { name: string; metas?: string[] }>
}

/** 从 preloadHelLibs 返回的 deps 对象里收集成员名 */
export declare function demoNamesOf(deps: Record<string, unknown> | null | undefined): string[]

export declare function vue3CodePlayFiles(code: string, options?: CodePlayFileOptions): CodePlayBundle
export declare function vue2CodePlayFiles(code: string, options?: CodePlayFileOptions): CodePlayBundle
export declare function reactCodePlayFiles(code: string, options?: CodePlayFileOptions): CodePlayBundle
export declare function codePlayBundleOf(
  framework: string,
  code: string,
  options?: CodePlayFileOptions,
): CodePlayBundle

/** 同源地址转站点相对路径（`/...`），让生成出的链接跟着 CodePlayer 站点走 */
export declare function toSitePath(url: string): string
