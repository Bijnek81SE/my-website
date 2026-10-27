export default function Home() {
  return (
    <main
      style={{
        margin: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/asli.png"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      >
        <source src="/movi.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
