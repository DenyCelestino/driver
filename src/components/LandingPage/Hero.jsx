import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="content">
        <div>
          <p>Primeira tentativa</p>
          <h1>Resultado Perfeito</h1>
        </div>
        <Link href={"/free"}> Comece agora gratis</Link>
      </div>
    </section>
  );
}
