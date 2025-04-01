'use client'

import { useRouter } from "next/navigation";
import Cube3D from "./components/Cube3D";

export default function Home() {
  const router = useRouter();

  return (
    <div className={"flex items-center text-center justify-center flex-col min-h-[100vh] gap-6 m-auto"}>
      <h1 className={"text-5xl font-bold"}>XDPerm</h1>
      <p>Timer de cubos todo en uno.</p>
      <button className={"outline-2 outline-amber-100 text-slate-200 px-6 py-1 rounded-lg hover:bg-gray-600 hover:text-gray-200"} onClick={() => router.push("/timer")}>Entrar</button>
      <Cube3D className={"w-[10rem] h-[10rem]"}/>
    </div>
  );
}
