export type DownloadFormat = 'hel' | 'es' | 'umd'
export interface VueDownloadExample {
  remoteDep?: { name?: string; host?: string; platform?: string; appGroupName?: string; custom?: { appGroupName?: string } }
  component: string
  usage?: string
  props?: Record<string, unknown>
  slotHtml?: string | Record<string, string>
  background?: string
  stageHeight?: string
  openProp?: string
  libName?: string
}
export interface DownloadItem {
  name: string
  label: string
  props: Record<string, unknown>
  slotHtml?: Record<string, string>
}
export interface ReactDownloadExample {
  cdnResources?: import('../cdn.mjs').CdnResource[]
  remoteDep?: VueDownloadExample['remoteDep']
  title: string
  usage?: string
  libName: string
  items: DownloadItem[]
  panelSchema?: unknown[]
  propsPanel?: boolean
}
export interface DownloadFile { fileName: string; html: string; format: DownloadFormat }
export interface DownloadOptions { framework: 'vue2' | 'vue3' | 'react'; libName?: string; format?: DownloadFormat }
export interface DownloadState { downloaded: string; error: string }
export const DOWNLOAD_FORMATS: ReadonlyArray<{ value: DownloadFormat; label: string }>
export const DOWNLOAD_HINT: string
export const EXAMPLE_HINT: string
export function getDownloadFormatHint(format: DownloadFormat): string
export function buildDownloadFile(example: VueDownloadExample | ReactDownloadExample, options: DownloadOptions): DownloadFile
export function createDownloadController(onChange?: (state: DownloadState) => void): {
  reset(): void
  dispose(): void
  download(example: VueDownloadExample | ReactDownloadExample, options: DownloadOptions): DownloadFile | undefined
}
