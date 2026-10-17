const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript')
const code=ts.transpileModule(fs.readFileSync('lib/analytics.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
const moduleExports={},events=[]
const window={location:{hostname:'127.0.0.1'},gtag:(...args)=>events.push(args)}
vm.runInNewContext(code,{exports:moduleExports,window})
moduleExports.trackLead('ContactForm');assert.equal(events.length,0)
window.location.hostname='pontotocinsuranceagency.com';moduleExports.trackLead('ContactForm')
assert.equal(JSON.stringify(events),JSON.stringify([['event','generate_lead',{form_id:'ContactForm'}]]))
window.gtag=()=>{throw Error('blocked tracking')};assert.doesNotThrow(()=>moduleExports.trackLead('ContactForm'))
console.log('PASS analytics: preview silent; production event contains only form_id; blocked analytics cannot alter lead delivery')
