import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';

const CakeModel = () => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Base Layer */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
          <meshStandardMaterial color="#f0d1a8" roughness={0.8} />
        </mesh>
        
        {/* Top Icing */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.52, 1.52, 0.3, 32]} />
          <meshStandardMaterial color="#FFF8E7" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Cherries */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 1.2;
          const z = Math.sin(angle) * 1.2;
          return (
            <mesh key={i} position={[x, 0.4, z]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#ff4d4d" roughness={0.1} />
            </mesh>
          );
        })}

        {/* Center Decor */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
          <meshStandardMaterial color="#F9A03F" roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

const Cake3D = () => {
  return (
    <div style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 45 }}>
        <Stage environment="city" intensity={0.5}>
          <CakeModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default Cake3D;
