"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";
import WordPullUp from '@/components/ui/word-pull-up.tsx';
import { CiSearch } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import axios from 'axios';
import useAuthStore from '../helpers/Store.js';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useAuthStore();
  useEffect(() => {
    const verifyUser = async() => {
      try {
        await axios.get("/api/users/verifyUser");
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log("Error verifying User", error);
        toast.error("Error verifying User");
        return;
      }
    }

  verifyUser();
  }, [isLoggedIn, setIsLoggedIn]);
  

  const handleClick = () => {
   setToggleMenu(!toggleMenu);
  }
   
  return (
    <nav className="flex fixed top-0 left-0 right-0 z-50  h-auto w-full  px-4  items-center justify-between bg-black bg-opacity-50">
      <Image src={"/images/logo.png"} alt="logo" width={120} height={120} />

      <div className="icon absolute text-white sm:hidden flex right-[15%] top-[50%] -translate-y-[50%]">
        <button onClick={handleClick}>
          <IoMdMenu style={{ width: "30px", height: "30px" }} />
        </button>
      </div>

      <ul
        className="navigate text-white hidden sm:flex  gap-6  pr-12 itemx
       justify-center items-center"
      >
        <Link href="/">
          <WordPullUp
            className="text-l font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
            words="HOME"
          />
        </Link>
        {isLoggedIn ? (
          <Link href={"/dashboard"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="DASHBOARD"
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="LOGIN"
            />
          </Link>
        )}
        {isLoggedIn ? (
          <Link href={"/profile"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="PROFILE"
            />
          </Link>
        ) : (
          <Link href={"/signup"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="SIGNUP"
            />
          </Link>
        )}
        {isLoggedIn ? (
          <Link href={"/about"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="ABOUT"
            />
          </Link>
        ) : (
          <Link href={"/contact"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="CONTACT"
            />
          </Link>
        )}
        {isLoggedIn ? (
          <Link href={"/logout"}>
            <WordPullUp
              className="text-xl font-bold tracking-[-0.02em] text-white dark:text-white md:text-xl md:leading-[5rem]"
              words="LOGOUT"
            />
          </Link>
        ) : (
          ""
        )}
        <CiSearch
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
        />
      </ul>
      {/* menu bar */}
      <div
        className={`absolute z-50 top-0 right-0 sm:hidden bg-black bg-opacity-100 w-[55%] pt-8  flex-col items-center ${
          toggleMenu ? "flex" : "hidden"
        } `}
      >
        <div className="head flex items-center justify-end w-full px-6">
          <ImCross color="white" onClick={handleClick} />
        </div>
        <h2 className="py-4 text-white text-3xl">Menu</h2>
        <Link
          onClick={handleClick}
          href={"/"}
          className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
        >
          Home
        </Link>
        {isLoggedIn ? (
          <Link
            onClick={handleClick}
            href={"/dashboard"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            onClick={handleClick}
            href={"/login"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Login
          </Link>
        )}
        {isLoggedIn ? (
          <Link
            onClick={handleClick}
            href={"/profile"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Profile
          </Link>
        ) : (
          <Link
            onClick={handleClick}
            href={"/signup"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Sign-Up
          </Link>
        )}
        {isLoggedIn ? (
          <Link
            onClick={handleClick}
            href={"/about"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            About-Us
          </Link>
        ) : (
          <Link
            onClick={handleClick}
            href={"/contact"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Contact-Us
          </Link>
        )}
        {isLoggedIn ? (
          <Link
            onClick={handleClick}
            href={"/logout"}
            className="w-full bg-transparent text-center py-3 hover:bg-gray-600 text-white border-b-2 border-gray-700"
          >
            Log-out
          </Link>
        ) : (
          ""
        )}
        <marquee
          behavior="infinte"
          direction="left"
          className="w-full bg-gray-700 mt-16 mb-4 text-white"
        >
          &copy; 2024 creativeMind. All rights reserved. Unauthorized
          duplication, distribution, or use of any content without explicit
          permission is strictly prohibited.
        </marquee>
      </div>
    </nav>
  );
}

export default Navbar


