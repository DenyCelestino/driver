"use client";

import Image from "next/image";
import LOGOWHITE from "../../../public/logo-white.svg";
import Link from "next/link";

export default function HeaderFree() {
  return (
    <div className="app-header">
      <div className={"logo logo-green"}>
        <Image src={LOGOWHITE} />
      </div>

      <Link href={"/signup"}>Signup/Login</Link>
    </div>
  );
}
