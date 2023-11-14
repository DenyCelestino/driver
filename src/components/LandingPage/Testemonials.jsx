"use client";
import Image from "next/image";
import IMAGETESTEMONIALS from "../../../public/happyblackamericanboy.jpg";
import Link from "next/link";
export default function Testemonials() {
  return (
    <section className="testemonilas-section">
      <div className="wrapper-website">
        <div>
          <div className="testemonilas-image">
            <Image src={IMAGETESTEMONIALS} />
          </div>
          <p>
            Best app ever, I past
            <br /> my test in one time!
          </p>
          <span>- Mwibe Mpasse</span>
        </div>
        <div>
          <div className="testemonilas-image">
            <Image src={IMAGETESTEMONIALS} />
          </div>
          <p>
            Best app ever, I past
            <br /> my test in one time!
          </p>
          <span>- Mwibe Mpasse</span>
        </div>
        <div>
          <div className="testemonilas-image">
            <Image src={IMAGETESTEMONIALS} />
          </div>
          <p>
            Best app ever, I past
            <br /> my test in one time!
          </p>
          <span>- Mwibe Mpasse</span>

          <Link href={"/free"}>Comece agora gratis</Link>
        </div>
        <div>
          <div className="testemonilas-image">
            <Image src={IMAGETESTEMONIALS} />
          </div>
          <p>
            Best app ever, I past
            <br /> my test in one time!
          </p>
          <span>- Mwibe Mpasse</span>
        </div>
      </div>
    </section>
  );
}
