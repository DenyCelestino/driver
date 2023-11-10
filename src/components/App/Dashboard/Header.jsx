"use client";

import Image from "next/image";
import LOGOWHITE from "../../../../public/logo-white.svg";
import LOGO from "../../../../public/logo.svg";
import { ContextUser } from "@/context/ContextUser";
import { SidebarCloseIcon, X } from "lucide-react";
export default function Header({ buttons = true }) {
  const { hamburguer, setHamburguer, bypass } = ContextUser();
  return (
    <div className="app-header">
      <div className="left-container">
        <div className={hamburguer ? "logo logo-white" : "logo logo-green"}>
          {hamburguer ? <Image src={LOGO} /> : <Image src={LOGOWHITE} />}
        </div>

        {bypass.days <= 7 && (
          <span className="days">{bypass.days} dias restantes</span>
        )}
      </div>

      {buttons && (
        <div
          onClick={() => setHamburguer(!hamburguer)}
          className="right-container"
        >
          {hamburguer ? (
            <X size={40} color="#FFF" />
          ) : (
            <>
              <span className="menu">Menu</span>

              <div className="hamburguer">
                <div className="hamburguer-arrow">
                  <span />
                  <span />
                </div>
                <span className="line" />
                <div className="hamburguer-arrow">
                  <span />
                  <span />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
