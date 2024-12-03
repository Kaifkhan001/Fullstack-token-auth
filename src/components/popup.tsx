import React from 'react'
import { BorderBeam } from "@/components/ui/border-beam";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/helpers/user-auth';


const Popup = () => {
  const {setLoginAgain} = useAuth();
    const router = useRouter();
    const handleLogin = () => {
      setLoginAgain(false);
      router.push("/logout");
      return;
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex w-72 h-80  flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl border-white bg-black px-6  border">
        <span className="whitespace-pre-wrap text-white bg-clip-text text-center text-xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 py-16 flex items-center justify-center gap-6 flex-col">
          <h1>Your token has expired. Kindly log in again</h1>
        </span>
        <button onClick={handleLogin}>
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg cursor-pointer">
              Login again
            </span>
          </ShimmerButton>
        <BorderBeam size={250} duration={12} delay={9} />
        </button>
      </div>
    </div>
  );
}

export default Popup
