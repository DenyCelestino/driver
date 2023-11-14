"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <span>
        Copyright 2023 | Produto de
        <Link href={"https://growskills.nl"}>Growskills</Link> |{" "}
        <Link href={"mailto:info.trafegotop.app"}>info@trafegotop.app</Link>
      </span>
    </footer>
  );
}
