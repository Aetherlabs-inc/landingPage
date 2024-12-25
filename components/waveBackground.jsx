// components/WaveBackground.jsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Wave() {
  const meshRef = useRef();
  const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);

  useFrame(({ clock }) => {
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      positions[i + 2] = Math.sin(x + clock.getElapsedTime()) * 0.5;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 50, 50]} />
      <meshStandardMaterial color="#00ff88" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function WaveBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Wave />
      </Canvas>
    </div>
  );
}
