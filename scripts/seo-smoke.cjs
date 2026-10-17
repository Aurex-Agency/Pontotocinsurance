// Run against a LOCAL preview. All external requests and form writes are intercepted.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test')
const base = process.env.BASE_URL || 'http://127.0.0.1:8773'
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base)) throw Error('Local preview required')
const drafts=['what-to-bring-medicare-plan-review','term-permanent-life-insurance-agent-questions','prepare-health-coverage-conversation-pontotoc','moving-north-mississippi-insurance-review-checklist']
;(async()=>{
 const browser=await chromium.launch({headless:true})
 const page=await browser.newPage()
 let deliveryOK=true, writes=0, googleRequests=0
 await page.route('**/*',async route=>{
   const req=route.request(),url=new URL(req.url())
   if (/google(tagmanager|analytics)/.test(url.hostname)) googleRequests++
   if(req.method()==='POST' && (/leadconnectorhq|supabase/.test(url.hostname)||url.pathname.startsWith('/api/'))){writes++;return route.fulfill({status:deliveryOK?200:500,contentType:'application/json',body:JSON.stringify({success:deliveryOK})})}
   if(url.origin!==base) return route.fulfill({status:200,contentType:'application/json',body:'[]'})
   return route.continue()
 })
 fs.mkdirSync('artifacts',{recursive:true})
 for(const [path,method] of [['/api/admin/users','GET'],['/api/admin/users','POST'],['/api/admin/users/reset-password','POST'],['/api/contact-submissions','GET'],['/api/quote-requests','GET'],['/api/contact-submissions/not-a-real-id','DELETE'],['/api/quote-requests/not-a-real-id','PATCH'],['/api/settings','PUT'],['/api/team','POST']]){
   const denied=await fetch(base+path,{method});assert.equal(denied.status,401,path+' '+method+' must reject before any data operation')
 }
 const sitemap=await (await fetch(base+'/sitemap.xml')).text()
 for(const slug of drafts) assert(!sitemap.includes(slug),'draft in sitemap')
 for(const path of ['/','/life','/health','/medicare','/resources','/locations/oxford']){
  await page.goto(base+path)
  assert.equal(await page.locator('h1').count(),1,path+' h1')
  assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href,new URL('https://pontotocinsuranceagency.com'+path).href)
  assert.equal(googleRequests,0,'preview analytics request')
 }
 const medicare=await (await fetch(base+'/medicare')).text()
 assert(medicare.includes('$2,100'));assert(!medicare.includes('$5,030'));assert(!medicare.includes('Above $8,000'))
 for(const slug of drafts){const res=await fetch(base+'/resources/'+slug);assert.equal(res.status,404,'pending article must 404')}
 const admin=await fetch(base+'/admin/login');assert.match(admin.headers.get('x-robots-tag'),/noindex/)
 await page.goto(base+'/contact')
 async function fill(){await page.locator('#firstName').fill('Test');await page.locator('#lastName').fill('Review');await page.locator('#email').fill('seo-test@example.invalid');await page.locator('#phone').fill('6625550100');await page.locator('#service').selectOption('life');await page.locator('#message').fill('Local intercepted test only')}
 await fill();await page.getByRole('button',{name:'Send Message',exact:true}).click();await page.getByRole('status').filter({hasText:'sent successfully'}).waitFor()
 deliveryOK=false;await fill();await page.getByRole('button',{name:'Send Message',exact:true}).click();await page.getByRole('alert').filter({hasText:'error sending'}).waitFor();assert.equal(await page.getByRole('status').filter({hasText:'sent successfully'}).count(),0)
 assert(writes>=4)
 for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.goto(base+'/');await page.screenshot({path:`artifacts/home-${width}.png`,fullPage:true});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow')}
 await browser.close();console.log('PASS: SEO routes, canonicals, production draft exclusion/404, noindex, no preview GA, stubbed form success/failure, desktop/mobile screenshots')
})().catch(error=>{console.error(error);process.exit(1)})
