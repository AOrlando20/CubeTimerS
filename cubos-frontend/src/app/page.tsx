'use client'

import { useRouter } from "next/navigation";
import Cube3D from "./components/Cube3D";
import { Onest } from "next/font/google";

import { useEffect, useRef, useState } from "react";

const onest_800 = Onest({weight: '800'})
const onest_400 = Onest({weight: '300'})

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const bgRef = useRef(null);

  useEffect(() => {
    const asyncVanta = async () => {
      await import(/* webpackIgnore: true */ "https://cdnjs.cloudflare.com/ajax/libs/three.js/r132/three.min.js");
      const { default: NET } = await import("vanta/dist/vanta.net.min");

      if (!vantaEffect) {
        setVantaEffect(
          NET({
            el: bgRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xc000ff,
            backgroundColor: 0x11a28
          })
        )
      }
    }
    asyncVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect])

  const router = useRouter();

  return (
    <div ref={bgRef} className={"flex items-center text-center justify-center flex-col min-h-[100vh] gap-6 m-auto text-white bg-[#011a28]"}>
      <h1 className={`text-5xl font-bold ${onest_800.className}`}>XDPerm</h1>
      <p className={`${onest_400.className}`}>Timer de cubos todo en uno.</p>
      <button 
        className={`outline-2 dark:text-slate-200 text-slate-950 bg-gray-800 outline-gray-600 px-6 py-1 rounded-lg hover:bg-gray-600 hover:underline hover:underline-offset-4 ${onest_400.className}`} 
        onClick={() => router.push("/timer")}>
        Entrar
      </button>
      <Cube3D className={"w-[20rem] h-[20rem]"}/>
    </div>
  );
}
