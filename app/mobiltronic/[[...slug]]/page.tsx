import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
type Props = {
    params: Promise<{
        slug?: string[];
    }>;
};
const publicPreviewHost = 'bijan.se';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const path = (await params).slug ?? []; return { title: path.length ? 'موبایل ترونیک' : 'خانه موبایل ترونیک', robots: { index: false, follow: false }, alternates: { canonical: `https://${publicPreviewHost}/mobiltronic/${path.join('/')}` } }; }
function ConsultingPage() {
    const benefits = ['بهینه‌سازی پوشش سیگنال', 'افزایش کیفیت خدمات (QoS)', 'مدیریت تداخل فرکانسی', 'کاهش هزینه‌ها', 'تطابق با نیازهای کاربران', 'آمادگی برای رشد شبکه'];
    const steps = ['جمع‌آوری اطلاعات اولیه', 'شبیه‌سازی رادیویی', 'تحلیل تداخل و ظرفیت', 'بهینه‌سازی مکان سایت‌ها و تنظیمات آنتن‌ها', 'اندازه‌گیری و تست نهایی', 'تأیید نهایی و اخذ مجوز رسمی'];
    return <main style={{direction:'rtl',fontFamily:'Tahoma,Arial,sans-serif',color:'#555',background:'#f1f5f6',padding:'24px max(5vw,20px)',lineHeight:1.9,minHeight:'100vh'}}>
      <nav style={{background:'#fff',padding:'22px 28px',borderRadius:8,boxShadow:'0 2px 8px #0001',marginBottom:42,color:'#999'}}><Link href="/mobiltronic/" style={{color:'inherit',textDecoration:'none'}}>خانه</Link>　‹　خدمات　‹　مشاوره و طراحی شبکه</nav>
      <article style={{maxWidth:1500,margin:'0 auto'}}>
        <h1 style={{textAlign:'right',fontSize:'clamp(28px,3vw,44px)',margin:'0 0 24px',color:'#555'}}>مشاوره و طراحی شبکه</h1>
        <p style={{fontSize:'clamp(17px,1.45vw,24px)',lineHeight:1.9,margin:'0 0 28px'}}><strong>ضرورت مشاوره و طراحی شبکه برای پیش‌بینی پوشش رادیویی</strong> در شبکه‌های مخابراتی، یکی از مراحل حیاتی در توسعه و بهره‌برداری از شبکه‌های رادیویی است. این فرآیند شامل تحلیل، شبیه‌سازی و برنامه‌ریزی دقیق برای اطمینان از دستیابی به پوشش و کیفیت خدمات مطلوب در مناطق مورد نظر است.</p>
        <Image src="/mobiltronic/network-design-coverage.webp" alt="طرح پوشش شبکه رادیویی با دستگاه‌های بی‌سیم، روترها، کنترلر PoC و اینترنت" width={1972} height={798} priority style={{display:'block',width:'100%',height:'auto',background:'#fff',objectFit:'contain',margin:'24px 0'}} />
        <h2>دلایل اهمیت طراحی شبکه و پیش‌بینی پوشش رادیویی:</h2><ol>{benefits.map(x=><li key={x}>{x}</li>)}</ol>
        <h2>فرآیند طراحی و پیش‌بینی پوشش رادیویی</h2><ol>{steps.map(x=><li key={x}>{x}</li>)}</ol>
        <p style={{fontSize:18}}>مشاوره، پیش‌بینی و طراحی شبکه در سیستم‌های مخابراتی، به‌ویژه برای پوشش رادیویی، پایه‌ای‌ترین گام در ایجاد یک شبکه پایدار و کارآمد و از مراحل حیاتی در توسعه و بهره‌برداری سیستم‌های رادیویی است. این فرآیند نه‌تنها موجب کاهش هزینه‌ها و افزایش کیفیت خدمات می‌شود، بلکه انتخاب صحیح تجهیزات رادیویی، جانمایی دقیق و صحیح آن‌ها رضایت کاربران را نیز تضمین می‌کند.</p>
        <p style={{fontSize:20,fontWeight:700}}>مفتخریم در این امر شما را یاری کنیم.</p><p><Link href="/mobiltronic/contact" style={{color:'#e98a27',fontWeight:700}}>با ما تماس بگیرید.</Link></p>
      </article>
    </main>;
}
export default async function Page({ params }: Props) {
    const path = (await params).slug ?? [];
    if (path.join('/') === 'services/consulting-and-network-design') return <ConsultingPage />;
    if (path.length === 0) {
        let mirrorHtml: string | undefined;
        try {
            const response = await fetch('https://mobiltronic.ir/', { next: { revalidate: 3600 } });
            if (response.ok) {
                const source = await response.text();
                const bridge = `<script>document.addEventListener('click',function(event){var link=event.target.closest('a[href]');if(!link)return;var url=new URL(link.getAttribute('href'),document.baseURI);if(url.hostname==='mobiltronic.ir'&&url.pathname.replace(/\\/$/,'')==='/services/consulting-and-network-design'){event.preventDefault();window.top.location.href='/mobiltronic/services/consulting-and-network-design';}},true);</script>`;
                mirrorHtml = source.replace(/<head([^>]*)>/i, '<head$1><base href="https://mobiltronic.ir/">').replace(/<\/body>/i, `${bridge}</body>`);
            }
        } catch {
            // Fall through to the original site when its HTML is unavailable.
        }
        if (mirrorHtml) return <iframe title="وب‌سایت موبایل ترونیک" srcDoc={mirrorHtml} sandbox="allow-scripts allow-forms allow-top-navigation-by-user-activation allow-popups" style={{ display: 'block', width: '100%', height: '100vh', minHeight: '100vh', border: 0 }} />;
    }
    const sourcePath = path.length ? `/${path.join('/')}` : '/';
    return <iframe title="وب‌سایت موبایل ترونیک" src={`https://mobiltronic.ir${sourcePath}`} style={{ display: 'block', width: '100%', height: '100vh', minHeight: '100vh', border: 0 }} />;
}

