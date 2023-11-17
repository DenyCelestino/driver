"use client";

import { useMyContext } from "@/context/Context";
import Link from "next/link";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

export default function SharedComponent({ info }) {
  const { ENDPOINT } = useMyContext();

  return (
    <div className="shared-component">
      <div className="wrapper">
        <div className="image-contrats">
          <img src={ENDPOINT + "images/share/" + info.image} />
        </div>
        <h3>{info.user} passou no exame de condução preparatorio.</h3>
        <p>Você pode se preparar para o exame tambem, clique em:</p>

        <Link href={"/"}>Saber mais</Link>
        <FacebookShareButton url={`https://trafegotop.app/shared/${info.slug}`}>
          <button className="button facebook">
            Partilhar com amigos no facebook
          </button>
        </FacebookShareButton>
        <WhatsappShareButton url={`https://trafegotop.app/shared/${info.slug}`}>
          <button className="button whatsapp">
            Partilhar com amigos no Whatsapp
          </button>
        </WhatsappShareButton>
      </div>
    </div>
  );
}
