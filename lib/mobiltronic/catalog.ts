export type Product = {
    id: string;
    sku: string;
    brand: string;
    model: string;
    category: 'smart' | 'poc';
    description: string;
    specs: Record<string, string>;
    images: {
        src: string;
        alt: string;
    }[];
    accessories: string[];
    priceStatus: 'inquiry';
    inventoryStatus: 'unverified';
    warranty: string;
    seo: {
        title: string;
        description: string;
    };
    source: string;
    verifiedAt: string;
};
export const categories = [{ id: 'smart', title: 'دستگاه‌های هوشمند مقاوم', text: 'برای ارتباط و کار در محیط‌های عملیاتی' }, { id: 'poc', title: 'بی‌سیم‌های تحت شبکه', text: 'ارتباط گروهی بر بستر شبکه تلفن همراه' }];
const candidates: Pick<Product, 'id' | 'model' | 'category' | 'description' | 'specs' | 'source'>[] = [
    { id: 'pnc560', model: 'PNC560', category: 'smart', description: 'دستگاه هوشمند مقاوم با ارتباط PTT بر بستر 5G و LTE.', specs: { 'شبکه': '5G / LTE', 'نمایشگر': '۶٫۳ اینچ', 'باتری': '۵۰۴۰ میلی‌آمپرساعت', 'مقاومت': 'IP68' }, source: 'https://www.hytera.com/eu/products/mcs-device/pnc560' },
    { id: 'pnc460', model: 'PNC460', category: 'smart', description: 'دستگاه هوشمند مقاوم برای ارتباطات تیمی و کاربردهای عملیاتی.', specs: { 'سیستم‌عامل': 'Android 12', 'نمایشگر': '۵ اینچ', 'باتری': '۴۵۰۰ میلی‌آمپرساعت', 'مقاومت': 'IP68' }, source: 'https://livesite2.hytera.com/en/product-new/lte-broadband/poc-radio/pnc460.html' },
    { id: 'pnc380', model: 'PNC380', category: 'poc', description: 'بی‌سیم PoC دارای صفحه‌کلید کامل، برای ارتباط گروهی روی شبکه تلفن همراه.', specs: { 'شبکه': '4G / WLAN', 'دوربین': '۵ مگاپیکسل', 'باتری': '۴۰۰۰ میلی‌آمپرساعت', 'مقاومت': 'IP67' }, source: 'https://www.hytera.com/en/product-new/lte-broadband/poc-radio/pnc380.html' },
];
export const products: Product[] = candidates.map(p => ({ ...p, category: p.category as Product['category'], sku: `HYT-${p.model}`, brand: 'Hytera', images: [], accessories: [], priceStatus: 'inquiry', inventoryStatus: 'unverified', warranty: 'شرایط و ارائه‌دهنده ضمانت باید پیش از سفارش تأیید شود.', seo: { title: `هایتر ${p.model} | موبیل‌ترونیک`, description: p.description }, verifiedAt: '2026-10-28' }));
export const findProduct = (id: string) => products.find(p => p.id === id);
export type CartItem = {
    id: string;
    quantity: number;
};
export function normalizeCart(value: unknown): CartItem[] {
    if (!Array.isArray(value))
        return [];
    const unique = new Map<string, CartItem>();
    for (const item of value.slice(0, 100))
        if (item && typeof item === 'object' && findProduct(item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 999)
            unique.set(item.id, { id: item.id, quantity: item.quantity });
    return [...unique.values()];
}
export function normalizeSearch(value: string) { return value.toLowerCase().replaceAll('ي', 'ی').replaceAll('ك', 'ک').trim(); }
export const pageTitles: Record<string, string> = { '': 'ارتباط مطمئن، انتخاب آگاهانه', catalog: 'کاتالوگ تجهیزات', compare: 'مقایسه محصولات', cart: 'سبد استعلام', checkout: 'بررسی درخواست خرید', business: 'خرید سازمانی', quote: 'درخواست پیش‌فاکتور', about: 'درباره موبیل‌ترونیک', contact: 'تماس با ما', shipping: 'ارسال و بازگشت', warranty: 'اطلاعات ضمانت', privacy: 'حریم خصوصی', guides: 'راهنمای خرید' };
