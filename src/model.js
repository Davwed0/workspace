import React, { useState } from "react";
import { useGLTF, Html } from "@react-three/drei";

const labelCoordinates = [
	{ position: [-3.85, 4.5, 1.4], text: "test0" },
	{ position: [-2.35, 4.5, 1.4], text: "test1" },
	{ position: [-0.75, 4.5, 1.4], text: "test2" },
	{ position: [0.75, 4.5, 1.4], text: "test3" },
	{ position: [3, 4, 1.4], text: "test4" },
	{ position: [4.2, 1, 0.5], text: "test5" },
];

export default function Model(props) {
	const { nodes, materials } = useGLTF("/pipes.glb");
	const [hover, setHover] = useState([false * labelCoordinates.length]);

	const handlePointerEnter = (event, index) => {
		const newHover = [...hover];
		newHover[index] = true;
		setHover(newHover);
	};

	const handlePointerOut = (event) => {
		const newHover = [false * labelCoordinates.length];
		setHover(newHover);
	};

	return (
		<group {...props} dispose={null}>
			<mesh castShadow receiveShadow geometry={nodes.SM_WallVentsA.geometry} material={materials.M_WallVentsA} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
			{labelCoordinates.map((label, index) => (
				<group key={index} position={label.position}>
					<Html center position={[0, 0.5, 1]} scale={0.1} visible={false}>
						<div style={{ background: "black", opacity: 0.5, paddingInline: "0.2rem", verticalAlign: "bottom" }}>
							<p style={{ color: "white", userSelect: "none", display: hover[index] ? "initial" : "none" }}>{label.text}</p>
						</div>
					</Html>
					<mesh>
						<sphereGeometry args={[0.1, 8, 8]} />
						<meshBasicMaterial color="red" />
					</mesh>
					<mesh visible={false} onPointerEnter={(e) => handlePointerEnter(e, index)} onPointerOut={(e) => handlePointerOut(e)}>
						<sphereGeometry args={[0.7, 8, 8]} />
					</mesh>
				</group>
			))}
		</group>
	);
}

useGLTF.preload("/pipes.glb");
