"use client";

import Header from "@/components/App/Dashboard/Header";
import Anchor from "@/components/Universal/Anchor/anchor";
import Input from "@/components/Universal/Inputs/input";
import { ContextUser } from "@/context/ContextUser";
import PrivateRoutes from "@/functions/PrivateRoutes";
import Cookies from "js-cookie";
import {
  CheckCheckIcon,
  LockIcon,
  PencilLine,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DotLoader } from "react-spinners";
import PERSON from "../../../../public/person.png";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "@/context/Context";
import BackgroundCheck from "@/functions/BackgroundCheck";

export default function Profile() {
  const { bypass, user, setCookies } = ContextUser();
  const { ENDPOINT } = useMyContext();

  const [name, setName] = useState(user.name ? user.name : "");
  const [number, setNumber] = useState(user.number ? user.number : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [isNameLock, setNameLock] = useState(true);
  const [isNumberLock, setNumberLock] = useState(true);
  const [isEmaiLock, setEmaiLock] = useState(true);
  const [isPasswordLock, setPasswordLock] = useState(true);

  const fileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      // Lê o arquivo para exibir a prévia
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    // Aciona o clique no input de arquivo
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const avatar = async () => {
    const formData = new FormData();

    formData.append("file", image);

    const jsonData = {
      email: user.email,
      oldavatar: user.avatar,
    };

    formData.append("json_data", JSON.stringify(jsonData));

    try {
      setLoading(true);
      let res = await axios.post(`${ENDPOINT}avatar.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log(res.data);
      if (res.data.status == 200) {
        const userLogged = JSON.stringify(res.data.user);
        setCookies(userLogged);
        setImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const information = async (e) => {
    e.preventDefault();

    if (user.isgoogle != 1) {
      if (password.length > 0 && password.length < 8) {
        toast.error("A senha precisa ter no mínimo 8 caracteres");
      } else if (password != confirmPassword) {
        toast.error("As senhas devem ser iguais");
      } else {
        try {
          setLoading(true);

          let res = await axios.post(
            `${ENDPOINT}changes.php`,
            JSON.stringify({
              name: name,
              number: number,
              email: email,
              password: password,
            })
          );
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 200) {
            const userLogged = JSON.stringify(res.data.user);
            setCookies(userLogged);
            setNameLock(true);
            setEmaiLock(true);
            setNumberLock(true);
            setPasswordLock(true);
            setPassword("");
            setPasswordConfirm("");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          setLoading(false);
        }
      }
    } else {
      try {
        setLoading(true);

        let res = await axios.post(
          `${ENDPOINT}changes.php`,
          JSON.stringify({
            name: name,
            number: number,
            email: email,
          })
        );
        setLoading(false);
        console.log(res.data);
        if (res.data.status == 200) {
          toast.success(res.data.message);
          const userLogged = JSON.stringify(res.data.user);
          setCookies(userLogged);
          setNameLock(true);
          setEmaiLock(true);
          setNumberLock(true);
          setPasswordLock(true);
          setPassword("");
          setPasswordConfirm("");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <BackgroundCheck>
      <div className="profile">
        <div className="wrapper">
          <Header App={true} time={bypass} />

          <div className="avatar-container">
            <div className="avatar">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleFileChange}
                ref={fileInput}
                style={{ display: "none" }} // Esconder o input, pois será acionado pelo botão
              />
              {imagePreview ? (
                <Image
                  onClick={handleClick}
                  src={imagePreview}
                  height={100}
                  width={100}
                  alt="avatar"
                />
              ) : (
                <>
                  {user.avatar ? (
                    <img src={ENDPOINT + "images/avatar/" + user.avatar} />
                  ) : (
                    <Image
                      src={PERSON}
                      height={100}
                      width={100}
                      alt="avatar"
                      priority
                    />
                  )}
                </>
              )}

              {image ? (
                <button
                  disabled={isLoading}
                  onClick={avatar}
                  className="avatar-edit"
                >
                  {isLoading ? (
                    <DotLoader size={15} color="#FFF" />
                  ) : (
                    <UploadCloud />
                  )}
                </button>
              ) : (
                <button onClick={handleClick} className="avatar-edit">
                  <PencilLine />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={(e) => information(e)} className="fill-container">
            <div className="profile-inputs">
              <span>Nome</span>
              <div className={!isNameLock ? "input active" : "input"}>
                <input
                  disabled={isNameLock}
                  placeholder="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                {!isNameLock ? (
                  <button disabled={isLoading} onClick={information}>
                    <CheckCheckIcon />
                  </button>
                ) : (
                  <PencilLine onClick={() => setNameLock(!isNameLock)} />
                )}
              </div>
            </div>
            <div className="profile-inputs">
              <span>Telefone</span>
              <div className={!isNumberLock ? "input active" : "input"}>
                <input
                  disabled={isNumberLock}
                  placeholder="+258 XX XX XX"
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                />
                {!isNumberLock ? (
                  <button disabled={isLoading} onClick={information}>
                    <CheckCheckIcon />
                  </button>
                ) : (
                  <PencilLine onClick={() => setNumberLock(!isNumberLock)} />
                )}
              </div>
            </div>
            <div className="profile-inputs">
              <span>Email</span>
              <div className={!isEmaiLock ? "input active" : "input"}>
                <input
                  disabled={isEmaiLock}
                  placeholder="example@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <LockIcon />
              </div>
            </div>

            {user.isgoogle != 1 && (
              <>
                <div className="profile-inputs">
                  <span>Password</span>
                  <div className={!isPasswordLock ? "input active" : "input"}>
                    <input
                      disabled={isPasswordLock}
                      placeholder="Digite sua password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    {!isPasswordLock ? (
                      <button disabled={isLoading} onClick={information}>
                        <CheckCheckIcon />
                      </button>
                    ) : (
                      <PencilLine
                        onClick={() => setPasswordLock(!isPasswordLock)}
                      />
                    )}
                  </div>
                </div>
                <div className="profile-inputs">
                  <span>Confirmar Password</span>
                  <div className="input">
                    <input
                      disabled={isPasswordLock}
                      placeholder="Digite novamente sua password"
                      type="password"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={confirmPassword}
                    />
                    {!isPasswordLock ? (
                      <button disabled={isLoading} onClick={information}>
                        <CheckCheckIcon />
                      </button>
                    ) : (
                      <PencilLine
                        onClick={() => setPasswordLock(!isPasswordLock)}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="profile-button-container">
              <button disabled={isLoading}>
                {isLoading ? <DotLoader size={20} color="#FFF" /> : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </BackgroundCheck>
  );
}
