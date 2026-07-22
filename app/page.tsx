import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <Image
        src="/me.jpg"
        alt="Bijan"
        width={500}
        height={500}
        priority
        className="rounded-2xl shadow-2xl"
      />
    </main>
  );
}