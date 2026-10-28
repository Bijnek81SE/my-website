// @vitest-environment node
import {afterEach,describe,it,expect,vi} from 'vitest';
import {mkdtemp,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {normalizeCart,products,normalizeSearch} from '@/lib/mobiltronic/catalog';
import {validateLead} from '@/lib/mobiltronic/leads';
import {POST} from '@/app/api/mobiltronic/leads/route';
const valid={name:'Test Customer',email:'test@example.com',phone:'+46701234567',company:'Example',industry:'logistics',message:'test',kind:'business',items:[{id:'pnc560',quantity:3}],consent:true};
let directory='';
afterEach(async()=>{vi.unstubAllEnvs();if(directory){await rm(directory,{recursive:true,force:true});directory='';}});
const request=(data:unknown,origin='http://localhost:3000')=>new Request('http://localhost:3000/api/mobiltronic/leads',{method:'POST',headers:{'content-type':'application/json',origin},body:JSON.stringify(data)});
describe('commerce boundaries',()=>{
 it('retains valid cart items and rejects unknown, fractional, negative and excessive quantities',()=>{expect(normalizeCart([{id:'pnc560',quantity:2},{id:'unknown',quantity:1},{id:'pnc460',quantity:-1},{id:'pnc380',quantity:1.5}])).toEqual([{id:'pnc560',quantity:2}]);expect(normalizeCart([{id:'pnc560',quantity:1000}])).toEqual([]);expect(normalizeCart(null)).toEqual([]);});
 it('contains no fabricated commercial offers',()=>{expect(products.every(p=>p.priceStatus==='inquiry'&&p.inventoryStatus==='unverified'&&p.source.startsWith('https://'))).toBe(true);});
 it('normalizes Persian search variants',()=>expect(normalizeSearch('  كاربري  ')).toBe('کاربری'));
 it('validates contact, consent and organization',()=>{expect(validateLead(valid)).toBeTruthy();for(const override of [{consent:false},{company:''},{email:'invalid'},{phone:'abc'},{items:[]},{items:[{id:'unknown',quantity:1}]},{items:[{id:'pnc560',quantity:0}]},{message:'x'.repeat(2001)}])expect(validateLead({...valid,...override})).toBeNull();});
 it('rejects cross-origin submissions',async()=>expect((await POST(request(valid,'https://bad.example'))).status).toBe(403));
 it('rejects invalid form input server-side',async()=>expect((await POST(request({...valid,consent:false}))).status).toBe(422));
 it('fails closed when persistence is disabled',async()=>{vi.stubEnv('MOBILTRONIC_LEADS_ENABLED','false');expect((await POST(request(valid))).status).toBe(503);});
 it('bounds payload size',async()=>expect((await POST(request({...valid,message:'x'.repeat(17000)}))).status).toBe(413));
 it('only issues a receipt after persisting exact validated data',async()=>{directory=await mkdtemp(join(tmpdir(),'mobiltronic-test-'));vi.stubEnv('MOBILTRONIC_LEADS_ENABLED','true');vi.stubEnv('MOBILTRONIC_LEAD_DIRECTORY',directory);const response=await POST(request(valid));expect(response.status).toBe(201);const receipt=await response.json();const files=await readdir(directory);expect(files).toEqual([`${receipt.id}.json`]);expect(JSON.parse(await readFile(join(directory,files[0]),'utf8'))).toMatchObject({id:receipt.id,status:'received',email:valid.email,items:valid.items});});
 it('does not acknowledge unwritable storage',async()=>{vi.stubEnv('MOBILTRONIC_LEADS_ENABLED','true');vi.stubEnv('MOBILTRONIC_LEAD_DIRECTORY','/dev/null/mobiltronic');expect((await POST(request(valid))).status).toBe(503);});
});
