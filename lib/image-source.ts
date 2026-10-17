/** Accepted image sources never include executable schemes or SVG markup. */
export function safeImageSource(value: string): string | null {
  const source = value.trim()
  if (!source || /[<>\u0000-\u001f]/.test(source)) return null
  if (/^data:image\/(?:png|jpeg|gif|webp);base64,[a-zA-Z0-9+/]+={0,2}$/.test(source)) return source
  if (source.startsWith('/') && !source.startsWith('//') && !source.includes('\\')) return source
  try {
    const url = new URL(source)
    if (url.protocol !== 'https:' || url.username || url.password) return null
    return url.href
  } catch { return null }
}

export function validImageUpload(file: { type: string; size: number }): boolean {
  return ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type) && file.size > 0 && file.size <= 10 * 1024 * 1024
}
