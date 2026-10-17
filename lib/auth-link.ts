export function validatedAuthLink(link: string | null): string | null {
  if (!link) return null
  try {
    const url = new URL(link)
    const expected = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndgzmalrirbbeqbrgrjo.supabase.co')
    if (url.protocol !== 'https:' || url.origin !== expected.origin || url.pathname !== '/auth/v1/verify' || url.username || url.password) return null
    return url.href
  } catch { return null }
}
