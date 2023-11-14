"use client";

import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import Start from "@/components/LandingPage/Start";
import Why from "@/components/LandingPage/Why";
import { ContextUser } from "@/context/ContextUser";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main() {
  const { setUser } = ContextUser();
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
    </>
  );
}
