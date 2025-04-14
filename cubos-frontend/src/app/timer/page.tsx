"use client"
import Sidebar from "@/app/components/Sidebar";
import { Onest, Inter } from "next/font/google";
import ScrambleCube3D from "./components/ScrambleCube3D";

import RubikIcon from "../../../public/rubik_icon.png"
import { useEffect, useRef, useState } from "react";
import { ScrambleService } from "../../service/ScrambleService";

const onest_600 = Onest({weight: '600'})
const onest_500 = Onest({weight: '500'})
const onest_300 = Onest({weight: '300'})

const inter_400 = Inter({weight: '400'})

const scrambleService = new ScrambleService();

export default function Timer() {
    const [ scramble, setScramble ] = useState<string>("");
    const [ scrambleType, setScrambleType ] = useState<string>("333");
    const isScrambleLoaded = useRef<boolean>(false);

    useEffect(() => {
        const loadScrambleService = async () => {
            await scrambleService.Load();
            const scramble = await scrambleService.Generate(scrambleType) ?? "";
            setScramble(() => scramble);
        }
        if (!isScrambleLoaded.current) {
            loadScrambleService();
            isScrambleLoaded.current = true;
        }
    }, [])


    const GenerateNewScramble = async () => {
        const genScramble = await scrambleService.Generate(scrambleType) ?? "";
        setScramble(() => genScramble);
    }


    return (
    <div className={"flex flex-col text-white"}>
        <ScrambleCube3D scramble={scramble} />
        <aside id="left-sidebar" className={"flex flex-col w-[30%] h-[100vh] float-left fixed"}>
            <div className={`h-auto py-2  bg-[#36454F] flex justify-center items-center text-[4rem] ${onest_600.className}`}>
                <h3 className={`${onest_600.className}`}>XD_perm</h3>
            </div>
            <div className={"left-0 top-0 w-[100%] py-4 bg-[#2D3840] flex flex-row flex-wrap items-center place-content-evenly gap-12 relative rounded-br-[1.5rem] px-5"}>
                <span className={"material-symbols-outlined"}>
                timer
                </span>
                <img src={RubikIcon.src} alt="algoritmos" className={"h-auto w-5"} />
                <span className={"material-symbols-outlined"}>
                    analytics
                </span>
                <div className={"w-20 text-center"}>
                    <h3 className={`${onest_300.className}`}>Timer</h3>
                </div>
            </div>
            <Sidebar />
        </aside>
        <div className={"ml-[30%] h-[100vh] flex flex-col"}>
            <div className={"bg-[#495D6A] px-5 py-[2.8rem] shadow-xl"}>
                <h2 className={"text-center tracking-[3] text-[2.5rem] text-wrap"}>{scramble}</h2>
            </div>
            <div className="bg-transparent w-full">
                <div className={"flex gap-8 items-center justify-end float-right w-[80%] bg-[#36454F] min-w-fit px-8 rounded-bl-xl border-b-4 border-l-4 shadow-lg py-2"}>
                    <span className={`${onest_500.className} text-xl`}>Tipo de Cubo</span>
                    <select 
                        name="cubeSelect" 
                        className={"pr-2 pl-4 py-1 bg-[#D9D9D9] text-black text-xl rounded-md"}
                        onChange={async (e) => {
                            setScrambleType(() => e.target.value);
                            await GenerateNewScramble();
                        }}
                        defaultValue={"333"}>
                        <option className={"text-slate-950"} value={"222"}>2x2x2</option>
                        <option className={"text-slate-950"} value={"333"}>3x3x3</option>
                        <option className={"text-slate-950"} value={"444"}>4x4x4</option>
                    </select>
                    <button className={`bg-[#28353D] p-2 px-6 rounded-xl ${onest_500.className} text-lg`}>Anterior</button>
                    <button 
                        disabled={!isScrambleLoaded.current}
                        className={`bg-[#28353D] p-2 px-6 rounded-xl ${onest_500.className} text-lg disabled:bg-slate-950`}
                        onClick={GenerateNewScramble}>Nuevo</button>
                </div>
            </div>
            <div className={"flex flex-col w-[100%] grow-1 items-center justify-center text-center p-5"}>
                <div>
                    <p className={`text-[2.5em] text-black ${inter_400.className} mb-8`}>Solve 15</p>
                    <p className={`text-[20em] text-black ${inter_400.className} leading-[0.9em]`}>13.45</p>
                    <p className={`text-black text-[3em] ${inter_400.className} mt-10`}>Ao.5: 16.00 <br/> Ao.12: 18.00</p>
                </div>
            </div>
        </div>
    </div>)
}