import { normalizeCart } from './catalog';
export type Lead = {
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    message: string;
    kind: 'business' | 'individual';
    items: ReturnType<typeof normalizeCart>;
    consent: true;
};
export function validateLead(input: unknown): Lead | null {
    if (!input || typeof input !== 'object' || Array.isArray(input))
        return null;
    const v = input as Record<string, unknown>;
    for (const key of ['name', 'email', 'phone', 'company', 'industry', 'message'])
        if (typeof v[key] !== 'string' || (v[key] as string).length > (key === 'message' ? 2000 : 160))
            return null;
    const name = (v.name as string).trim(), email = (v.email as string).trim(), phone = (v.phone as string).trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+\d\s()-]{7,25}$/.test(phone) || v.consent !== true || !['business', 'individual'].includes(v.kind as string))
        return null;
    if (v.kind === 'business' && (!(v.company as string).trim() || !(v.industry as string).trim()))
        return null;
    const items = normalizeCart(v.items);
    if (!Array.isArray(v.items) || v.items.length !== items.length || !items.length)
        return null;
    return { name, email, phone, company: (v.company as string).trim(), industry: (v.industry as string).trim(), message: (v.message as string).trim(), kind: v.kind as Lead['kind'], items, consent: true };
}
