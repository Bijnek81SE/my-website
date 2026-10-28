'use client';
import { useSyncExternalStore, useState, type FormEvent } from 'react';
import { categories, products, findProduct, normalizeCart, normalizeSearch, pageTitles, type CartItem, type Product } from '@/lib/mobiltronic/catalog';
const cartKey = 'mobiltronic.cart.v1';
const emptyCart: CartItem[] = [];
let cachedRaw: string | null = null, cachedCart: CartItem[] = emptyCart;
function cartSnapshot() { try {
    const raw = localStorage.getItem(cartKey);
    if (raw !== cachedRaw) {
        cachedCart = normalizeCart(JSON.parse(raw ?? '[]'));
        cachedRaw = raw;
    }
    return cachedCart;
}
catch {
    return emptyCart;
} }
function subscribeCart(listener: () => void) { window.addEventListener('storage', listener); window.addEventListener('mobiltronic-cart', listener); return () => { window.removeEventListener('storage', listener); window.removeEventListener('mobiltronic-cart', listener); }; }
function Device({ model }: {
    model: string;
}) { return <div className={`device-scene ${model === 'PNC380' ? 'radio' : ''}`} role="img" aria-label={`طرح نمایشی دستگاه؛ تصویر واقعی ${model} نیست`}><div className="device"><div className="speaker"/><div className="screen"><span>HYTERA</span><strong>{model}</strong><small>PTT · CONNECTED</small><div className="signal">▂ ▃ ▅ ▇</div></div><div className="keys">•••</div></div><span className="illustration">طرح نمایشی · تصویر محصول در انتظار تأیید</span></div>; }
function Card({ p, href, add }: {
    p: Product;
    href: (path?: string) => string;
    add: (id: string) => void;
}) { return <article className="product-card"><a href={href(`products/${p.id}`)} tabIndex={-1} aria-hidden="true"><Device model={p.model}/></a><div className="card-body"><span className="eyebrow">HYTERA · {p.category === 'poc' ? 'بی‌سیم تحت شبکه' : 'دستگاه هوشمند'}</span><h3><a href={href(`products/${p.id}`)}><bdi>{p.model}</bdi></a></h3><p>{p.description}</p><div className="chips">{Object.entries(p.specs).slice(0, 2).map(([k, v]) => <span key={k}>{v}</span>)}</div><div className="price"><strong>قیمت با استعلام</strong><small>موجودی در انتظار تأیید</small></div><button className="button full" onClick={() => add(p.id)}>افزودن به سبد استعلام <span>＋</span></button></div></article>; }
function Summary({ cart, setCart, href }: {
    cart: CartItem[];
    setCart: (value: CartItem[] | ((previous: CartItem[]) => CartItem[])) => void;
    href: (path?: string) => string;
}) { return <div className="panel"><h2>خلاصه درخواست</h2>{cart.length ? cart.map(item => <div className="cart-row" key={item.id}><a href={href(`products/${item.id}`)}><bdi>{findProduct(item.id)?.model}</bdi></a><label>تعداد <input aria-label={`تعداد ${item.id}`} type="number" min="1" max="999" value={item.quantity} onChange={e => { const n = Number(e.target.value); if (Number.isInteger(n) && n >= 1 && n <= 999)
    setCart(cart.map(p => p.id === item.id ? { ...p, quantity: n } : p)); }}/></label><button className="text-button" onClick={() => setCart(cart.filter(p => p.id !== item.id))}>حذف</button></div>) : <p>سبد شما خالی است. <a href={href('catalog')}>مشاهده محصولات</a></p>}<hr /><p>جمع مبلغ: <strong>پس از تأیید قیمت</strong></p><p className="muted">پرداخت غیرفعال است. این سبد برای درخواست قیمت است و سفارش قطعی محسوب نمی‌شود.</p></div>; }
export default function Store({ route, base }: {
    route: string;
    base: string;
}) {
    const cart = useSyncExternalStore(subscribeCart, cartSnapshot, () => emptyCart);
    const [notice, setNotice] = useState(''), [query, setQuery] = useState(''), [category, setCategory] = useState('all'), [selected, setSelected] = useState<string[]>([]);
    const href = (path = '') => `${base}/${path}`;
    function setCart(value: CartItem[] | ((previous: CartItem[]) => CartItem[])) { try {
        const next = typeof value === 'function' ? value(cartSnapshot()) : value;
        localStorage.setItem(cartKey, JSON.stringify(next));
        window.dispatchEvent(new Event('mobiltronic-cart'));
        return true;
    }
    catch {
        setNotice('ذخیره سبد در این مرورگر ممکن نیست.');
        return false;
    } }
    function add(id: string) { const saved=setCart(previous => { const found = previous.find(p => p.id === id); return found ? previous.map(p => p.id === id ? { ...p, quantity: Math.min(999, p.quantity + 1) } : p) : [...previous, { id, quantity: 1 }]; }); if(saved) setNotice('به سبد استعلام اضافه شد.'); }
    const product = route.startsWith('products/') ? findProduct(route.split('/')[1]) : undefined;
    const activeCategory = route.startsWith('categories/') ? route.split('/')[1] : category;
    const filtered = products.filter(p => (activeCategory === 'all' || p.category === activeCategory) && normalizeSearch(`${p.brand} ${p.model} ${p.description}`).includes(normalizeSearch(query)));
    const isHome = route === '';
    return <><a className="skip" href="#mt-main">رفتن به محتوا</a><div className="topbar"><span>تجهیزات ارتباطی برای افراد و سازمان‌ها</span><span>نسخه پیش‌نمایش · خرید فقط با استعلام</span></div><header className="header"><a href={href()} className="brand"><span className="brand-mark">M<span>•</span></span><span>موبیل‌ترونیک<small>MOBILTRONIC</small></span></a><nav aria-label="ناوبری اصلی"><a href={href('catalog')}>محصولات</a><a href={href('business')}>خرید سازمانی</a><a href={href('guides')}>راهنمای خرید</a><a href={href('contact')}>تماس با ما</a></nav><a className="cart-link" href={href('cart')}>سبد استعلام <span>{cart.reduce((s, p) => s + p.quantity, 0)}</span></a><details className="mobile-menu"><summary>فهرست</summary><nav><a href={href('catalog')}>محصولات</a><a href={href('business')}>خرید سازمانی</a><a href={href('compare')}>مقایسه</a><a href={href('contact')}>تماس</a></nav></details></header>
 <main id="mt-main"><div className="notice" role="status" aria-live="polite">{notice}</div>{!isHome && <div className="breadcrumb"><a href={href()}>خانه</a><span> / </span>{product?.model ?? pageTitles[route] ?? 'دسته محصولات'}</div>}
 {isHome ? <><section className="hero"><div className="hero-copy"><div className="eyebrow gold">MOBILTRONIC / PROFESSIONAL COMMUNICATION</div><h1>یک ارتباط مطمئن،<br /><em>هزار امکان تازه.</em></h1><p>تجهیزات ارتباطی را آگاهانه انتخاب کنید؛ از یک دستگاه برای کار روزانه تا راهکار ارتباطی برای تمام تیم شما.</p><div className="actions"><a className="button gold-button" href={href('catalog')}>کشف محصولات <span>←</span></a><a className="button outline" href={href('business')}>راهکارهای سازمانی</a></div><div className="hero-note"><span>01 / انتخاب تخصصی</span><span>02 / استعلام شفاف</span><span>03 / بررسی سازگاری</span></div></div><div className="hero-art"><div className="orbit"/><Device model="PNC560"/><span className="art-caption">HYTERA PNC SERIES<br /><small>ارتباطات حرفه‌ای، در دست شما</small></span></div></section><div className="trust-strip"><div><strong>خرید آگاهانه</strong><span>مشخصات با ارجاع به سازنده</span></div><div><strong>شفافیت پیش از سفارش</strong><span>قیمت و موجودی فقط با تأیید</span></div><div><strong>انتخاب برای تیم شما</strong><span>درخواست تعداد و نیاز سازمانی</span></div></div><section className="section"><div className="section-heading"><div><span className="eyebrow">پیدا کنید، مقایسه کنید، انتخاب کنید</span><h2>دنیای ارتباطات حرفه‌ای</h2></div><a href={href('catalog')}>همه محصولات ←</a></div><div className="category-grid">{categories.map((c, i) => <a className="category" key={c.id} href={href(`categories/${c.id}`)}><span className="category-number">0{i + 1}</span><h3>{c.title}</h3><p>{c.text}</p><span>مشاهده تجهیزات ←</span></a>)}</div></section><section className="section"><div className="section-heading"><div><span className="eyebrow">منتخب اولیه کاتالوگ</span><h2>همراهِ روزهای کاری شما</h2></div><a href={href('compare')}>مقایسه تجهیزات ←</a></div><div className="product-grid">{products.map(p => <Card p={p} key={p.id} href={href} add={add}/>)}</div></section><section className="business-banner"><div><span className="eyebrow gold">برای سازمان‌ها</span><h2>وقتی هماهنگی تیم،<br />اهمیت بیشتری دارد.</h2><p>تعداد دستگاه، صنعت و نیاز ارتباطی خود را مشخص کنید تا درخواست شما برای بررسی آماده شود.</p></div><a className="button gold-button" href={href('quote')}>درخواست پیش‌فاکتور ←</a></section><section className="section faq"><h2>پرسش‌های متداول</h2>{[['آیا قیمت و موجودی قطعی است؟', 'خیر. قیمت، موجودی و شرایط تحویل باید پیش از هر سفارش به صورت مکتوب تأیید شوند.'], ['آیا این تجهیزات بدون سرویس کار می‌کنند؟', 'ارتباط PoC به شبکه، نرم‌افزار و سرویس سازگار نیاز دارد. پوشش و هزینه سرویس را جداگانه بررسی کنید.'], ['آیا پرداخت اینترنتی فعال است؟', 'خیر. این نسخه تنها سبد استعلام و بررسی درخواست دارد.']].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section></> :
            product ? <section className="section"><div className="product-detail"><Device model={product.model}/><div><span className="eyebrow">HYTERA / {product.sku}</span><h1>هایتر <bdi>{product.model}</bdi></h1><p>{product.description}</p><p>قیمت: <strong>نیازمند استعلام</strong> · موجودی: تأیید نشده</p><p>{product.warranty}</p><button className="button" onClick={() => add(product.id)}>افزودن به سبد استعلام</button><a className="secondary-link" href={href('compare')}>مقایسه محصولات</a></div></div><h2>مشخصات فنی</h2><p className="muted">بررسی منبع: ۲۸ اکتبر ۲۰۲۶. مشخصات نسخه منطقه‌ای و سازگاری با شبکه باید پیش از خرید تأیید شود.</p><dl className="specs">{Object.entries(product.specs).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><a href={product.source} target="_blank" rel="noreferrer">منبع رسمی مشخصات در وب‌سایت Hytera ↗</a><h2>تصاویر و اقلام همراه</h2><p>تصویر واقعی تأییدشده در دسترس نیست. اقلام داخل جعبه و لوازم جانبی سازگار پس از استعلام مشخص می‌شوند.</p></section> :
                route === 'catalog' || route.startsWith('categories/') ? <section className="section"><span className="eyebrow">CATALOG / HYTERA</span><h1>{categories.find(c => c.id === activeCategory)?.title ?? 'تجهیزات ارتباطی'}</h1><div className="filters"><label>جست‌وجوی محصول<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="مدل، برند یا کاربرد…"/></label>{route === 'catalog' && <label>دسته‌بندی<select value={category} onChange={e => setCategory(e.target.value)}><option value="all">همه دسته‌ها</option>{categories.map(c => <option value={c.id} key={c.id}>{c.title}</option>)}</select></label>}<a href={href('compare')}>مقایسه محصولات ←</a></div><p className="muted">{filtered.length.toLocaleString('fa-IR')} محصول · قیمت و موجودی نیازمند استعلام</p><div className="product-grid">{filtered.map(p => <Card p={p} key={p.id} href={href} add={add}/>)}</div>{!filtered.length && <div className="panel">محصولی پیدا نشد. عبارت جست‌وجو یا دسته را تغییر دهید.</div>}</section> :
                    route === 'compare' ? <section className="section"><h1>مقایسه محصولات</h1><p>مدل‌ها را برای مقایسه انتخاب کنید.</p><div className="chips">{products.map(p => <label key={p.id}><input type="checkbox" checked={selected.includes(p.id)} onChange={e => setSelected(e.target.checked ? [...selected, p.id] : selected.filter(id => id !== p.id))}/>{p.model}</label>)}</div>{selected.length ? <div className="table-wrap"><table><caption>مشخصات بر اساس منابع رسمی؛ قیمت و موجودی تأیید نشده است.</caption><thead><tr><th>ویژگی</th>{selected.map(id => <th key={id}><a href={href(`products/${id}`)}>{findProduct(id)?.model}</a></th>)}</tr></thead><tbody>{['شبکه', 'سیستم‌عامل', 'نمایشگر', 'دوربین', 'باتری', 'مقاومت'].map(key => <tr key={key}><th>{key}</th>{selected.map(id => <td key={id}>{findProduct(id)?.specs[key] ?? 'در این کاتالوگ تأیید نشده'}</td>)}</tr>)}</tbody></table></div> : <p className="panel">حداقل یک محصول را انتخاب کنید.</p>}</section> :
                        route === 'cart' ? <section className="section narrow"><h1>سبد استعلام شما</h1><Summary cart={cart} setCart={setCart} href={href}/>{cart.length > 0 && <a className="button" href={href('checkout')}>ادامه و بررسی درخواست ←</a>}</section> :
                            route === 'checkout' || route === 'quote' ? <section className="section"><h1>{pageTitles[route]}</h1><p className="alert">پرداخت آنلاین غیرفعال است؛ ثبت درخواست به معنای خرید یا تأیید موجودی نیست.</p><div className="checkout-grid"><LeadForm kind={route === 'quote' ? 'business' : 'individual'} cart={cart} base={base}/><div><Summary cart={cart} setCart={setCart} href={href}/>{route === 'quote' && <div className="panel"><h2>افزودن کالا به درخواست</h2>{products.map(p => <button className="text-button" key={p.id} onClick={() => add(p.id)}>＋ {p.model}</button>)}</div>}</div></div></section> :
                                route === 'business' ? <section className="section"><div className="business-banner"><div><span className="eyebrow gold">B2B / MOBILTRONIC</span><h1>ارتباط بهتر برای<br />تیم‌های بزرگ‌تر.</h1><p>برای بررسی خرید تعداد، مدل‌ها را انتخاب کنید و نیاز عملیاتی سازمان را همراه درخواست بفرستید.</p></div><a className="button gold-button" href={href('quote')}>درخواست پیش‌فاکتور ←</a></div><div className="category-grid">{['حمل‌ونقل و لجستیک', 'صنعت و تولید', 'خدمات و عملیات', 'پروژه‌های تخصصی'].map(t => <div className="panel" key={t}><h2>{t}</h2><p>پوشش شبکه، تعداد کاربران، نرم‌افزار و الزامات محیطی را پیش از انتخاب دستگاه بررسی کنید.</p></div>)}</div><h2>فرآیند بررسی خرید</h2><ol><li>انتخاب مدل و تعداد</li><li>شرح کاربرد و صنعت</li><li>تأیید جداگانه قیمت، سرویس، تحویل و ضمانت</li></ol></section> :
                                    <section className="section narrow"><span className="eyebrow">MOBILTRONIC / INFORMATION</span><h1>{pageTitles[route]}</h1><Information route={route} href={href}/></section>}
 </main><footer className="footer"><div><a className="brand" href={href()}>موبیل‌ترونیک <small>MOBILTRONIC</small></a><p>انتخاب آگاهانه تجهیزات ارتباطی.<br />برای افراد، تیم‌ها و سازمان‌ها.</p><small>نسخه پیش‌نمایش؛ اطلاعات تجاری در انتظار تأیید.</small></div><div><h2>انتخاب و خرید</h2>{[['catalog', 'محصولات'], ['compare', 'مقایسه'], ['business', 'خرید سازمانی'], ['guides', 'راهنمای خرید']].map(([p, t]) => <a key={p} href={href(p)}>{t}</a>)}</div><div><h2>اطلاعات و پشتیبانی</h2>{[['about', 'درباره ما'], ['contact', 'تماس'], ['shipping', 'ارسال و بازگشت'], ['warranty', 'ضمانت'], ['privacy', 'حریم خصوصی']].map(([p, t]) => <a key={p} href={href(p)}>{t}</a>)}</div><div className="footer-bottom">© MOBILTRONIC <span>قیمت، موجودی و شرایط فروش فقط پس از تأیید مکتوب معتبر است.</span></div></footer></>;
}
function LeadForm({ kind, cart, base }: {
    kind: 'individual' | 'business';
    cart: CartItem[];
    base: string;
}) {
    const [status, setStatus] = useState(''), [busy, setBusy] = useState(false);
    async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setStatus(''); const form = e.currentTarget, data = new FormData(form); try {
        const response = await fetch('/api/mobiltronic/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, items: cart, name: data.get('name'), email: data.get('email'), phone: data.get('phone'), company: data.get('company') ?? '', industry: data.get('industry') ?? '', message: data.get('message') ?? '', consent: data.get('consent') === 'on' }) });
        const result = await response.json();
        setStatus(response.ok ? `${result.message} شناسه پیگیری: ${result.id}` : result.error ?? 'درخواست ثبت نشد.');
    }
    catch {
        setStatus('ارتباط برقرار نشد؛ ثبت درخواست تأیید نشده است.');
    }
    finally {
        setBusy(false);
    } }
    return <form className="panel lead-form" onSubmit={submit}><h2>اطلاعات {kind === 'business' ? 'سازمان' : 'تماس'}</h2><p className="muted">در پیش‌نمایش اطلاعات واقعی یا حساس وارد نکنید. ثبت درخواست تنها در صورت فعال بودن ذخیره‌سازی انجام می‌شود.</p><label>نام و نام خانوادگی<input required minLength={2} maxLength={160} name="name" autoComplete="name"/></label><label>ایمیل<input required name="email" type="email" dir="ltr" maxLength={160} autoComplete="email"/></label><label>شماره تماس<input required name="phone" type="tel" dir="ltr" pattern={"[+0-9 \\(\\)\\-]{7,25}"} maxLength={25} autoComplete="tel"/></label>{kind === 'business' && <><label>نام شرکت<input required name="company" maxLength={160} autoComplete="organization"/></label><label>صنعت<select required name="industry"><option value="">انتخاب کنید</option>{['لجستیک', 'صنعت و تولید', 'خدمات', 'سایر'].map(t => <option key={t}>{t}</option>)}</select></label></>}<label>شرح نیاز<textarea name="message" maxLength={2000} rows={4}/></label><label className="consent"><input required type="checkbox" name="consent"/>با ثبت اطلاعات برای بررسی همین درخواست مطابق <a href={`${base}/privacy`}>اطلاعات حریم خصوصی</a> موافقم.</label><button className="button" disabled={busy || !cart.length}>{busy ? 'در حال ثبت…' : 'ثبت درخواست استعلام'}</button><p role="status" aria-live="polite">{status}</p></form>;
}
function Information({ route, href }: {
    route: string;
    href: (p: string) => string;
}) { switch (route) {
    case 'about': return <><p>موبیل‌ترونیک در این نسخه، کاتالوگی برای بررسی تجهیزات ارتباطی و آماده‌سازی درخواست خرید شخصی و سازمانی است.</p><div className="panel">نام حقوقی، نشانی، مجوزها و سابقه شرکت هنوز تأیید نشده‌اند و در این نسخه ادعایی درباره آن‌ها نمی‌شود.</div></>;
    case 'contact': return <><p>شماره تلفن، ایمیل پشتیبانی، نشانی و ساعت پاسخ‌گویی هنوز تأیید نشده‌اند.</p><p>فرم درخواست تنها پس از فعال‌سازی ذخیره‌سازی قابل استفاده است.</p><a className="button" href={href('quote')}>فرم درخواست سازمانی</a></>;
    case 'shipping': return <><h2>شرایط در انتظار تأیید</h2><p>محدوده ارسال، هزینه حمل، زمان تحویل، شرایط انصراف و بازگشت کالا هنوز توسط کسب‌وکار تأیید نشده است.</p><p>پیش از سفارش، شرایط مکتوب دریافت کنید. این صفحه سیاست نهایی فروش نیست.</p></>;
    case 'warranty': return <><p>ارائه‌دهنده، مدت، پوشش و استثناهای ضمانت برای هیچ محصولی تأیید نشده است.</p><p>درجه مقاومت اعلام‌شده توسط سازنده به معنای تعهد ضمانت فروشنده نیست. شرایط ضمانت باید پیش از سفارش مکتوب شود.</p></>;
    case 'privacy': return <><div className="alert">این متن اطلاع‌رسانی فنی پیش‌نمایش است. سیاست حقوقی نهایی هنوز تأیید نشده است.</div><h2>داده‌های این نسخه</h2><p>سبد استعلام با شناسه کالا و تعداد در فضای محلی مرورگر ذخیره می‌شود و با حذف کالاها یا پاک‌کردن داده‌های سایت حذف می‌شود. این نسخه ابزار تحلیل رفتار یا تبلیغات اضافه نمی‌کند.</p><p>در صورت فعال بودن فرم، نام، ایمیل، شماره تماس، شرکت، صنعت، شرح نیاز و کالاهای انتخابی برای بررسی درخواست به سرور ارسال می‌شوند. در حالت غیرفعال هیچ رسید موفقی صادر نمی‌شود.</p><h2>پیش از دریافت اطلاعات واقعی</h2><p>مسئول پردازش، راه تماس برای حذف داده، مدت نگهداری، کنترل دسترسی، محل پردازش و فرآیند پشتیبان‌گیری باید توسط مالک کسب‌وکار تعیین شوند. تا آن زمان از اطلاعات آزمایشی استفاده کنید.</p></>;
    case 'guides': return <><article className="panel"><h2>PoC چیست و چه پیش‌نیازهایی دارد؟</h2><p>ارتباط فشردن برای صحبت روی شبکه تلفن همراه، به دستگاه، پوشش شبکه و سرویس سازگار نیاز دارد. خرید دستگاه به تنهایی تضمین فعال بودن سرویس نیست.</p></article><article className="panel"><h2>چک‌لیست انتخاب برای تیم</h2><ul><li>پوشش شبکه در محل کار و مسیرها</li><li>تعداد کاربران و نیاز به مرکز کنترل</li><li>نسخه منطقه‌ای دستگاه و سازگاری نرم‌افزار</li><li>باتری، روش شارژ و شرایط محیطی</li><li>هزینه سرویس، اقلام همراه و ضمانت مکتوب</li></ul></article><a href={href('compare')}>مقایسه مدل‌های اولیه ←</a></>;
    default: return null;
} }
