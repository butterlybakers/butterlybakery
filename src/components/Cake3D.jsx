import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';

const DetailedPastryModel = ({ type }) => {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {type === 1 && ( // Original Strawberry Vanilla Cake
          <>
            <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
              <meshStandardMaterial color="#f0d1a8" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[1.52, 1.52, 0.3, 32]} />
              <meshStandardMaterial color="#FFF8E7" roughness={0.2} metalness={0.1} />
            </mesh>
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
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
              <meshStandardMaterial color="#F9A03F" roughness={0.3} />
            </mesh>
          </>
        )}

        {type === 2 && ( // Black Forest / Chocolate Truffle Cake
          <>
            {/* Cake Base */}
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
              <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>
            {/* Cream Filling Layer */}
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[1.48, 1.48, 0.15, 32]} />
              <meshStandardMaterial color="#FFF8E7" roughness={0.4} />
            </mesh>
            {/* Top Cake Layer */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 0.4, 32]} />
              <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>
            {/* Chocolate Ganache Icing */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[1.53, 1.53, 0.2, 32]} />
              <meshStandardMaterial color="#21120a" roughness={0.1} metalness={0.2} />
            </mesh>
            {/* Whipped Cream Dollops on Edge */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = Math.cos(angle) * 1.25;
              const z = Math.sin(angle) * 1.25;
              return (
                <group key={i} position={[x, 0.5, z]}>
                  <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#FFF8E7" roughness={0.5} />
                  </mesh>
                  {/* Mini Cherries */}
                  <mesh position={[0, 0.18, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#b30000" roughness={0.1} />
                  </mesh>
                </group>
              );
            })}
            {/* Center Chocolate Shavings */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.8, 0.9, 0.1, 16]} />
              <meshStandardMaterial color="#4E342E" roughness={0.8} />
            </mesh>
          </>
        )}

        {type === 3 && ( // Classic Fruit Tart
          <group position={[0, -0.3, 0]}>
            {/* Tart Crust Base */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.3, 0.4, 32]} />
              <meshStandardMaterial color="#d4a373" roughness={0.8} />
            </mesh>
            {/* Tart Crust Edge (Torus) */}
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.45, 0.1, 16, 32]} />
              <meshStandardMaterial color="#cc955a" roughness={0.9} />
            </mesh>
            {/* Custard Filling */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
              <meshStandardMaterial color="#ffebb3" roughness={0.3} />
            </mesh>
            {/* Concentric Circle of Strawberries */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const x = Math.cos(angle) * 1.1;
              const z = Math.sin(angle) * 1.1;
              return (
                <mesh key={`straw-${i}`} position={[x, 0.3, z]} rotation={[0, -angle, Math.PI / 4]}>
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <meshStandardMaterial color="#ff2a2a" roughness={0.2} />
                </mesh>
              );
            })}
            {/* Inner Circle of Blueberries */}
            {Array.from({ length: 7 }).map((_, i) => {
              const angle = (i / 7) * Math.PI * 2;
              const x = Math.cos(angle) * 0.55;
              const z = Math.sin(angle) * 0.55;
              return (
                <mesh key={`blue-${i}`} position={[x, 0.25, z]}>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial color="#1d3557" roughness={0.1} />
                </mesh>
              );
            })}
            {/* Center Glazed Peach */}
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#ffa94d" roughness={0.1} metalness={0.1} />
            </mesh>
          </group>
        )}

        {type === 4 && ( // Pistachio Matcha Layer Cake
          <>
            {/* Bottom Layer */}
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[1.4, 1.4, 0.7, 32]} />
              <meshStandardMaterial color="#9cb380" roughness={0.8} />
            </mesh>
            {/* Cream Cheese Layer */}
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[1.38, 1.38, 0.2, 32]} />
              <meshStandardMaterial color="#FFF8E7" roughness={0.4} />
            </mesh>
            {/* Top Layer */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[1.4, 1.4, 0.4, 32]} />
              <meshStandardMaterial color="#9cb380" roughness={0.8} />
            </mesh>
            {/* Glossy Matcha Glaze Drip */}
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[1.42, 1.42, 0.1, 32]} />
              <meshStandardMaterial color="#7a9159" roughness={0.1} metalness={0.1} />
            </mesh>
            {/* Pistachio Crumb Ring */}
            <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.1, 0.1, 16, 32]} />
              <meshStandardMaterial color="#556b2f" roughness={0.9} />
            </mesh>
            {/* Elegant Center Leaf Decor */}
            <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.3, 0.3, 0.05, 3]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
            </mesh>
          </>
        )}
      </Float>
    </group>
  );
};

const Cake3D = () => {
  const [type, setType] = useState(1);
  
  useEffect(() => {
    setType(Math.floor(Math.random() * 4) + 1);
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 45 }}>
        <Stage environment="city" intensity={0.5}>
          <DetailedPastryModel type={type} />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default Cake3D;
