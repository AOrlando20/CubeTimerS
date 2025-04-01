'use client'

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei"

function CubeMesh(props) {
    const { nodes } = useGLTF("/rubik_cube/rubik_v2.glb")
    
    return (
        <>
            <mesh geometry={nodes["Cube_1"].geometry} material={nodes["Cube_1"].material} {...props}/>
            <mesh geometry={nodes["Cube_2"].geometry} material={nodes["Cube_2"].material} {...props}/>
        </>
    );
}

export default function Cube3D() {
    const { nodes, materials } = useGLTF("/rubik_cube/rubik_v2.glb")

    console.log(nodes);
    console.log("====");
    console.log(materials)

    return (
        <div id='canvas-container' className={"h-[20rem]"}>
            <Canvas camera={{ position: [-1, 3, -10], fov: 30, near: 1, far: 150 }}>
                <CubeMesh rotation={[0, 0, Math.PI / 2.0]} position={[0, 0, 0]} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI * 2 - 0.001}/>
            </Canvas>
        </div>
    )
}