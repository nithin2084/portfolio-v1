import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MarchingCubes, MarchingCube } from '@react-three/drei';
import * as THREE from 'three';

/**
 * BLOB BACKGROUND COMPONENT
 * 
 * Implements organic growing and merging yellow blobs using Three.js MarchingCubes
 * Behavior: Blobs start small, gradually grow in size, move closer together, and merge
 * 
 * Technical approach:
 * - MarchingCubes for metaball/liquid surface effect
 * - Animated radius/strength for growth behavior
 * - Smooth continuous motion for organic feel
 * - Static camera for stable viewing
 */

const MetaBalls = () => {
    // Refs for individual blobs
    const blob1 = useRef();
    const blob2 = useRef();
    const blob3 = useRef();
    const blob4 = useRef();
    const blob5 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        /**
         * GROWTH ANIMATION
         * Uses smooth sine wave to cycle blob sizes
         * Creates organic "breathing" effect where blobs grow and shrink
         * Offset phases create natural variation between blobs
         */
        const growthCycle = 8; // Full growth cycle duration in seconds
        const baseGrowth = 0.5 + Math.sin(t / growthCycle) * 0.3; // 0.2 to 0.8
        
        /**
         * BLOB 1 - Large center mass (left side)
         * Grows largest, forms main body of merged shape
         */
        if (blob1.current) {
            const growth1 = 0.6 + Math.sin(t / growthCycle) * 0.25;
            blob1.current.strength = 0.7 + growth1 * 0.3;
            
            // Slow circular motion - wider range for more screen coverage
            blob1.current.position.x = Math.sin(t * 0.15) * 0.5 - 0.4;
            blob1.current.position.y = Math.cos(t * 0.18) * 0.4;
            blob1.current.position.z = Math.sin(t * 0.12) * 0.15;
        }

        /**
         * BLOB 2 - Large center mass (right side)
         * Merges with blob1 to form connected organic shape
         */
        if (blob2.current) {
            const growth2 = 0.55 + Math.sin(t / growthCycle + 1.5) * 0.3;
            blob2.current.strength = 0.65 + growth2 * 0.35;
            
            // Moves to merge with blob1 - wider range for more coverage
            blob2.current.position.x = Math.cos(t * 0.12) * 0.5 + 0.5;
            blob2.current.position.y = Math.sin(t * 0.15) * 0.45 - 0.05;
            blob2.current.position.z = Math.cos(t * 0.1) * 0.12;
        }

        /**
         * BLOB 3 - Medium top blob
         * Floats above and occasionally merges with main mass
         */
        if (blob3.current) {
            const growth3 = 0.4 + Math.sin(t / growthCycle + 3) * 0.25;
            blob3.current.strength = 0.5 + growth3 * 0.3;
            
            // Upper region movement - extended range
            blob3.current.position.x = Math.sin(t * 0.2) * 0.55 + 0.1;
            blob3.current.position.y = Math.cos(t * 0.16) * 0.35 + 0.5;
            blob3.current.position.z = Math.sin(t * 0.14) * 0.1;
        }

        /**
         * BLOB 4 - Small satellite blob (right side)
         * Orbits main mass, occasionally touches to merge
         */
        if (blob4.current) {
            const growth4 = 0.35 + Math.sin(t / growthCycle + 4.5) * 0.2;
            blob4.current.strength = 0.45 + growth4 * 0.25;
            
            // Satellite orbit pattern - wider orbit for more coverage
            blob4.current.position.x = Math.cos(t * 0.22) * 0.7 + 0.35;
            blob4.current.position.y = Math.sin(t * 0.2) * 0.6 + 0.1;
            blob4.current.position.z = 0.05;
        }

        /**
         * BLOB 5 - Small accent blob
         * Adds visual interest, smaller and more dynamic
         */
        if (blob5.current) {
            const growth5 = 0.3 + Math.sin(t / growthCycle + 6) * 0.15;
            blob5.current.strength = 0.4 + growth5 * 0.2;
            
            // More active movement pattern - extended range
            blob5.current.position.x = Math.sin(t * 0.28) * 0.65 - 0.3;
            blob5.current.position.y = Math.cos(t * 0.25) * 0.5 - 0.35;
            blob5.current.position.z = Math.sin(t * 0.18) * 0.08;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* 
                MarchingCubes creates liquid metaball effect
                Resolution: Higher = smoother but slower (60 is good balance)
                Scale: Increased to 4 for larger, more visible blobs across full viewport
            */}
            <MarchingCubes 
                resolution={60} 
                maxPolyCount={20000} 
                enableUvs={false} 
                enableColors={false} 
                scale={4} // Increased from 2.5 to cover more screen area
            >
                <meshStandardMaterial
                    color="#D4A855" // Golden yellow - DO NOT CHANGE
                    roughness={0.3} // Soft, smooth appearance
                    metalness={0.1}
                />

                {/* 
                    Individual blob nodes
                    Radius: Increased for larger, more visible blobs
                    Strength: How strongly it influences the metaball surface
                    Higher strength = more influence on merged shape
                */}
                <MarchingCube ref={blob1} strength={0.8} subtract={10} radius={0.75} />
                <MarchingCube ref={blob2} strength={0.75} subtract={10} radius={0.68} />
                <MarchingCube ref={blob3} strength={0.6} subtract={10} radius={0.55} />
                <MarchingCube ref={blob4} strength={0.5} subtract={10} radius={0.45} />
                <MarchingCube ref={blob5} strength={0.45} subtract={10} radius={0.38} />
            </MarchingCubes>
        </group>
    );
};

const BlobBackground = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: '#2C3E50' // Dark blue navy matching reference image
        }}>
            <Canvas 
                camera={{ position: [0, 0, 5], fov: 85 }} 
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                {/* Subtle lighting - no dramatic effects */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 5, 5]} intensity={0.6} />

                <MetaBalls />
            </Canvas>
        </div>
    );
};

export default BlobBackground;
