import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedContent from '@/components/home/FeaturedContent';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import TrustSection from '@/components/home/TrustSection';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedContent />
      <TrustSection />
      <Newsletter />
    </>
  );
}
