<<<<<<< HEAD
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
=======
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedContent from '@/components/home/FeaturedContent';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import TrustSection from '@/components/home/TrustSection';
>>>>>>> fcac42748f801e5a306da04c34fb4714d263d715

export default function Home() {
  return (
    <>
      <Hero />
<<<<<<< HEAD

      <CategoryGrid />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold">Featured Lessons</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              What Is Organic Chemistry?
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Begin your journey with the fundamentals of organic chemistry.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Atomic Structure
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Understand atoms before studying bonding.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Chemical Bonding
            </h3>

            <p className="mt-3 text-sm text-slate-600">
              Learn why molecules form.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
=======
      <CategoryGrid />
      <FeaturedContent />
      <TrustSection />
      <Newsletter />
    </>
  );
}
>>>>>>> fcac42748f801e5a306da04c34fb4714d263d715
