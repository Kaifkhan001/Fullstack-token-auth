/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Meteors from "@/components/ui/meteors";
import React, { useState } from "react";
import ShimmerButton from "@/components/ui/shimmer-button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SingUp() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.username.trim().length == 0 || user.email.trim().length <= 0 || user.password.trim().length <= 0 ){
      console.log("Fill each field first");
      toast.error("Fill each field first");
      return;
    }
    if(user.password != user.confirmPass){
      console.log("Password isn't matching");
      toast.error("Passwrod isn't matching");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
        console.log("Sign-up Successfull");
        toast.success("Sign-up Successfull");
        router.push("/about");
    } catch (error: any) {
      if (error.status === 409 || error.status === 500) {
        console.log("Sign-up Failed");
        toast.error("Sign-up Failed");
      }
      console.log("Error while Signing-Up the user", error);
      toast.error("Sign-Up Failed");
    } finally{
       setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100vh] bg-black py-[15%]  w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl sm:mb-3 mb-12 font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Sign-Up
      </span>
      <div className="login w-[80%] sm:w-[30%] sm:h-[80%] py-12 border-2 border-gray-600 rounded-lg flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-4"
        >
          <input
            className="px-2 py-1 rounded-lg outline-none bg-transparent border-b-2 pb-3 text-white"
            type="text"
            placeholder="Username..."
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            className="px-2 py-1 rounded-lg outline-none bg-transparent border-b-2 pb-3 text-white"
            type="email"
            placeholder="Email..."
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="px-2 py-1 rounded-lg outline-none bg-transparent border-b-2 pb-3 text-white"
            type="password"
            placeholder="Password..."
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            className="px-2 py-1 rounded-lg outline-none bg-transparent border-b-2 pb-3 text-white"
            type="password"
            placeholder="Confirm Password..."
            value={user.confirmPass}
            onChange={(e) => setUser({ ...user, confirmPass: e.target.value })}
          />
          <button type="submit">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                <button className="processing-button" disabled={Loading}>
                  {Loading ? "Processing..." : "Submit"}
                </button>
              </span>
            </ShimmerButton>
          </button>
        </form>
      </div>
    </div>
  );
}
