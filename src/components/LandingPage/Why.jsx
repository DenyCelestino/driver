"use client";

import Image from "next/image";
import Link from "next/link";
import CHECK from "../../../public/check.jpg";
import PHONES from "../../../public/threephones.jpg";
import MAN from "../../../public/handsome-man-driving.jpg";
const vantagens = [
  "Primeira Tentativa",
  "Primeira Tentativa",
  "Primeira Tentativa",
];

export default function Why() {
  return (
    <section className="why-section">
      <div className="wrapper-website">
        <div className="why-left">
          <div className="why-left-content">
            <h1>
              Lorem ipsum dolor <br /> sit amet
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div>
              <Link href={"/free"}>Comece agora gratis</Link>
            </div>

            <div className="phones">
              <Image src={PHONES} alt="phones" />
            </div>
          </div>
        </div>
        <div className="why-right">
          <div className="why-right-content">
            <div className="content">
              <h1>Por que trafegotop?</h1>
              <div className="vantages">
                {vantagens.map((vantagem, index) => (
                  <p key={index}>
                    {" "}
                    <Image src={CHECK} alt="check" /> {vantagem}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="why-right-image">
            <Image src={MAN} alt="man" />
          </div>
        </div>
      </div>
    </section>
  );
}
