"use client";

import Header from "@/components/App/Dashboard/Header";
import { ContextUser } from "@/context/ContextUser";

export default function Result({ score = 0, total = 0, Try, Return }) {
  const { user } = ContextUser();

  return (
    <div className="modal">
      <div className="wrapper wrapper-result">
        <Header />

        <div className="header-result">
          <h1>parabéns {user.name}</h1>
          <p>
            Sua pontuação foi de {score} / {total}
          </p>

          <div className="congrats-image">
            <h1>Parabéns {user.name}</h1>
          </div>
        </div>

        <div className="share">
          <button>Partilhe no Facebook</button>
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
