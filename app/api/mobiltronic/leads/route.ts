import { open, mkdir } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { validateLead } from '@/lib/mobiltronic/leads';
export const runtime = 'nodejs';
export async function POST(request: Request) {
    const reply = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
    const origin = request.headers.get('origin');
    const requestHost = request.headers.get('host') ?? new URL(request.url).host;
    const permittedOrigin = origin === 'https://mobiltronic.bijan.se' || !!origin?.match(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/);
    if (!origin || !permittedOrigin || new URL(origin).host !== requestHost)
        return reply({ error: 'مبدأ درخواست معتبر نیست.' }, 403);
    if (!request.headers.get('content-type')?.includes('application/json'))
        return reply({ error: 'قالب درخواست معتبر نیست.' }, 415);
    // Bound streamed input, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader)
        return reply({ error: 'درخواست خالی است.' }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done)
            break;
        size += value.byteLength;
        if (size > 16384) {
            await reader.cancel();
            return reply({ error: 'حجم درخواست زیاد است.' }, 413);
        }
        chunks.push(value);
    }
    let input: unknown;
    try {
        input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    }
    catch {
        return reply({ error: 'درخواست معتبر نیست.' }, 400);
    }
    const lead = validateLead(input);
    if (!lead)
        return reply({ error: 'اطلاعات تماس، کالا، تعداد و رضایت را بررسی کنید.' }, 422);
    const directory = process.env.MOBILTRONIC_LEAD_DIRECTORY;
    // Never use an ephemeral default directory or falsely acknowledge delivery.
    if (!directory || !isAbsolute(directory) || process.env.MOBILTRONIC_LEADS_ENABLED !== 'true')
        return reply({ error: 'ثبت درخواست هنوز فعال نشده است. اطلاعات شما ثبت نشد.' }, 503);
    const id = randomUUID();
    try {
        await mkdir(directory, { recursive: true, mode: 0o700 });
        const file = await open(join(directory, `${id}.json`), 'wx', 0o600);
        try {
            await file.writeFile(JSON.stringify({ id, status: 'received', createdAt: new Date().toISOString(), ...lead }));
            await file.sync();
        }
        finally {
            await file.close();
        }
        const dir = await open(directory, 'r');
        try {
            await dir.sync();
        }
        finally {
            await dir.close();
        }
        return reply({ id, status: 'received', message: 'درخواست ثبت شد؛ این رسید تأیید سفارش یا پرداخت نیست.' }, 201);
    }
    catch {
        return reply({ error: 'ذخیره درخواست انجام نشد. لطفاً بعداً تلاش کنید.' }, 503);
    }
}
