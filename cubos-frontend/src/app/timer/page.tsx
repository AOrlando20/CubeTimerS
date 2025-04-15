"use client"

import Sidebar from "@/app/components/Sidebar";
import { Onest, Inter } from "next/font/google";
import ScrambleCube3D from "./components/ScrambleCube3D";

import RubikIcon from "../../../public/rubik_icon.png"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrambleService } from "../../service/ScrambleService";

// import TOPOLOGY from "vanta/dist/vanta.topology.min";

const onest_600 = Onest({weight: '600'})
const onest_500 = Onest({weight: '500'})
const onest_300 = Onest({weight: '300'})

const inter_400 = Inter({weight: '400'})

const scrambleService = new ScrambleService();

const loadP5JS = () => import(/* webpackIgnore: true */ "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js");

interface UseTimerProps {
    delay: number,
    onTimerEndCallback: () => void,
}


const useTimer = ({ delay, onTimerEndCallback }: UseTimerProps): [number, boolean, boolean, boolean] => {
    const activateTimeoutKey = useRef<number>(-1);
    const timerIntervalKey = useRef<number>(-1);

    const isKeyPressed = useRef<boolean>(false);
    const isSpacePressedRef = useRef<boolean>(false);
    const [ isSpacePressed, setIsSpacePressed ] = useState<boolean>(false);

    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const previousDate = useRef<number>(0);

    const isTimerActiveRef = useRef<boolean>(false);
    const [ isTimerActive, setIsTimerActive ] = useState<boolean>(false);
    const isTimerRunningRef = useRef<boolean>(false);
    const [ isTimerRunning, setIsTimerRunning] = useState<boolean>(false);


    useEffect(() => {
        isTimerActiveRef.current = isTimerActive;
    }, [isTimerActive]);

    
    useEffect(() => {
        isTimerRunningRef.current = isTimerRunning;
    }, [isTimerRunning])


    useEffect(() => {
        isSpacePressedRef.current = isSpacePressed;
    }, [isSpacePressed])


    useLayoutEffect(() => {
        const keyDownHandler = (ev: KeyboardEvent) => { 
            if (isTimerRunningRef.current) {
                setIsTimerRunning(() => false);
                setIsTimerActive(() => false);
                
                isKeyPressed.current = true;
                window.clearInterval(timerIntervalKey.current ?? "");
                timerIntervalKey.current = -1;
                onTimerEndCallback();
            }

            if (isKeyPressed.current) { 
                isKeyPressed.current = false;
            }

            if (ev.key == " " && !isSpacePressedRef.current) {
                setIsSpacePressed(() => true);
                activateTimeoutKey.current = window.setTimeout(() => {
                    setIsTimerActive(() => true);
                    setCurrentTime(() => 0.0);
                }, delay);
            }
        };

        const keyUpHandler = (ev: KeyboardEvent) => {
            if (isKeyPressed.current) { 
                isKeyPressed.current = false;
                return {};
            }

            if (ev.key == " ") {
                setIsSpacePressed(() => false);
                if (isTimerActiveRef.current) {
                    setIsTimerRunning(() => true);
                    previousDate.current = Date.now(); 
                    timerIntervalKey.current = window.setInterval(() => {
                        const now = Date.now();
                        const delta = now - previousDate.current;
                        console.log()
                        setCurrentTime((time) => time + (delta / 1000.0));
                        previousDate.current = now;
                    }, 10);
                } else {
                    window.clearTimeout(activateTimeoutKey.current ?? "");
                }
                activateTimeoutKey.current = -1;
            }
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        }
    }, []) 

    return [ currentTime, isTimerActive, isTimerRunning, isSpacePressed ]
}


const useBackgroundLoader = ({ bgRef }) => {
    const [vantaEffect, setVantaEffect] = useState(0);

    useEffect(() => {
        const asyncBackground = async () => {
            await import(/* webpackIgnore: true */ "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js");
            const { default: TOPOLOGY } = await import("vanta/dist/vanta.topology.min");
            if (!vantaEffect) {
                loadP5JS().then(() => {
                    setVantaEffect(
                        TOPOLOGY({
                            el: bgRef.current,
                            touchControls: false,
                            gyroControls: false,
                            minHeight: 200.00,
                            minWidth: 200.00,
                            scale: 1.00,
                            scaleMobile: 1.00,
                            backgroundColor: 0x2222,
                            color: 0x89964e,
                    }));
                });
            }
        }

        asyncBackground();
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        }
    }, [vantaEffect]);

    return [ vantaEffect ]
}


export default function Timer() {
    const isScrambleLoaded = useRef<boolean>(false);
    const bgRef = useRef(null);

    const [ scramble, setScramble ] = useState<string>("");
    const [ scrambleType, setScrambleType ] = useState<string>("333");

    const [ ] = useBackgroundLoader({ bgRef });


    const GenerateNewScramble = async (scramble_type: string) => {
        const genScramble = await scrambleService.Generate(scramble_type) ?? "";
        setScramble(() => genScramble);
    }


    const [ currentTime, isTimerActive, isTimerRunning, isSpacePressed ] = useTimer({ delay: 750, onTimerEndCallback: () => {
        GenerateNewScramble(scrambleType);
    } });

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
    }, []);


    useEffect(() => {
        if (!isTimerRunning) {
            const generateScrambleFunc = async () => {
                const genScramble = await scrambleService.Generate(scrambleType) ?? "";
                setScramble(() => genScramble);
            }
            generateScrambleFunc();
        }
    }, [isTimerRunning]);


    return (
    <div ref={bgRef} className={"flex flex-col text-white bg-[#002222]"}>
        <div className="relative w-0 h-0"></div>
        <ScrambleCube3D hide={isTimerActive} scramble={scramble} />
        <aside hidden={isTimerActive} id="left-sidebar" className={"flex flex-col w-[30%] h-[100vh] float-left fixed"}>
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
            <div hidden={isTimerActive} className={"bg-[#495D6A] px-5 py-[2.8rem] shadow-xl"}>
                <h2 className={"text-center tracking-[3] text-[2.5rem] text-wrap"}>{scramble}</h2>
            </div>
            <div hidden={isTimerActive} className="bg-transparent w-full">
                <div className={"flex gap-8 items-center justify-end float-right w-[80%] bg-[#36454F] min-w-fit px-8 rounded-bl-xl border-b-4 border-l-4 shadow-lg py-2"}>
                    <span className={`${onest_500.className} text-xl`}>Tipo de Cubo</span>
                    <select 
                        name="cubeSelect" 
                        className={"pr-2 pl-4 py-1 bg-[#D9D9D9] text-black text-xl rounded-md"}
                        onChange={async (e) => {
                            const newScrambleType = e.target.value;
                            setScrambleType(() => newScrambleType);
                            await GenerateNewScramble(newScrambleType);
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
            <div className={"flex flex-col w-[100%] grow-1 items-center justify-center text-center p-5 text-white"}>
                <div>
                    <p hidden={isTimerActive} className={`text-[2.5em]  ${inter_400.className} mb-8`}>Solve 15</p>
                    <p className={`text-[20em] ${isSpacePressed ? "text-green-700" : ""} ${inter_400.className} leading-[0.9em]`}>{currentTime.toFixed(2)}</p>
                    <p hidden={isTimerActive} className={` text-[3em] ${inter_400.className} mt-10`}>Ao.5: 16.00 <br/> Ao.12: 18.00</p>
                </div>
            </div>
        </div>
    </div>)
}