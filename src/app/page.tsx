"use client"

import React from "react";
import LetterPullup from "@/components/ui/letter-pullup";
import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import Link from "next/link";


const Home = () => {
  return (
    <div className="main">
      <div className="hero w-full min-h-[70vh]  mt-[30%] sm:mt-[12%] flex flex-col-reverse sm:flex-row">
        <div className="first sm:pt-8 pt-2 sm:w-1/2 w-full h-1/2 sm:h-full flex items-center justify-center flex-col">
          <h2>
            <LetterPullup
              className="text-yellow-600 text-5xl pb-4 sm:pb-0"
              words={"Subscribe Now "}
              delay={0.05}
            />
            <LetterPullup
              className="text-white"
              words={"to our newsletter"}
              delay={0.05}
            />
          </h2>
          <p className="text-white text-center mt-4 px-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            laboriosam qui non eos rem laborum aspernatur eius minima sunt
            similique, placeat maxime voluptatibus adipisci porro aliquid illum
            quasi pariatur nisi corporis asperiores veritatis nulla voluptas.
            Tenetur minima saepe pariatur impedit non provident fugiat obcaecati
            ea!
          </p>
          <Link href={"/login"}>
            <ShimmerButton className="my-8 text-white bg-black">
              Login
            </ShimmerButton>
          </Link>
        </div>
        <span className="relative  sm:w-1/2 w-full h-1/2 sm:h-full flex items-center justify-center">
          <svg
            id="sw-js-blob-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
          >
            <defs>
              <clipPath id="blobClip">
                <path
                  d="M17.9,-18C25,-15.5,33.6,-11.5,34.9,-5.9C36.2,-0.3,30.2,6.9,24.5,11.7C18.8,16.5,13.3,19,7.3,22C1.3,25,-5.1,28.4,-11.1,27.6C-17.1,26.7,-22.6,21.4,-28.4,14.8C-34.2,8.1,-40.3,-0.1,-40.6,-8.7C-40.8,-17.3,-35.3,-26.4,-27.6,-28.8C-19.8,-31.2,-9.9,-26.9,-2.2,-24.2C5.5,-21.6,10.9,-20.5,17.9,-18Z"
                  transform="translate(50 50)"
                />
              </clipPath>
            </defs>
            <image
              href="https://images.pexels.com/photos/12718984/pexels-photo-12718984.jpeg?auto=compress&cs=tinysrgb&w=600"
              width="100%"
              height="100%"
              clipPath="url(#blobClip)"
            />
          </svg>
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] -z-10"
            id="sw-js-blob-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
          >
            <defs>
              <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                <stop
                  id="stop1"
                  stopColor="rgba(249.661, 255, 0, 1)"
                  offset="0%"
                />
                <stop
                  id="stop2"
                  stopColor="rgba(255, 215.705, 0, 1)"
                  offset="100%"
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#sw-gradient)"
              d="M19.9,-27.7C27.6,-21.8,36.8,-18.4,39.7,-12.2C42.6,-6.1,39.3,2.8,34.7,9.5C30,16.2,24.1,20.6,18.2,24.2C12.2,27.7,6.1,30.3,-1.6,32.4C-9.2,34.6,-18.5,36.4,-24.3,32.8C-30.2,29.2,-32.7,20.3,-33.6,12.2C-34.5,4.1,-33.7,-3.3,-32.5,-11.7C-31.3,-20,-29.6,-29.2,-24.1,-35.7C-18.6,-42.3,-9.3,-46,-1.6,-43.8C6.1,-41.6,12.3,-33.5,19.9,-27.7Z"
              width="100%"
              height="100%"
              transform="translate(50 50)"
              strokeWidth="0"
            />
          </svg>
        </span>
      </div>

      <VelocityScroll
        text="Empowering Connections, Transforming Ideas, Building Your Digital Future."
        default_velocity={2}
        className="font-display text-center text-xl sm:text-5xl font-bold tracking-[-0.02em] text-white drop-shadow-sm dark:text-white  md:leading-[5rem]"
      />
      <div className="image my-10 mx-4 flex items-center justify-around rounded-xl overflow-hidden">
        <Image
          className="sm:w-72 sm:h-96 rounded-lg  sm:bg-cover"
          src={"/images/codIllus.png"}
          alt=""
          width={1920}
          height={1080}
        />
        <Image
          className="sm:w-72 hidden sm:flex sm:h-96 rounded-lg  sm:bg-cover"
          src={"/images/codIllus01.png"}
          alt=""
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default Home;


