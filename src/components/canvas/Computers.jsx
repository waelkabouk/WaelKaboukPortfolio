import React, { Suspense, useEffect, useState, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from '../Loader';

// Global patch to prevent NaN errors in BufferGeometry
// This runs once when the module loads
if (typeof THREE.BufferGeometry !== 'undefined') {
  const originalComputeBoundingSphere = THREE.BufferGeometry.prototype.computeBoundingSphere;
  
  THREE.BufferGeometry.prototype.computeBoundingSphere = function() {
    // Validate position attribute before computing
    const positionAttr = this.attributes.position;
    if (positionAttr && positionAttr.array) {
      const array = positionAttr.array;
      let needsFix = false;
      
      for (let i = 0; i < array.length; i++) {
        const val = array[i];
        if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
          array[i] = 0;
          needsFix = true;
        }
      }
      
      if (needsFix) {
        positionAttr.needsUpdate = true;
      }
    }
    
    // Now call the original method
    try {
      return originalComputeBoundingSphere.call(this);
    } catch (error) {
      console.warn('BufferGeometry.computeBoundingSphere error, using fallback:', error);
      // Create a safe fallback
      this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.0);
      return this.boundingSphere;
    }
  };
}

const Computers = ({ isMobile, isTablet }) => {
  // useGLTF caches the loaded model automatically
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const groupRef = useRef();
  const { camera } = useThree();

  // Validate and fix NaN values in geometry IMMEDIATELY when model loads
  const validatedScene = useMemo(() => {
    if (!computer || !computer.scene) return computer?.scene;

    // Comprehensive function to sanitize and validate a single attribute
    const sanitizeAttribute = (attribute) => {
      if (!attribute || !attribute.array) return false;
      
      const array = attribute.array;
      let fixed = false;
      
      // Sanitize all values in the array
      for (let i = 0; i < array.length; i++) {
        const value = array[i];
        // Check for NaN, Infinity, or any invalid number
        if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
          array[i] = 0;
          fixed = true;
        }
      }
      
      if (fixed) {
        attribute.needsUpdate = true;
      }
      
      return fixed;
    };

    // Comprehensive geometry validation and fixing
    const validateAndFixGeometry = (geometry) => {
      if (!geometry || !geometry.isBufferGeometry) return;

      // CRITICAL: Validate position attribute first - this is the most important
      const positionAttr = geometry.attributes.position;
      if (!positionAttr || !positionAttr.array) {
        console.error('Geometry missing position attribute');
        return;
      }

      if (positionAttr.count === 0) {
        console.warn('Geometry has empty position attribute');
        return;
      }

      // Sanitize position attribute - this is critical
      sanitizeAttribute(positionAttr);

      // Sanitize all other attributes
      Object.keys(geometry.attributes).forEach((key) => {
        if (key !== 'position') {
          sanitizeAttribute(geometry.attributes[key]);
        }
      });

      // Override computeBoundingSphere to ALWAYS validate before computing
      const originalComputeBoundingSphere = geometry.computeBoundingSphere.bind(geometry);
      geometry.computeBoundingSphere = function() {
        // Always validate position before computing
        const pos = this.attributes.position;
        if (pos && pos.array) {
          let needsFix = false;
          for (let i = 0; i < pos.array.length; i++) {
            const val = pos.array[i];
            if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
              pos.array[i] = 0;
              needsFix = true;
            }
          }
          if (needsFix) {
            pos.needsUpdate = true;
          }
        }
        
        // Now compute the bounding sphere
        try {
          return originalComputeBoundingSphere();
        } catch (error) {
          console.warn('Error in computeBoundingSphere, creating fallback:', error);
          // Create a safe fallback bounding sphere
          this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.0);
          return this.boundingSphere;
        }
      };

      // Override computeBoundingBox as well
      const originalComputeBoundingBox = geometry.computeBoundingBox.bind(geometry);
      geometry.computeBoundingBox = function() {
        // Validate position before computing
        const pos = this.attributes.position;
        if (pos && pos.array) {
          for (let i = 0; i < pos.array.length; i++) {
            const val = pos.array[i];
            if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
              pos.array[i] = 0;
            }
          }
          pos.needsUpdate = true;
        }
        
        try {
          return originalComputeBoundingBox();
        } catch (error) {
          console.warn('Error in computeBoundingBox, creating fallback:', error);
          this.boundingBox = new THREE.Box3(
            new THREE.Vector3(-1, -1, -1),
            new THREE.Vector3(1, 1, 1)
          );
          return this.boundingBox;
        }
      };

      // Clear any existing invalid bounding volumes
      geometry.boundingSphere = null;
      geometry.boundingBox = null;

      // Pre-compute bounding volumes now with validated data
      try {
        geometry.computeBoundingSphere();
        geometry.computeBoundingBox();
      } catch (error) {
        console.warn('Error pre-computing bounding volumes:', error);
        // Set safe fallback values
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.0);
        geometry.boundingBox = new THREE.Box3(
          new THREE.Vector3(-1, -1, -1),
          new THREE.Vector3(1, 1, 1)
        );
      }
    };

    // Traverse the scene and validate ALL meshes IMMEDIATELY
    computer.scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        validateAndFixGeometry(child.geometry);
      }
    });

    return computer.scene;
  }, [computer]);

  // Final validation pass with useLayoutEffect (runs synchronously before paint)
  useLayoutEffect(() => {
    if (!validatedScene) return;

    validatedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttr = geometry.attributes.position;
        
        // Final safety check - validate position array one more time
        if (positionAttr && positionAttr.array && positionAttr.count > 0) {
          const array = positionAttr.array;
          let fixed = false;
          
          // Sanitize all values
          for (let i = 0; i < array.length; i++) {
            const val = array[i];
            if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
              array[i] = 0;
              fixed = true;
            }
          }
          
          if (fixed) {
            positionAttr.needsUpdate = true;
          }
          
          // Ensure bounding sphere is valid
          if (!geometry.boundingSphere || 
              typeof geometry.boundingSphere.radius !== 'number' ||
              isNaN(geometry.boundingSphere.radius) || 
              !isFinite(geometry.boundingSphere.radius)) {
            try {
              geometry.boundingSphere = null;
              geometry.computeBoundingSphere();
            } catch (e) {
              console.warn('Final validation: Failed to compute bounding sphere:', e);
              geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.0);
            }
          }
        }
      }
    });
  }, [validatedScene]);

  // Calculate optimal camera position based on model bounds
  useEffect(() => {
    if (!groupRef.current || !validatedScene) return;

    // Use a small delay to ensure model is fully rendered
    const timer = setTimeout(() => {
      if (!groupRef.current) return;

      const box = new THREE.Box3();
      box.setFromObject(groupRef.current);
      
      if (box.isEmpty()) return;

      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      if (maxDim === 0) return;

      const distance = maxDim * (isMobile ? 2.8 : isTablet ? 2.5 : 2.2);
      const cameraHeight = isMobile ? center.y + size.y * 0.2 : center.y + size.y * 0.3;
      const cameraAngle = isMobile ? Math.PI / 5.5 : isTablet ? Math.PI / 5 : Math.PI / 4.5;
      
      camera.position.set(
        center.x + Math.sin(cameraAngle) * distance,
        cameraHeight,
        center.z + Math.cos(cameraAngle) * distance
      );
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }, 100);

    return () => clearTimeout(timer);
  }, [validatedScene, isMobile, isTablet, camera]);

  return (
    <group ref={groupRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={validatedScene || computer.scene}
        scale={isMobile ? 0.6 : isTablet ? 0.7 : 0.8}
        position={[0, 0, 0]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Detect device types for responsive adjustments
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640); // sm breakpoint
      setIsTablet(width > 640 && width <= 1024); // md to lg breakpoint
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return (
    <div className="w-full h-full" style={{ overflow: 'hidden' }}>
      <Canvas
        frameloop="demand"
        shadows={!isMobile}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ preserveDrawingBuffer: false, antialias: true }}
        className="w-full h-full"
      >
        <PerspectiveCamera
          makeDefault
          fov={isMobile ? 35 : isTablet ? 32 : 28}
          near={0.1}
          far={1000}
          position={isMobile ? [0, 0, 5] : isTablet ? [0, 0, 6] : [0, 0, 7]}
        />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate={!isMobile}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
          <Computers isMobile={isMobile} isTablet={isTablet} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
