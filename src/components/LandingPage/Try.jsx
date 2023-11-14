"use client";

import Link from "next/link";

export default function Try() {
  return (
    <section className="try">
      <div className="wrapper-website">
        <div className="content">
          <span>
            Primeira Tentativa, <br />{" "}
            <span className="bold"> Resultado Perfeito</span>
          </span>
          <div>
            <Link href={"/free"}>Comece agora gratis</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
