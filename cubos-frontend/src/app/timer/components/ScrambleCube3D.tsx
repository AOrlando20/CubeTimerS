"use client"

import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import { RefObject, useRef, useState } from "react";
import { TextureLoader, Vector3 } from "three";

import LogoPNG  from "../../../../public/rubic.png";
import { ScrambleService } from "@/service/ScrambleService";

import Image from 'next/image';

import { BsArrowsAngleContract } from "react-icons/bs";

const textureLoader = new TextureLoader();

enum DisplayMode {
    Mode2D, Mode3D
}


interface CubeProps {
    hidden: boolean,
    scrambleTexture?: string
}


interface Cube3DProps {
    hidden: boolean,
    scrambleTexture?: string,
    meshRef: RefObject<null>
}


const Cube2D = ({ hidden, scrambleTexture }: CubeProps) => {
    return (<img hidden={hidden} alt="2D_scramble" src={scrambleTexture} className={"aspect-auto w-[75%]"} />)
}


const Cube3D = ({ hidden, scrambleTexture, meshRef }: Cube3DProps) => {
    const gltf = useLoader(GLTFLoader, "/rubik_cube/rubik_v3.glb");

    const initialRotation = [Math.PI / 2, 0, Math.PI];
    const initialPos = new Vector3(0, 0, 0);
    const cameraPos = new Vector3(-6, 4, -6);
    
    const mesh1 = gltf.meshes["Cube_1"];
    const mesh2 = gltf.meshes["Cube_2"];

    return scrambleTexture && (
        <Canvas 
            hidden={hidden} 
                camera={{ 
                    position: cameraPos, 
                    scale: [1, 1, 1],
                    fov: 30, 
                    near: 1, 
                    far: 150, 
                    zoom: 1.5, 
                    }}>
            <mesh scale={[-1, 1, 1]} geometry={mesh1.geometry} material={mesh1.material} position={initialPos} rotation={initialRotation} />
            <mesh scale={[-1, 1, 1]} geometry={mesh2.geometry} material={mesh2.material} ref={meshRef} position={initialPos} rotation={initialRotation}/>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0, 0, 5]} color="white" />
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI * 2 - 0.001}/>
        </Canvas>
    )
}


interface ScrambleCube3DProps {
    scramble: string
}


export default function ScrambleCube3D({ scramble }: ScrambleCube3DProps) {
    const [ currentMode, setCurrentMode ] = useState<DisplayMode>(DisplayMode.Mode3D);
    const [ hideScramble, setHideScramble ] = useState<boolean>(true);
    const stickerMeshRef = useRef(null);
 
    let scrambleTexture = "";

    if (scramble !== undefined) {
        scrambleTexture = ScrambleService.generatePNGFromScramble(scramble) ?? "";

        if (stickerMeshRef.current !== null) {
            const loadedTexture = textureLoader.load(scrambleTexture);
            stickerMeshRef.current.material.map = loadedTexture; 
        }    
    }    

    return (
        <div className={`absolute right-0 bottom-0 flex justify-end h-fit w-[100%] mb-3 mr-3`}>
            <div onClick={() => setHideScramble(p => false)} hidden={!hideScramble} className="bg-slate-800 p-4 border-4 shadow-2xl rounded-3xl w-[5.5%] aspect-square hover:cursor-pointer">
                <Image src={LogoPNG} alt={["Scramble:", scramble].join(" ")} />
            </div>
            <div hidden={hideScramble} className={`bg-slate-800 flex flex-col p-4 place-content-end border-4 rounded-3xl shadow-2xl w-[15%]`}>
                <div className="place-content-end">
                    <button 
                        onClick={() => setHideScramble(p => true)}
                        className="text-white text-bold text-xl hover:cursor-pointer">
                        <BsArrowsAngleContract />
                    </button>
                </div>
                <div className="flex justify-center items-center w-full">
                    <Cube3D hidden={currentMode !== DisplayMode.Mode3D} scrambleTexture={scrambleTexture} meshRef={stickerMeshRef} />
                    <Cube2D hidden={currentMode !== DisplayMode.Mode2D} scrambleTexture={scrambleTexture} />
                </div>
                <div className="place-content-start">
                    <button 
                        className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                        onClick={() => {
                            if (currentMode === DisplayMode.Mode3D) {
                                setCurrentMode(() => DisplayMode.Mode2D);
                            } else {
                                setCurrentMode(() => DisplayMode.Mode3D);
                            }
                        }}
                    >
                        { currentMode === DisplayMode.Mode3D ? "3D" : "2D" }
                    </button>
                </div>
            </div>
        </div>
    )
}