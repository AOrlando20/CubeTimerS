'use client'

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei"


function CubeMesh(props: any) {
    const { nodes } = useGLTF("/rubik_cube/rubik_v3.glb")
    
    return (
        <>
            <mesh geometry={nodes["Cube_1"].geometry} material={nodes["Cube_1"].material} {...props}/>
            <mesh geometry={nodes["Cube_2"].geometry} material={nodes["Cube_2"].material} {...props}/>
        </>
    );
}

export default function Cube3D(children: any) {

    return (
        <div id='canvas-container' {...children} >
            <Canvas camera={{ position: [0, 5, -10], fov: 30, near: 1, far: 150 }}>
                <CubeMesh rotation={[Math.PI / 2, 0, Math.PI * 1.23]} position={[0, 0, 0]} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI * 2 - 0.001}/>
            </Canvas>
        </div>
    )
}