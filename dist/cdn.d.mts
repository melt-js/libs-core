export type CdnResource = { url: string; global?: string; type?: 'script' | 'style' }
/** Sequential loading, shared requests, a bounded timeout, and retry after failure. */
export function loadCdnResources(resources: readonly CdnResource[], options?: { timeout?: number }): Promise<void>
