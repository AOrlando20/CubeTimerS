'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useRef } from "react";


function CubeMesh({ ...props }) {
    const { nodes } = useGLTF("/rubik_cube/rubik_v3.glb")
    const cubeMesh1Ref = useRef(null);
    const cubeMesh2Ref = useRef(null); 

    useFrame(({ clock }) => {
        cubeMesh1Ref.current.rotation.z = clock.elapsedTime;
        cubeMesh2Ref.current.rotation.z = clock.elapsedTime; 
    });
    
    return (
        <>
            <mesh ref={cubeMesh1Ref} geometry={nodes["Cube_1"].geometry} material={nodes["Cube_1"].material} {...props}/>
            <mesh ref={cubeMesh2Ref} geometry={nodes["Cube_2"].geometry} material={nodes["Cube_2"].material} {...props}/>
        </>
    );
}

export default function Cube3D({ ...props }) {
    const initialPos = [0, 0, 0];
    const initialRotation = [Math.PI / 2, 0, Math.PI * 1.23];

    return (
        <div id='canvas-container' {...props} >
            <Canvas camera={{ position: [0, 5, -10], fov: 30, near: 1, far: 150 }}>
                <CubeMesh position={initialPos} rotation={initialRotation} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI * 2 - 0.001}/>
            </Canvas>
        </div>
    )
}