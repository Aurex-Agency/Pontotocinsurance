// Opt-in deployment utility. Never run from a build or preview lifecycle.
import { readFile } from 'node:fs/promises'
const host = 'pontotocinsuranceagency.com'
const args = process.argv.slice(2)
const file = args.find(arg => !arg.startsWith('--'))
if (!file) throw new Error('Provide a JSON file containing changed canonical URL strings')
const urls = [...new Set(JSON.parse(await readFile(file, 'utf8')))]
if (!urls.length || urls.length > 10000 || urls.some(value => {
  const u = new URL(value)
  return u.origin !== `https://${host}` || u.search || u.hash || /^\/(admin|api|secure-email-link|webinarlink)(\/|$)/.test(u.pathname)
})) throw new Error('Use 1-10000 public canonical URLs on the production host without query strings')
if (!args.includes('--submit')) {
  console.log(JSON.stringify({dryRun:true, host, urlList:urls}, null, 2))
} else {
  if (process.env.VERCEL_ENV !== 'production' || process.env.INDEXNOW_ENABLED !== 'true') throw new Error('Production deployment authorization required')
  const key = process.env.INDEXNOW_KEY || ''
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('Valid IndexNow key required')
  const keyLocation = `https://${host}/${key}.txt`
  const verification = await fetch(keyLocation, {redirect:'error'})
  if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('Deployed key file verification failed')
  const sitemap = await fetch(`https://${host}/sitemap.xml`).then(r => r.text())
  for (const url of urls) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error('Changed URL must be in the live public sitemap')
    const response = await fetch(url, {redirect:'error'})
    if (!response.ok || /noindex/i.test(response.headers.get('x-robots-tag') || '')) throw new Error('Changed URL is not publicly indexable')
    const html = await response.text()
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    if (canonical !== url) throw new Error('Canonical does not match the changed URL')
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) throw new Error('Noindex page rejected')
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({host,key,keyLocation,urlList:urls})})
  if (![200,202].includes(response.status)) throw new Error(`IndexNow returned ${response.status}`)
  console.log(`Received by IndexNow (${response.status}); indexing is not guaranteed.`)
}
