'use client'

import { useRouter } from "next/navigation";
import Cube3D from "./components/Cube3D";
import { Onest } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import NET from 'vanta/dist/vanta.net.min'

const onest_800 = Onest({weight: '800'})
const onest_400 = Onest({weight: '300'})

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const bgRef = useRef(null);

  useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(NET({
          el: bgRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x535353,
          backgroundColor: 0x11223,
          points: 9.00,
          maxDistance: 21.00,
          spacing: 14.00
        }))
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      }
  }, [vantaEffect])

  const router = useRouter();

  return (
    <div ref={bgRef} className={"flex items-center text-center justify-center flex-col min-h-[100vh] gap-6 m-auto text-white"}>
      <h1 className={`text-5xl font-bold ${onest_800.className}`}>XDPerm</h1>
      <p className={`${onest_400.className}`}>Timer de cubos todo en uno.</p>
      <button 
        className={`outline-2 dark:text-slate-200 text-slate-950 bg-gray-800 outline-gray-600 px-6 py-1 rounded-lg hover:bg-gray-600 hover:underline hover:underline-offset-4 ${onest_400.className}`} 
        onClick={() => router.push("/timer")}>
        Entrar
      </button>
      <Cube3D className={"w-[10rem] h-[10rem]"}/>
    </div>
  );
}
