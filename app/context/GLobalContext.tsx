"use client"
import { useEffect, createContext, useState } from "react";
import { AxiosInstance } from "../(repositories)/config";
import { getUserFromToken } from "../utils/strapi";

export const GlobalContext = createContext(
  { currentUser: {} } as { currentUser: any }
);

export const GlobalContextProvider = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState("pending");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const tokenExist = localStorage.getItem("accessToken");
        console.log(tokenExist,"tokenExist")

        if (tokenExist) {
          
          const res = await getUserFromToken(tokenExist)
          console.log(res,"currentUSer availabel")
          res && setCurrentUser(res.data);
        }

 
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  console.log(currentUser);

  return <GlobalContext.Provider value={{ currentUser }}>{children}</GlobalContext.Provider>;
};