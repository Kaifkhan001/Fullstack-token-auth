/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Particles from "@/components/ui/particles";
import ShimmerButton from "@/components/ui/shimmer-button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthStore from "@/helpers/Store";

export default function Login() {
  const router = useRouter();
  
  const { setIsLoggedIn } = useAuthStore();
 const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password != user.confirmPass) {
      console.log("Password isn't matching");
      toast.error("Password Isn't matching");
      return;
    }
    try {
      setLoading(true);
       await axios.post("/api/users/login", user);
        console.log("User logged-In successfully.");
        toast.success("User Logged-In");
        setIsLoggedIn(true);
        router.push("/dashboard");
    } catch (error: any) {
       if (error.status === 404) {
         console.log("User doesn't exists!!");
         toast.error("User doesn't exists!!");
         setIsLoggedIn(false);
         return;
       } else if (error.status === 401) {
         console.log("Invalid user credentials");
         toast.error("Invalid user credentials!!");
         setIsLoggedIn(false);
         return;
       } else if (error.status === 400) {
         console.log("Something went wrong");
         toast.error("Something went wrong");
         setIsLoggedIn(false);
         return;
       }
      console.log("Error while logging user", error);
      toast.error("Login failed");
      setIsLoggedIn(false);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100vh] pb-[15%] pt-[15%] bg-black w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl text-white">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent mb-4 sm:mb-2 dark:from-white dark:to-slate-900/10">
        Login
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <div className="box flex items-center justify-center border-2 border-gray-500 rounded-lg mt-3  w-[70%] sm:w-[30%] sm:h-[70%] py-12 ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-4  rounded-lg "
        >
          <input
            className="px-2 py-1 bg-transparent pb-2 outline-none border-b-[1px] rounded-lg border-gray-600 text-white"
            type="email"
            placeholder="Email..."
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="px-2 py-1 bg-transparent pb-2 outline-none border-b-[1px] rounded-lg border-gray-600 text-white"
            type="password"
            placeholder="Password..."
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            className="px-2 py-1 bg-transparent pb-2 outline-none border-b-[1px] rounded-lg border-gray-600 text-white"
            type="password"
            placeholder="Confrim Password..."
            value={user.confirmPass}
            onChange={(e) => setUser({ ...user, confirmPass: e.target.value })}
          />
          <button type="submit">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg gap-3">
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
