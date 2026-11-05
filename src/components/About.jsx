import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import SectionHeading from './SectionHeading';
import { SHOW_AL_RAJHI } from '../constants';

// 3D Floating Tech Cube Component
const TechCube = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const services = [
    { text: 'Web Dev', position: [0, 0, 1.1], color: '#915EFF' },
    { text: 'Mobile', position: [0, 0, -1.1], color: '#FF6B6B' },
    { text: 'Backend', position: [1.1, 0, 0], color: '#4ECDC4' },
    { text: 'Frontend', position: [-1.1, 0, 0], color: '#45B7D1' },
    { text: 'AI', position: [0, 1.1, 0], color: '#96CEB4' },
    { text: 'DevOps', position: [0, -1.1, 0], color: '#FFEAA7' },
  ];

  return (
    <group ref={groupRef}>
      {/* Main rotating cube */}
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Service labels floating around the cube */}
      {services.map((service, index) => (
        <group key={index} position={service.position}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={service.color} />
          </mesh>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.2}
            color={service.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/helvetiker_regular.typeface.json" // You may need to adjust this path
          >
            {service.text}
          </Text>
        </group>
      ))}

      {/* Orbiting particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 0.5) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#915EFF" />
          </mesh>
        );
      })}
    </group>
  );
};

const About = () => {
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
      <div>
        <SectionHeading title="Overview" />

        <motion.dl
          variants={fadeIn('up', 'tween', 0.2, 0.6)}
          className="mt-10 grid grid-cols-2 gap-8 max-w-md"
        >
          <div>
            <dt className="sr-only">Cross-view identity consistency</dt>
            <dd className="font-serif text-white text-[56px] sm:text-[72px] leading-none">81.3%</dd>
            <dd className="mt-3 text-secondary text-[16px] leading-snug">
              cross-view identity consistency, MSc thesis
            </dd>
          </div>
          <div>
            <dt className="sr-only">Frames per second</dt>
            <dd className="font-serif text-white text-[56px] sm:text-[72px] leading-none">30 FPS</dd>
            <dd className="mt-3 text-secondary text-[16px] leading-snug">
              sustained on standard hardware
            </dd>
          </div>
        </motion.dl>
      </div>

      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className="flex flex-col gap-5 text-white-100 text-[17px] sm:text-[18px] leading-[1.65] max-w-[60ch] lg:pt-4"
      >
        <p>
          I'm an AI Systems Architect based in Riyadh. I work on computer
          vision and LLM-based systems.
        </p>
        {SHOW_AL_RAJHI && (
          <p>
            At Al Rajhi Building and Construction (CEO Office), I head the
            Operations Management Sector. I built Metal World's operations
            management system, which manages 170+ client contracts across 15
            factories and 7 showrooms, and its e-commerce platform.
          </p>
        )}
        <p>
          My MSc thesis at Sakarya University proposed a single-pass method for
          multi-camera vehicle tracking, published in July 2025. Since 2023 I
          have also built web applications for clients through InnoMerx.
        </p>
        <p>
          I'm open to conversations about AI in industry, computer vision and
          research collaboration.
        </p>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
