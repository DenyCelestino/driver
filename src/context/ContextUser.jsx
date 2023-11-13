"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMyContext } from "./Context";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [bypass, setBypass] = useState("");
  const [hamburguer, setHamburguer] = useState(false);
  const [isLoadingCheckPlan, setLoadingCheckPlan] = useState(false);

  const router = useRouter();

  const getUser = () => {
    if (Cookies.get("user")) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  };

  const logout = () => {
    setHamburguer(false);
    Cookies.remove("user");
    Cookies.remove("logged");
    router.push("/login");
    setUser("");
  };
  const setCookies = (user) => {
    Cookies.set("user", user, {
      expires: 30,
    });
    Cookies.set("logged", true);
    getUser();
  };

  const areCookiesValid = () => {
    if (Cookies.get("logged")) {
      const userData = Cookies.get("user");
      if (!userData) {
        toast("Sua sessão expirou");
        Cookies.remove("logged");
        setUser("");
      } else {
        setUser(JSON.parse(userData));
      }
    }
  };

  useEffect(() => {
    getUser();
    areCookiesValid();
    const intervalId = setInterval(areCookiesValid, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        setCookies,
        getUser,
        bypass,
        setBypass,
        logout,
        hamburguer,
        setHamburguer,
        isLoadingCheckPlan,
        setLoadingCheckPlan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const ContextUser = () => useContext(UserContext);
