import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import LOGOLANDING from "../../../public/logo-landing.jpg";
import LOGOAPP from "../../../public/logo-white.svg";
import Image from "next/image";
export default function Header() {
  return (
    <header className="header">
      <Link className="logo-landing-desktop" href={"/"}>
        <Image src={LOGOLANDING} alt="logo" />
      </Link>
      <Link className="logo-landing-mobile" href={"/"}>
        <Image src={LOGOAPP} alt="logo" />
      </Link>

      <div className="header-buttons">
        <div className="login-button">
          <FaUserCircle className="login-icon" />

          <Link href={"/login"}>Login</Link>
        </div>

        <Link className="btn btn-orange" href={"/free"}>
          COMEÇAR
        </Link>
      </div>
    </header>
  );
}
