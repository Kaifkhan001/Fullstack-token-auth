/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import Popup from "@/components/popup";
import useAuthStore from "./Store";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {isLoggedIn} = useAuthStore();
  const [loginAgain, setLoginAgain] = useState(false);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get("/api/users/refreshAccessToken");
      if(response.data.ok){
        toast.success("Access Token refreshed Successfully");
        return;
      } 
      else{
        setLoginAgain(true);
        toast.error("Error refreshing access token");
        return;
      }
    } catch (error) {
      console.log("Error refreshing access Token", error);
      setLoginAgain(true);
      return;
    }
  }
  const checkTokenExpiration = async () => {
    try {
      const response = await axios.get("/api/users/verifyToken");
      if(response.data.isExpired){
        refreshAccessToken();
      }
    } catch (error) {
      console.log("Token exiration checking failed", error);
      return;
    }
  }
   useEffect(() => {
    let interval;
     if(isLoggedIn){
      interval = setInterval(checkTokenExpiration, 2 * 60 * 1000);
     }else{
      clearInterval(interval);
     }
     if(loginAgain){
      clearInterval(interval);
     }
   
     return () => clearInterval(interval);
   }, [isLoggedIn, loginAgain]);
   
  return (
    <AuthContext.Provider value={{ loginAgain, setLoginAgain }}>
      {children}

      {/* Popup */}
      {loginAgain && <Popup/>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
