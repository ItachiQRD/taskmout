'use client';

import { Suspense, useRef } from 'react';
import type { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

function BottleModel() {
  const ref = useRef<Group>(null);
  // Placeholder: une bouteille simple en géométrie (pas de modèle GLTF requis au démarrage)
  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.9, 32]} />
        <meshStandardMaterial color="#d68b2a" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.08, 32]} />
        <meshStandardMaterial color="#e8d5b5" roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <Environment preset="sunset" />
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <BottleModel />
      </Float>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="bg-gradient-to-b from-argan-50/80 to-cream/60"
      >
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#d68b2a" />
            </mesh>
          }
        >
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
