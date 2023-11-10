"use client";

import Input from "@/components/Universal/Inputs/input";
import Modal from "@/components/Universal/Modal/Modal";
import { useMyContext } from "@/context/Context";
import axios from "axios";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CHECK from "../../../../public/animations/check.json";
import SUCESS from "../../../../public/animations/sucess.json";
import { DotLoader } from "react-spinners";
import Cookies from "js-cookie";
import Header from "@/components/App/Dashboard/Header";
import { ContextUser } from "@/context/ContextUser";

export default function Payment() {
  const { user, bypass, logout } = ContextUser();
  const [number, setNumber] = useState(user.number ? user.number : "");
  const [isLoading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const { ENDPOINT } = useMyContext();

  const router = useRouter();
  const payment = async (e) => {
    e.preventDefault();
    if (number.length < 9 || number.length > 9) {
      toast.error("Please enter a valid phone number");
    } else {
      try {
        setLoading(true);

        let res = await axios.post(
          `${ENDPOINT}payment.php`,
          JSON.stringify({
            user: JSON.parse(Cookies.get("user")).id,
            number: number,
          })
        );
        setLoading(false);
        console.log(res);
        if (res.data.status == 201 || res.data.status == 200) {
          setIsPaid(true);
          setTimeout(() => {
            setIsPaid(false);
            router.push("/dashboard");
          }, 4000);
        } else if (res.data.status == 409) {
          toast(res.data.message, {
            duration: 2000,
          });
          router.push("/dashboard");
        } else {
          toast.error("Payment not sucessful, please try again");
        }
      } catch (error) {
        setLoading(false);
        setIsPaid(false);
        toast.error("Payment not sucessful, please try again");
        console.log(error);
      }
    }
  };

  return (
    <div className="payment">
      {isLoading && (
        <Modal>
          <div className="modal-presences-content-of-content">
            <h1>Verifique seu celular</h1>
            <Lottie className="lottie" animationData={CHECK} loop={true} />
            <p>
              Enviamos um notificação para seu celular, verifique e siga as
              instruções para continuar...
            </p>

            {isLoading && <DotLoader size={20} color="#DC4266" />}
          </div>
        </Modal>
      )}
      {isPaid && (
        <Modal>
          <div className="modal-presences-content-of-content">
            <h1>Sucessos!</h1>
            <Lottie className="lottie" animationData={SUCESS} loop={true} />
            <p>Pagamento efectuado com sucesso...</p>
            <p>Aguarde um momento...</p>

            {isPaid && <DotLoader size={20} color="#DC4266" />}
          </div>
        </Modal>
      )}

      <div className="wrapper">
        <Header buttons={false} />
        <form onSubmit={(e) => payment(e)} className="fill-container">
          <h1>Quase lá</h1>
          <div className="payment-inputs">
            <p>Digite seu numero de Celular para obter acesso completo:</p>
            <input
              placeholder="Digite seu celular"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          {isLoading ? (
            <p>Verifique seu celular....</p>
          ) : (
            <div>
              <button className="get-access-button" onClick={payment}>
                Obter acesso
              </button>
            </div>
          )}
        </form>

        {number.length > 1 && (
          <button onClick={() => setNumber("")} className="other-number">
            Usar outro numero
          </button>
        )}
        <button onClick={logout} className="other-number">
          Sair
        </button>
      </div>
    </div>
  );
}
