"use client";

import Image from "next/image";
import START from "../../../../public/startexam.svg";
import Link from "next/link";
export default function StartExam() {
  return (
    <div className="start-exam">
      <div className="wrapper">
        <Image src={START} alt="start exam" className="start-exam-image" />

        <h1>Pronto ?</h1>
        <p>
          Você está prestes a embarcar em um exame com 30 perguntas, mas você
          tem apenas 10 minutos para respondê-las. Lembre-se, você pode voltar e
          revisar suas respostas se tiver tempo. Responda com calma,
          concentração e boa sorte!
        </p>
        <Link className="start-exame-button" href={"/exam"}>
          Começar exame
        </Link>

        <Link href={"/dashboard"} className="back">
          Voltar
        </Link>
      </div>
    </div>
  );
}
