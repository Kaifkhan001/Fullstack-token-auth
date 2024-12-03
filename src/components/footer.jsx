import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";



const Footer = () => {
  return (
    <>
      <div className="w-full min-h-[10vh] sm:min-h-[35vh] flex items-center justify-around bg-gray-900 py-12 text-white px-8 flex-col sm:flex-row">
        <div className="first w-full sm:w-1/3 flex items-center sm:items-start justify-center flex-col gap-4">
          <Image src={"/images/logo.png"} alt="logo" width={120} height={120} />
          <h2 className="w-full text-center sm:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            quis doloribus debitis. Hic, architecto nisi iusto sequi
            reprehenderit voluptate corrupti.
          </h2>
        </div>
        <div className="second w-full sm:w-1/3 flex mt-12 sm:mt-2 items-center sm:items-start  justify-center flex-col px-12">
          <h3 className="text-2xl text-orange-600 mb-6">Navigation Links</h3>
          <Link className="underline pb-2 text-gray-500" href={"/"}>
            Home
          </Link>
          <Link className="underline pb-2 text-gray-500" href={"/login"}>
            Login
          </Link>
          <Link className="underline pb-2 text-gray-500" href={"/signup"}>
            Signup
          </Link>
          <Link className="underline pb-2 text-gray-500" href={"/about"}>
            About-us
          </Link>
        </div>
        <div className="third hidden sm:flex w-1/3 items-start justify-center flex-col gap-12">
          <h2 className="text-3xl text-orange-600">Socila Media Links</h2>
          <span className="flex items-center justify-center gap-8">
            <Link
              className="hover:scale-90"
              href={"https://www.instagram.com"}
            >
              <FaInstagramSquare className="w-10 h-10" />
            </Link>
            <Link className="hover:scale-90" href={"https://www.facebook.com"}>
              <FaFacebookSquare className="w-10 h-10" />
            </Link>
            <Link className="hover:scale-90" href={"https://www.twitter.com"}>
              <FaTwitter className="w-10 h-10" />
            </Link>
            <Link className="hover:scale-90" href={"https://www.linkedin.com"}>
              <FaLinkedin className="w-10 h-10" />
            </Link>
          </span>
        </div>
      </div>
      <marquee
        behavior="infinte"
        direction="left"
        className="text-white bg-gray-800 py-2 px-4"
      >
        &copy; 2024 creativeMind. All rights reserved. Unauthorized duplication,
        distribution, or use of any content without explicit permission is
        strictly prohibited.
      </marquee>
    </>
  );
}

export default Footer
