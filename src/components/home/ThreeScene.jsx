import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlassArtifact = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle floating rotation independent of mouse
    meshRef.current.rotation.x = Math.sin(time / 4) * 0.2;
    meshRef.current.rotation.y = Math.sin(time / 2) * 0.2;

    // Mouse follow
    const { mouse } = state;
    // Lerp towards mouse position for smooth follow
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.5, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06} // Subtle color splitting for "High-End" feel
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color="#e0eaff" /* Slight blue tint to pop against white */
        />
      </mesh>
    </Float>
  );
};

const ThreeScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#f8f9fa']} /> {/* Very light gray/off-white for contrast */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <GlassArtifact />

        <Environment preset="city" /> {/* Provides reflections for the glass */}
      </Canvas>
    </div>
  );
};

export default ThreeScene;
