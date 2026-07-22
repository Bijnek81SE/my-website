import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <Image
        src="/me-signed.jpg"
        alt="Bijan"
        width={500}
        height={500}
        priority
        className="h-auto w-[min(500px,80vw)] rounded-2xl shadow-2xl"
      />
    </main>
  );
}