const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript')
const moduleExports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/image-source.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:moduleExports,URL})
const {safeImageSource:source,validImageUpload:upload}=moduleExports
for(const value of ['javascript:alert(1)','data:text/html,<script>alert(1)</script>','data:image/svg+xml;base64,PHN2Zz4=','//evil.example/image.png','/\\evil.example/image.png','https://user:pass@example.com/image.png','<img src=x onerror=alert(1)>','http://example.com/image.png','/image\u0000.png'])assert.equal(source(value),null,value)
for(const value of ['https://example.com/image.png','/team/photo.jpg','data:image/png;base64,aGVsbG8='])assert.equal(source(value),value)
assert(upload({type:'image/png',size:1024}));assert(upload({type:'image/webp',size:10*1024*1024}));assert(!upload({type:'image/svg+xml',size:1024}));assert(!upload({type:'image/png',size:10*1024*1024+1}));assert(!upload({type:'image/png',size:0}))
console.log('PASS image preview: 9 executable/malformed sources rejected; HTTPS/local/raster sources accepted; MIME and10MB limits enforced')
