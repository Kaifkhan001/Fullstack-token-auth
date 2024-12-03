"use client"

import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/helpers/Store';

const Logout = () => {   
  const {setIsLoggedIn} = useAuthStore();
    const router = useRouter();
    useEffect(() => {
        const logoutUser = async () => {
            try {
              await axios.get("/api/users/logout");
              toast.success("Logged out successfully");
              setIsLoggedIn(false);
              router.push("/login");
            } catch (error) {
              console.log("Error logging out user", error);
              toast.error("Error Logout");
              setIsLoggedIn(true)
              return;
            }
        }

        logoutUser();
    }, []); 
  return (
    <div className='w-full h-[70vh] flex items-center justify-center text-white text-3xl '>
      You have been successfully logged out
    </div>
  )
}

export default Logout
