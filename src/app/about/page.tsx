"use client"
import React from 'react'
import TypingAnimation from "@/components/ui/typing-animation";
import { AnimatedTestimonialsDemo } from '@/components/imageSlider';



const Page = () => {
  return (
    <div className="relative text-white pt-[35%] sm:py-[15%] w-full min-h-[20vh] sm:min-h-[70vh] flex items-center justify-center flex-col gap-8 px-4 py-10">
      <TypingAnimation
        className="text-3xl font-bold text-white "
        text="Hey! It's Me.. Kaif Khan 😊"
      />
      <AnimatedTestimonialsDemo />
    </div>
  );
}

export default Page
