import type { ReactDownloadExample, VueDownloadExample, DownloadFormat } from './download.mjs'

export interface StandaloneOptions {
  framework: 'vue2' | 'vue3' | 'react'
  format?: DownloadFormat
  target?: string | Element
}

export function mountStandaloneExample(example: VueDownloadExample | ReactDownloadExample, options: StandaloneOptions): Promise<unknown>
export function loadStandaloneLibrary(example: VueDownloadExample | ReactDownloadExample, format?: DownloadFormat): Promise<Record<string, unknown>>
export function bindVueRuntime(runtime: { Vue: unknown }): void
export function bindReactRuntime(runtime: { React: unknown; ReactDOM: unknown; ReactIs: unknown }): void
