export interface ClipboardEnvironment {
  navigator?: Pick<Navigator, 'clipboard'>
  document?: Document
}

export function copyTextToClipboard(value: unknown, environment?: ClipboardEnvironment): Promise<boolean>
