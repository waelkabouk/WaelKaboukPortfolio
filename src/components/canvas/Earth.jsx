import React, { Suspense, useLayoutEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

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

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  // Validate and fix NaN values in geometry - runs synchronously before render
  const validatedScene = useMemo(() => {
    if (!earth || !earth.scene) return earth?.scene;

    // Function to validate and fix a single attribute
    const validateAttribute = (attribute, attributeName) => {
      if (!attribute || !attribute.array) return false;
      
      const array = attribute.array;
      let hasNaN = false;
      
      for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (isNaN(value) || !isFinite(value) || value === Infinity || value === -Infinity) {
          array[i] = 0;
          hasNaN = true;
        }
      }
      
      if (hasNaN) {
        attribute.needsUpdate = true;
      }
      
      return hasNaN;
    };

    const validateAndFixGeometry = (geometry) => {
      if (!geometry || !geometry.isBufferGeometry) return false;

      // Check if position attribute exists and has valid data
      const positionAttr = geometry.attributes.position;
      if (!positionAttr || !positionAttr.array) {
        console.warn('Geometry missing position attribute');
        return false;
      }

      if (positionAttr.count === 0) {
        console.warn('Geometry has empty position attribute (count is 0)');
        return false;
      }

      let geometryHasNaN = false;

      // CRITICAL: Validate position attribute first and most thoroughly
      if (validateAttribute(positionAttr, 'position')) {
        geometryHasNaN = true;
      }

      // Validate all other attributes (normal, uv, etc.)
      Object.keys(geometry.attributes).forEach((key) => {
        if (key === 'position') return; // Already validated
        if (validateAttribute(geometry.attributes[key], key)) {
          geometryHasNaN = true;
        }
      });

      // Override computeBoundingSphere to validate before computing
      const originalComputeBoundingSphere = geometry.computeBoundingSphere.bind(geometry);
      geometry.computeBoundingSphere = function() {
        // Validate position attribute before computing
        const pos = this.attributes.position;
        if (pos && pos.array) {
          let needsFix = false;
          for (let i = 0; i < pos.array.length; i++) {
            const val = pos.array[i];
            if (isNaN(val) || !isFinite(val)) {
              pos.array[i] = 0;
              needsFix = true;
            }
          }
          if (needsFix) {
            pos.needsUpdate = true;
          }
        }
        return originalComputeBoundingSphere();
      };

      // Always recompute bounding volumes to ensure they're valid
      try {
        // Clear existing bounding volumes first
        geometry.boundingSphere = null;
        geometry.boundingBox = null;
        
        // Recompute bounding volumes after fixing NaN values
        geometry.computeBoundingSphere();
        geometry.computeBoundingBox();
      } catch (error) {
        console.warn('Error computing bounding volumes:', error);
        // Create a fallback bounding sphere
        if (!geometry.boundingSphere || isNaN(geometry.boundingSphere.radius)) {
          const pos = geometry.attributes.position;
          if (pos && pos.count > 0) {
            // Create a minimal valid bounding sphere
            geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 0.1);
          }
        }
        return false;
      }

      return geometryHasNaN;
    };

    // Traverse the scene and validate all meshes
    earth.scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        validateAndFixGeometry(child.geometry);
      }
    });

    return earth.scene;
  }, [earth]);

  // Additional validation with useLayoutEffect as backup (runs synchronously before paint)
  useLayoutEffect(() => {
    if (!validatedScene) return;

    validatedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const geometry = child.geometry;
        const positionAttr = geometry.attributes.position;
        
        // Final check before render - validate position array
        if (positionAttr && positionAttr.array && positionAttr.count > 0) {
          const array = positionAttr.array;
          let fixed = false;
          
          for (let i = 0; i < array.length; i++) {
            const val = array[i];
            if (isNaN(val) || !isFinite(val) || val === Infinity || val === -Infinity) {
              array[i] = 0;
              fixed = true;
            }
          }
          
          if (fixed) {
            positionAttr.needsUpdate = true;
          }
          
          // Ensure bounding sphere is valid - validate before computing
          if (!geometry.boundingSphere || 
              isNaN(geometry.boundingSphere.radius) || 
              !isFinite(geometry.boundingSphere.radius)) {
            try {
              // Clear invalid bounding sphere
              geometry.boundingSphere = null;
              geometry.computeBoundingSphere();
            } catch (e) {
              console.warn('Failed to compute bounding sphere:', e);
              // Set a fallback
              geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 0.1);
            }
          }
        }
      }
    });
  }, [validatedScene]);

  return (
    <primitive object={validatedScene || earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
