export interface DocumentationEvent { name: string; type?: string; description?: string }
export interface ComponentDocumentation {
  description?: string
  requirements?: string[]
  events?: Array<DocumentationEvent | string>
  code?: string
}
export interface DocumentationSchema { name: string; type?: string; default?: unknown; required?: boolean | string; description?: string; isEvent?: boolean }
export interface DocumentationOptions extends ComponentDocumentation {
  libName?: string
  exportName?: string
  remoteDep?: { platform?: string }
  name?: string
  schema?: DocumentationSchema[]
  values?: Record<string, unknown>
  framework?: 'vue2' | 'vue3' | 'react'
  slotHtml?: Record<string, string>
  models?: Array<{ prop: string; event: string }>
}
export function buildComponentDocs(options?: DocumentationOptions): {
  name: string
  props: Array<{ name: string; type: string; default: string; required: boolean; description: string }>
  events: Array<{ name: string; type: string; description: string }>
  description: string
  requirements: string[]
  code: string
}
export function componentEvents(component: unknown, listeners?: Record<string, unknown>): string[]
