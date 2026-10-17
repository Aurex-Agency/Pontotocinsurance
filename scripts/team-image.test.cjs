const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript')
const compile=path=>ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
const images={};vm.runInNewContext(compile('lib/image-source.ts'),{exports:images,URL})
let writes=[];const route={};vm.runInNewContext(compile('app/api/team/route.ts'),{exports:route,console,require(name){
if(name==='@/lib/image-source')return images
if(name==='@/lib/require-admin')return{requireAdmin:async()=>null}
if(name==='next/server')return{NextResponse:{json:(body,options={})=>({body,status:options.status||200})}}
if(name.endsWith('/lib/database'))return{createTeamMember:async member=>{writes.push(member);return{success:true,data:member}},updateTeamMember:async(id,member)=>{writes.push(member);return{success:true,data:member}},getTeamMembers:async()=>({success:true,data:[{image_url:'javascript:alert(1)'}]})}
throw Error(name)
}})
;(async()=>{
for(const action of ['create','update']){
for(const image of ['javascript:alert(1)','data:text/html;base64,WA==','data:image/svg+xml;base64,WA==','//evil.example/a',42]){const before=writes.length;const result=await route.POST({json:async()=>({action,memberId:'test',member:{name:'Mock',image}})});assert.equal(result.status,400);assert.equal(writes.length,before)}
for(const image of [' https://example.com/photo.png ','/team/photo.jpg','data:image/png;base64,WA==','']){const result=await route.POST({json:async()=>({action,memberId:'test',member:{name:'Mock',image}})});assert.equal(result.status,200);assert.equal(writes.at(-1).image_url,image.trim())}
}
assert.equal((await route.GET()).body.teamMembers[0].image,'/team/default-avatar.jpg')
console.log('PASS team image API: 10 unsafe writes rejected, 8 safe writes normalized; unsafe legacy image reads replaced; mocked database only')
})().catch(error=>{console.error(error);process.exit(1)})
