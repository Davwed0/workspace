import { Suspense, useDeferredValue } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows } from "@react-three/drei";
import Model from "./model";

export default function App() {
	return (
		<>
			<Canvas camera={{ position: [20, 20, 20] }}>
				<hemisphereLight color="white" groundColor="black" intensity={0.75} />
				<ambientLight intensity={0.5} />
				<spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
				<group position={[0, 0, 0]}>
					<Model />
					<ContactShadows scale={20} blur={10} far={20} />
				</group>
				<OrbitControls />
			</Canvas>
		</>
	);
}
