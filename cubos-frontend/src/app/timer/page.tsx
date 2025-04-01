import Sidebar from "@/app/components/Sidebar";
import { Onest } from "next/font/google";
import Cube3D from "../components/Cube3D";

const onest_600 = Onest({weight: '600'})
const onest_300 = Onest({weight: '300'})

export default function Timer() {
    return (
    <div className={"flex flex-col"}>
        <aside id="left-sidebar" className={"flex flex-col w-[30%] h-[100vh] float-left fixed"}>
            <div className={`h-auto py-2  bg-[#36454F] flex justify-center items-center text-[4rem] ${onest_600.className}`}>
                <h3 className={`${onest_600.className}`}>XD_perm</h3>
            </div>
            <div className={"left-0 top-0 w-[100%] py-4 bg-[#2D3840] flex flex-row flex-wrap place-content-evenly gap-7 relative rounded-br-[1.5rem] px-5"}>
                <span className={"material-symbols-outlined"}>
                timer
                </span>
                <span>
                cube
                </span>
                <span className={"material-symbols-outlined"}>
                    analytics
                </span>
                <div className={"w-20 justify-center text-center"}>
                    <h3 className={`${onest_300.className}`}>Timer</h3>
                </div>
            </div>
            <Sidebar></Sidebar>
        </aside>
        <div className={"ml-[30%]"}>
            <div className={"bg-[#495D6A] px-5 py-[2.8rem]"}>
                <h2 className={"text-center"}>R2 F D2 U2 B L2 B' L2 B U2 B2 R2 L U R' B' D' R2 F U2 R</h2>
            </div>
            <Cube3D/>
        </div>
    </div>)
}