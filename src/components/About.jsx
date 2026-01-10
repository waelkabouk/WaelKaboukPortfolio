import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

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
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        MSc Software Engineer & Computer Vision Specialist bridging cutting-edge academic research with
        robust industry applications. My work spans from developing novel multi-camera tracking algorithms
        (achieving 81.3% cross-view identity consistency) to building high-performance web and mobile
        platforms. I specialize in unified computer vision pipelines, multi-object tracking, and multimodal
        AI systems, with deep expertise in deploying scalable solutions using YOLO, OpenCV, LangChain,
        and modern full-stack technologies. Dedicated to translating theoretical innovations into
        production-grade reliability.
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, 'about');
