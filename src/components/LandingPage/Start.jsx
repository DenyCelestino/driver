"use client";

import Image from "next/image";
import IPHONE from "../../../public/iphone.jpg";
import IMAGERIGHT from "../../../public/happyblackamericanboy.jpg";
import Link from "next/link";

export default function Start() {
  return (
    <section className="start-section">
      <div className="wrapper-website">
        <div className="left-start">
          <p>
            Lorem ipsum dolor sit amet,
            <br /> ectetur adipiscing elit, sed do
            <br /> eiusmod tempor incididunt ut lab
            <br /> et dolore magna aliqua.{" "}
          </p>

          <Link href={"/free"}> comece agora gratis</Link>
          <p>* lorem ipsum dolor sit</p>
        </div>
        <div className="start-image">
          <Image src={IPHONE} alt="start" className="start-image" />
        </div>
        <div className="right-start">
          <div className="right-image">
            <Image src={IMAGERIGHT} alt="start" />
          </div>
          <div className="content-right">
            <p>
              Best app ever, I past <br /> my test in one time!
            </p>
            <span> - Mwibe Mpasse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
