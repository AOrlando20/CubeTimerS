"use client"
import Sidebar from "@/app/components/Sidebar";
import { Onest, Inter } from "next/font/google";
import ScrambleCube3D from "./components/ScrambleCube3D";

import RubikIcon from "../../../public/rubik_icon.png"
import { useEffect, useContext, useState } from "react";
import { AppElements, AppContext, AppElementsState } from "@/context/contexts";
import { ScrambleService } from "../../service/ScrambleService";

const onest_600 = Onest({weight: '600'})
const onest_500 = Onest({weight: '500'})
const onest_300 = Onest({weight: '300'})

const inter_400 = Inter({weight: '400'})

export default function Timer() {
    const { appElements, setAppElements } = useContext<AppElementsState>(AppContext);
    const [ scrambleServiceLoaded, setScrambleServiceLoaded ] = useState<boolean>(false);
    const [ scrambleType, setScrambleType ] = useState<string>("333");

    useEffect(() => {
        const loadScrambleService = async () => {
            await ScrambleService.Initialize();
            setScrambleServiceLoaded(true);
        }
        loadScrambleService();
    }, [])

    /* se puede implementar con useeffect */
    const OnCubeTypeChange = async (e) => {
        setScrambleType(e.target.value);
        const scramble = await ScrambleService.Generate(e.target.value);
                        setAppElements({
                            ...appElements,
                            scramblebar_text: scramble,
                            scramble: scramble,
        });
    }


    return (
    <div className={"flex flex-col text-white"}>
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
            <Sidebar></Sidebar>
        </aside>
        <div className={"ml-[30%]"}>
            <div className={"bg-[#495D6A] px-5 py-[2.8rem] shadow-xl"}>
                <h2 className={"text-center tracking-[3] text-[2.5rem] text-wrap"}>{appElements?.scramblebar_text ?? "xd"}</h2>
            </div>
            <div className={"flex gap-8 items-center justify-end float-right bg-[#36454F] min-w-fit px-8 rounded-bl-xl border-b-4 border-l-4 shadow-lg py-2"}>
                <span className={`${onest_500.className} text-xl`}>Tipo de Cubo</span>
                <select 
                    name="cubeSelect" 
                    className={"pr-2 pl-4 py-1 bg-[#D9D9D9] text-black text-xl rounded-md"}
                    onChange={OnCubeTypeChange}>
                    <option className={"text-slate-950"} value={"222"}>2x2x2</option>
                    <option className={"text-slate-950"} value={"333"} selected={true}>3x3x3</option>
                    <option className={"text-slate-950"} value={"444"}>4x4x4</option>
                </select>
                <button className={`bg-[#28353D] p-2 px-6 rounded-xl ${onest_500.className} text-lg`}>Anterior</button>
                <button 
                    disabled={!scrambleServiceLoaded}
                    className={`bg-[#28353D] p-2 px-6 rounded-xl ${onest_500.className} text-lg disabled:bg-slate-950`}
                    onClick={async () => 
                    {  
                        const scramble = await ScrambleService.Generate(scrambleType);
                        console.log(scramble);
                        setAppElements({
                            ...appElements,
                            scramblebar_text: scramble,
                            scramble: scramble,
                        })
                    }
                    }>Nuevo</button>
            </div>
            <div className={"flex flex-col h-[full] w-[100%] align-middle text-center"}>
                <h3 className={`text-5xl text-black ${inter_400.className}`}>Solve 15</h3>
                <h1 className={`text-8xl text-black font-bold ${inter_400.className}`}>13.45</h1>
                <div className={`text-black ${inter_400.className}`}>Ao.5: 16.00</div>
                <div className={`text-black ${inter_400.className}`}>Ao.12: 18.00</div>
            </div>
            <div className="h-[10rem]">
                <ScrambleCube3D/>
            </div>
        </div>
    </div>)
}