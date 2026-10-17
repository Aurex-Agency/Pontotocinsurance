const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript')
const code=ts.transpileModule(fs.readFileSync('lib/auth-link.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
const moduleExports={};vm.runInNewContext(code,{exports:moduleExports,URL,process:{env:{}}})
const check=moduleExports.validatedAuthLink
assert.equal(check('https://ndgzmalrirbbeqbrgrjo.supabase.co/auth/v1/verify?token=test'),'https://ndgzmalrirbbeqbrgrjo.supabase.co/auth/v1/verify?token=test')
for(const url of [null,'javascript:alert(1)','https://evil.invalid/?supabase.co/auth/v1/verify','https://ndgzmalrirbbeqbrgrjo.supabase.co.evil.invalid/auth/v1/verify','https://other.supabase.co/auth/v1/verify','http://ndgzmalrirbbeqbrgrjo.supabase.co/auth/v1/verify','https://user:pass@ndgzmalrirbbeqbrgrjo.supabase.co/auth/v1/verify'])assert.equal(check(url),null)
console.log('PASS auth links: exact HTTPS project endpoint only; rejects substring spoof, wrong project, credentials and javascript')
