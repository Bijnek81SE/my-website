import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TrustedBy from "../components/TrustedBy";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <Features />

      <section
        id="about"
        className="mx-auto max-w-5xl px-6 py-24 text-center"
      >
        <h2 className="text-4xl font-bold">
          AI that works for your business
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Our platform is designed for startups, teams, and organizations that
          want practical AI solutions without unnecessary complexity.
        </p>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-5xl px-6 py-24 text-center"
      >
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-10">
          <h2 className="text-4xl font-bold">
            Ready to build something smarter?
          </h2>

          <p className="mt-4 text-slate-300">
            Start your AI project today and turn your ideas into real products.
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-block rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Contact Us
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 LabdocAI. All rights reserved.
      </footer>
    </main>
  );
}