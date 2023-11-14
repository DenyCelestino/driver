"use client";

import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import Start from "@/components/LandingPage/Start";
import Testemonials from "@/components/LandingPage/Testemonials";
import Try from "@/components/LandingPage/Try";
import Why from "@/components/LandingPage/Why";
import { useMyContext } from "@/context/Context";
import { ContextUser } from "@/context/ContextUser";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Main() {
  const { setUser } = ContextUser();
  const { modalInstall, setModalInstall } = useMyContext();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(true);
  let isiOS = false; // Inicialize a variável isiOS

  if (typeof window !== "undefined") {
    isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Resto do seu código que depende de 'navigator'
  }
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Armazena o evento para ser usado posteriormente
      event.preventDefault();

      setInstalled(false);
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Inicia a instalação
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("O usuário aceitou a instalação da PWA");
        } else {
          console.log("O usuário cancelou a instalação da PWA");
        }

        // Limpa o evento para que não possa ser usado novamente
        setDeferredPrompt(null);
      });
    }
  };
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("user");
    if (Cookies.get("logged")) {
      if (!userData) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);
  return (
    <>
      <Header />
      <Hero />
      <Start />
      <Why />
      <Try />
      <Testemonials />
      <Footer />
    </>
  );
}
