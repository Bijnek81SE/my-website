import assert from 'node:assert/strict';
import http from 'node:http';
const server=process.env.MOBILTRONIC_TEST_URL??'http://127.0.0.1:3101';
const get=(path,host='mobiltronic.bijan.se')=>new Promise((resolve,reject)=>{const url=new URL(path,server);http.get(url,{headers:{host}},res=>{const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(new Response(Buffer.concat(chunks),{status:res.statusCode,headers:res.headers})));}).on('error',reject);});
let count=0;
for(const path of ['/','/catalog','/categories/smart','/categories/poc','/products/pnc560','/products/pnc460','/products/pnc380','/compare','/cart','/checkout','/business','/quote','/about','/contact','/shipping','/warranty','/privacy','/guides']){
 const response=await get(path);assert.equal(response.status,200,path);const html=await response.text();assert.match(html,/dir="rtl"/);assert.match(html,/lang="fa"/);assert.match(html,/noindex/);assert.match(response.headers.get('x-robots-tag'),/noindex/);assert.ok(html.includes(`https://mobiltronic.bijan.se${path}`));assert.match(html,/<h1/);count++;
}
const root=await get('/','bijan.se');assert.equal(root.status,200);const original=await root.text();assert.match(original,/<video/);assert.match(original,/\/movi.mp4/);assert.doesNotMatch(original,/موبیل‌ترونیک/);assert.equal(root.headers.get('x-robots-tag'),null);
const direct=await get('/mobiltronic/catalog','bijan.se');assert.equal(direct.status,200);assert.match(await direct.text(),/موبیل‌ترونیک/);
const robots=await get('/robots.txt');assert.match(await robots.text(),/Disallow: \//);
const sitemap=await get('/sitemap.xml');assert.equal(sitemap.status,200);assert.match(await sitemap.text(),/products\/pnc560/);
for(const path of ['/products/missing','/categories/missing','/missing'])assert.equal((await get(path)).status,404);
const body={name:'Test Customer',email:'test@example.com',phone:'+46701234567',company:'Example',industry:'logistics',message:'test',kind:'business',items:[{id:'pnc560',quantity:3}],consent:true};
const response=await fetch(`${server}/api/mobiltronic/leads`,{method:'POST',headers:{'Content-Type':'application/json',origin:server},body:JSON.stringify(body)});assert.equal(response.status,503);assert.ok(!(await response.json()).id);
console.log(`PASS: ${count} staging pages; original Bijan homepage; isolated direct path; noindex; canonical; robots; sitemap; 404s; disabled lead submission.`);
