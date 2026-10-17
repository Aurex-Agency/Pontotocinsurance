const assert=require('node:assert/strict')
const fs=require('node:fs')
const vm=require('node:vm')
const ts=require('typescript')
const source=ts.transpileModule(fs.readFileSync('lib/require-admin.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
let calls=0, result={data:{user:{id:'allowed'}},error:null}
const moduleExports={}
const env={}
vm.runInNewContext(source,{exports:moduleExports,Request,process:{env},require(name){if(name==='next/server')return{NextResponse:{json:(body,options)=>({body,status:options.status})}};if(name==='./supabase')return{supabase:{auth:{getUser:async token=>{calls++;assert.equal(token,'test-token');return result}}}};throw Error(name)}})
;(async()=>{
const request=token=>new Request('https://local.invalid/api/admin/users',{headers:token?{authorization:token}:{}})
assert.equal((await moduleExports.requireAdmin(request())).status,401);assert.equal(calls,0)
assert.equal((await moduleExports.requireAdmin(request('Bearer test-token'))).status,503);assert.equal(calls,0)
env.ADMIN_USER_IDS='allowed';assert.equal(await moduleExports.requireAdmin(request('Bearer test-token')),null)
result={data:{user:{id:'other',user_metadata:{role:'admin'}}},error:null};assert.equal((await moduleExports.requireAdmin(request('Bearer test-token'))).status,403)
result={data:{user:null},error:{message:'expired'}};assert.equal((await moduleExports.requireAdmin(request('Bearer test-token'))).status,401)
// Every privileged route handler has its own guard, independent of middleware.
for(const [file,methods] of Object.entries({'admin/users':['GET','POST','DELETE'],'admin/users/reset-password':['POST'],'contact-submissions':['GET'],'quote-requests':['GET'],'contact-submissions/[id]':['PATCH','DELETE'],'quote-requests/[id]':['PATCH','DELETE'],'settings':['PUT','POST'],'team':['POST']})){
const code=fs.readFileSync(`app/api/${file}/route.ts`,'utf8');for(const method of methods){const start=code.indexOf(`export async function ${method}(`);assert(start>=0);assert(code.slice(start,code.indexOf('try {',start)).includes('await requireAdmin(request)'),`${file} ${method} lacks guard`)}
}
console.log('PASS admin auth: missing/malformed/unconfigured/invalid/nonadmin denial, verified allowlist, no editable metadata authority, every privileged handler guarded')
})().catch(e=>{console.error(e);process.exit(1)})
