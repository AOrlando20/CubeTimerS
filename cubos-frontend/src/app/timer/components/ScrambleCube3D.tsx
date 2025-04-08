"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei"
import { AppContext, AppElementsState } from "@/context/contexts";
import { useContext, useEffect, useRef, useState } from "react";
import { Canvas as CanvasPG, Type } from "sr-puzzlegen";
import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

function fetchScrambleTexture(scramble?: string) {
    if (!scramble) return;

    const type = "cube-net";
    const options = {
        "width": 1024,
        "height": 1024,
        "strokeWidth": 0.01,
        "puzzle": {
            "alg": scramble ?? ""
        }
    };

    const div_wrapper = document.createElement("div");
    CanvasPG(div_wrapper, Type.CUBE_NET, options);
    const canvasEl = div_wrapper.querySelector("canvas");
    const png_img = canvasEl?.toDataURL('image/png');

    return png_img;
}

const Cube2D = (props) => {
    const [ texture, setTexture ] = useState<string>(null);
    const { appElements } = useContext<AppElementsState>(AppContext);

    useEffect(() => {
        const png_data = fetchScrambleTexture(appElements.scramble);
        if (png_data) {
            setTexture(png_data);
        }
        
    }, [appElements])

    return (
        <img alt="" src={texture} className="h-[85%]"/>
    )
}

const Cube3D = (props) => {
    const { appElements, setAppElements } = useContext<AppElementsState>(AppContext);
    const { nodes } = useGLTF("/rubik_cube/rubik_v3.glb");

    const stickerRef = useRef();

    useEffect(() => {
        const png_data = fetchScrambleTexture(appElements.scramble);
        if (png_data) {
            const loadedTexture = textureLoader.load(png_data);
            stickerRef.current.material.map = loadedTexture;
        }
        
    }, [appElements])

    return (
        <>
            <mesh geometry={nodes["Cube_1"].geometry} material={nodes["Cube_1"].material} {...props}/>
            <mesh geometry={nodes["Cube_2"].geometry} material={nodes["Cube_2"].material} ref={stickerRef} {...props}/>
        </>
    )
}


export default function ScrambleCube3D() {
    return (
        <>
            <Canvas camera={{ position: [0, 5, -10], fov: 30, near: 1, far: 150 }}>
                <Cube3D rotation={[Math.PI / 2, 0, Math.PI * 1.23]} position={[0, 0, 0]} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI * 2 - 0.001}/>
            </Canvas>
            <Cube2D/>
        </>
    )
}