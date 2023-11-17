"use client";
import { useEffect, useRef, useState } from "react";

import Header from "@/components/App/Dashboard/Header";
import { ContextUser } from "@/context/ContextUser";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "@/context/Context";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

export default function Result({ score = 0, total = 0, Try, Return }) {
  const [isLoading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [slug, setSlug] = useState("");

  const facebook = useRef(null);
  const whatsapp = useRef(null);

  const { user } = ContextUser();
  const { ENDPOINT } = useMyContext();
  const captureScreenshot = async (social) => {
    const divToCapture = document.getElementById("congrats-image");

    html2canvas(divToCapture).then((canvas) => {
      canvas.toBlob(async (blob) => {
        // saveAs(blob, `growskills-winner-${user.name}-screenshot.png`);
        const formData = new FormData();
        formData.append("file", blob, "screenshot.png");

        const jsonData = {
          user: user.id,
        };

        formData.append("json_data", JSON.stringify(jsonData));

        try {
          setLoading(true);
          const response = await axios.post(`${ENDPOINT}share.php`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log(response.data);

          if (response.data.status == 200) {
            setDone(true);
            setSlug(response.data.slug);
            if (social == 2) {
              setTimeout(() => {
                if (whatsapp.current) {
                  whatsapp.current.click();
                  setLoading(false);
                }
              }, 2000);
            } else if (social == 1) {
              setTimeout(() => {
                if (facebook.current) {
                  facebook.current.click();
                  setLoading(false);
                }
              }, 2000);
            }
          } else {
            setLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error(error.message);
        }
      });
    });
  };

  return (
    <div className="modal">
      <div className="wrapper wrapper-result">
        <Header />

        <div className="header-result">
          <h1>parabéns {user.name}</h1>
          <p>
            Sua pontuação foi de {score} / {total}
          </p>

          <div id="congrats-image" className="congrats-image">
            <h1>Parabéns {user.name}</h1>
          </div>
        </div>

        <div className="share">
          {done ? (
            <FacebookShareButton
              ref={facebook}
              url={`https://driverbeta.vercel.app/shared/${slug}`}
            >
              Partilhe no Facebook
            </FacebookShareButton>
          ) : (
            <button onClick={() => captureScreenshot(1)}>
              {isLoading ? (
                <BeatLoader color="#ef8354" size={15} />
              ) : (
                " Partilhe no Facebook"
              )}
            </button>
          )}
          {done ? (
            <Link
              href={`https://api.whatsapp.com/send/?text=https://trafegotop.app/shared/${slug}`}
            >
              Partilhe no Whatsapp
            </Link>
          ) : (
            <button onClick={() => captureScreenshot(2)}>
              {isLoading ? (
                <BeatLoader color="#ef8354" size={15} />
              ) : (
                " Partilhe no Whatsapp"
              )}
            </button>
          )}
        </div>

        <div className="content-result">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          quos nesciunt.
        </div>

        <div className="try-container">
          <button onClick={Try} className="try">
            Tentar de novo
          </button>
          <button onClick={Return} className="out">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
