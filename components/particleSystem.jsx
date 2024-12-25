// components/NFCParticles.jsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createNFCShape() {
  const shape = new THREE.Shape();

  // Constants for the arcs
  const startAngle = 0;
  const endAngle = (Math.PI * 7) / 4; // 315 degrees

  // Outer arc
  shape.moveTo(1, 0);
  shape.absarc(0, 0, 1, startAngle, endAngle, false);
  shape.lineTo(0, 0);
  shape.lineTo(1, 0);

  // Create holes for the middle and inner arcs
  const hole1 = new THREE.Path();
  hole1.moveTo(0.7, 0);
  hole1.absarc(0, 0, 0.7, startAngle, endAngle, false);
  hole1.lineTo(0, 0);
  hole1.lineTo(0.7, 0);

  const hole2 = new THREE.Path();
  hole2.moveTo(0.4, 0);
  hole2.absarc(0, 0, 0.4, startAngle, endAngle, false);
  hole2.lineTo(0, 0);
  hole2.lineTo(0.4, 0);

  shape.holes.push(hole1, hole2);

  return shape;
}

function NFCBase() {
  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  };

  return (
    <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <extrudeGeometry args={[createNFCShape(), extrudeSettings]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
          emissive="#00ffff"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Center dot */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const points = useRef();
  const particlesCount = 10000;

  // Function to check if a point is within the NFC symbol shape
  function isPointInNFCShape(x, z) {
    const r = Math.sqrt(x * x + z * z);
    const angle = Math.atan2(z, x);
    const normalizedAngle = angle >= 0 ? angle : angle + Math.PI * 2;

    // Check if point is within the arcs (between 0 and 315 degrees)
    return r <= 1 && r >= 0.4 && normalizedAngle <= (Math.PI * 7) / 4;
  }

  const config = {
    baseY: -2,
    maxHeight: 4,
    particleSize: 0.015,
    speedFactor: 0.5,
    spread: 1,
  };

  const { positions, speeds, colors, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    const initialPositions = new Float32Array(particlesCount * 3);

    let validParticles = 0;
    while (validParticles < particlesCount) {
      const x = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;

      if (isPointInNFCShape(x, z)) {
        const i3 = validParticles * 3;

        positions[i3] = x;
        positions[i3 + 1] = config.baseY;
        positions[i3 + 2] = z;

        initialPositions[i3] = x;
        initialPositions[i3 + 1] = config.baseY;
        initialPositions[i3 + 2] = z;

        colors[i3] = 0;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;

        speeds[validParticles] = Math.random() * config.speedFactor;

        validParticles++;
      }
    }

    return { positions, speeds, colors, initialPositions };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Rising effect
      points.current.geometry.attributes.position.array[i3 + 1] +=
        speeds[i] * 0.01;

      // Spiral movement
      const heightRatio =
        (points.current.geometry.attributes.position.array[i3 + 1] -
          config.baseY) /
        2;
      const angle = time * 0.5 + i * 0.01;
      const radius = 0.1 * heightRatio;

      points.current.geometry.attributes.position.array[i3] +=
        Math.sin(angle) * radius * 0.01;
      points.current.geometry.attributes.position.array[i3 + 2] +=
        Math.cos(angle) * radius * 0.01;

      // Color fade
      const currentY =
        points.current.geometry.attributes.position.array[i3 + 1];
      const heightColorRatio =
        (currentY - config.baseY) / (config.maxHeight - config.baseY);

      points.current.geometry.attributes.color.array[i3] = heightColorRatio;
      points.current.geometry.attributes.color.array[i3 + 1] = 1;
      points.current.geometry.attributes.color.array[i3 + 2] = 1;

      // Reset particle
      if (currentY > config.maxHeight) {
        points.current.geometry.attributes.position.array[i3] =
          initialPositions[i3];
        points.current.geometry.attributes.position.array[i3 + 1] =
          initialPositions[i3 + 1];
        points.current.geometry.attributes.position.array[i3 + 2] =
          initialPositions[i3 + 2];
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={config.particleSize}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function NFCParticles() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-1">
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 100,
          near: 0.9,
          far: 100,
        }}
      >
        {/* <ambientLight intensity={0.9} /> */}
        {/* <pointLight position={[0, 5, 0]} intensity={1} /> */}
        {/* <NFCBase /> */}
        <Particles />
      </Canvas>
    </div>
  );
}
