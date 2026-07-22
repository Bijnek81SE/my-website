export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <div className="text-2xl font-bold">
        Labdoc<span className="text-cyan-400">AI</span>
      </div>

      <div className="hidden gap-8 text-sm text-slate-300 md:flex">
        <a href="#features" className="hover:text-white">
          Features
        </a>

        <a href="#about" className="hover:text-white">
          About
        </a>

        <a href="#contact" className="hover:text-white">
          Contact
        </a>
      </div>

      <button className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300">
        Get Started
      </button>
    </nav>
  );
}