import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      const positions = random.inSphere(new Float32Array(5000), { radius: 1.2 });
      // Validate positions to ensure no NaN values
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i]) || !isFinite(positions[i])) {
          positions[i] = 0;
        }
      }
      return positions;
    } catch (error) {
      console.warn('Error generating star positions, using fallback:', error);
      // Fallback: create a simple sphere with valid values
      const fallback = new Float32Array(5000);
      for (let i = 0; i < fallback.length; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.2;
        fallback[i] = r * Math.sin(phi) * Math.cos(theta);
        fallback[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        fallback[i + 2] = r * Math.cos(phi);
      }
      return fallback;
    }
  });

  useFrame((state, delta) => {
    if (ref.current && !isNaN(delta) && isFinite(delta)) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
