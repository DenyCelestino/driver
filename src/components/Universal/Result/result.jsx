"use client";
import { useEffect, useState } from "react";

import Header from "@/components/App/Dashboard/Header";
import { ContextUser } from "@/context/ContextUser";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "@/context/Context";

export default function Result({ score = 0, total = 0, Try, Return }) {
  const [isLoading, setLoading] = useState(false);

  const { user } = ContextUser();
  const { ENDPOINT } = useMyContext();
  const captureScreenshot = async () => {
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
          setLoading(false);
          if (response.data.status == 200) {
            toast.success("Link generated successfully");
          } else {
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
          <button onClick={captureScreenshot}>Partilhe no Facebook</button>
          <button>Partilhe no Whatsapp</button>
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
