"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// This function would replace the simple box geometry with a real 3D model
// To use this, you would need to:
// 1. Create or purchase a realistic gold bar 3D model (in glTF/GLB format)
// 2. Place it in your public folder (e.g., /public/models/gold_bar.glb)
// 3. Uncomment this component and comment out the simple GoldBar component

// function RealGoldBarModel({ scrollY }: { scrollY: number }) {
//   // Load the 3D model
//   const { scene } = useGLTF('/models/samplegold.glb');
//   const group = useRef<THREE.Group>(null!);

//   // Clone the model scene to avoid issues
//   useEffect(() => {
//     if (scene) {
//       // Apply gold-like material to all meshes in the scene
//       scene.traverse((child) => {
//         if (child instanceof THREE.Mesh) {
//           child.castShadow = true;
//           child.receiveShadow = true;
          
//           // Apply a gold-like material if it's the main gold bar
//           if (child.name.toLowerCase().includes('gold') || child.name.toLowerCase().includes('bar')) {
//             child.material = new THREE.MeshPhysicalMaterial({
//               color: new THREE.Color("#FFD700"),
//               metalness: 1,
//               roughness: 0.2,
//               clearcoat: 0.8,
//               clearcoatRoughness: 0.2,
//               reflectivity: 1,
//               envMapIntensity: 2
//             });
//           }
//         }
//       });
//     }
//   }, [scene]);

//   // Rotate based on scroll position
//   useFrame(() => {
//     if (group.current) {
//       group.current.rotation.y = scrollY * 2 * Math.PI;
//       group.current.rotation.x = 0.25 + Math.sin(scrollY * Math.PI) * 0.1;
//     }
//   });

//   // Position and scale the model appropriately
//   return (
//     <group ref={group} dispose={null} position={[0, 0, 0]} scale={[1, 1, 1]}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// // Preload the model to avoid loading delays
// useGLTF.preload('/models/samplegold.glb');

// Simple gold bar using primitive geometry but with enhanced materials
function GoldBar({ scrollY }: { scrollY: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [bumpTexture, setBumpTexture] = React.useState<THREE.Texture | null>(null);

  // Attempt to load bump texture but don't fail if it doesn't exist
  React.useEffect(() => {
    try {
      const loader = new THREE.TextureLoader();
      loader.load(
        "/textures/gold_bump.jpg", 
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          setBumpTexture(texture);
        },
        undefined,
        () => console.log("Texture not found, using fallback")
      );
    } catch (error) {
      console.log("Error loading texture:", error);
    }
  }, []);

  // Rotate the bar based on scroll position
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = scrollY * 2 * Math.PI; // full rotation per scroll
      mesh.current.rotation.x = 0.25 + Math.sin(scrollY * Math.PI) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      {/* Gold bar shape: a slightly beveled box */}
      <boxGeometry args={[3, 0.8, 1.2]} />
      <meshPhysicalMaterial
        color="#FFD700"
        metalness={1}
        roughness={0.2}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        reflectivity={1}
        ior={3}
        transmission={0}
        envMapIntensity={2.5}
        bumpMap={bumpTexture}
        bumpScale={0.005}
      />
    </mesh>
  );
}

export function GoldBar3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);

  // Listen to scroll and update scrollY (normalized 0-1 for hero section)
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Only animate while hero is in view
      const y = 1 - Math.max(0, Math.min(1, rect.bottom / windowH));
      setScrollY(y);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: 400 }}>
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-10, 5, -5]}
          intensity={0.8}
          color="#FFF9C4"
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <GoldBar scrollY={scrollY} />
        <Environment files="/hdri/venice_sunset_1k.hdr" />
        {/* Allow limited rotation for better viewing but not too much freedom */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Instructions for using a real 3D gold bar model:
// 1. You need a 3D model in glTF or GLB format (industry standard for web)
// 2. You can:
//    - Purchase one from sites like TurboSquid, CGTrader, or Sketchfab ($10-$50)
//    - Use a free model from sites like Sketchfab or Google Poly
//    - Create one using Blender (free) or other 3D modeling software
// 3. The model should be optimized for web (low poly count, compressed textures)
// 4. Place your model in the public/models/ directory
// 5. Uncomment the RealGoldBarModel component and update the path
// 6. Replace <GoldBar scrollY={scrollY} /> with <RealGoldBarModel scrollY={scrollY} /> 