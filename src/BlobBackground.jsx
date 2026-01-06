import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MarchingCubes, MarchingCube } from '@react-three/drei';
import * as THREE from 'three';

const MetaBalls = () => {
    const { viewport } = useThree();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [scroll, setScroll] = useState(0);

    // Refs for individual blobs to animate them
    const blob1 = useRef();
    const blob2 = useRef();
    const blob3 = useRef();
    const blob4 = useRef();

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMouse({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            });
        };
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Parallax offset
        const pX = mouse.x * (viewport.width / 6);
        const pY = mouse.y * (viewport.height / 6) + (scroll * 0.005);

        // Animate Blob Positions (Lissajous figures for organic bounded movement)
        if (blob1.current) {
            blob1.current.position.x = Math.sin(t * 0.5) * 0.4 + pX;
            blob1.current.position.y = Math.cos(t * 0.6) * 0.4 + pY;
            blob1.current.position.z = Math.sin(t * 0.3) * 0.2;
        }
        if (blob2.current) {
            blob2.current.position.x = Math.cos(t * 0.4) * 0.5 + 0.5 + pX;
            blob2.current.position.y = Math.sin(t * 0.3) * 0.5 + 0.2 + pY;
        }
        if (blob3.current) {
            blob3.current.position.x = Math.sin(t * 0.7) * 0.4 - 0.5 + pX;
            blob3.current.position.y = Math.cos(t * 0.5) * 0.3 - 0.2 + pY;
        }
        if (blob4.current) { // Smaller satellite blob
            blob4.current.position.x = Math.sin(t * 1.1) * 0.6 + pX;
            blob4.current.position.y = Math.cos(t * 0.9) * 0.6 + pY;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} position={[0, 0, 0]}>
            {/* Resolution=60 for smooth surfaces. color matches the Amber Clay look. */}
            <MarchingCubes resolution={60} maxPolyCount={20000} enableUvs={false} enableColors={false} scale={2}>
                <meshStandardMaterial
                    color="#F59E0B"
                    roughness={0.4} // Matte Clay
                    metalness={0.1}
                />

                {/* Main center mass */}
                <MarchingCube ref={blob1} strength={0.6} radius={0.4} color="#F59E0B" />

                {/* Wandering masses */}
                <MarchingCube ref={blob2} strength={0.5} radius={0.3} color="#F59E0B" />
                <MarchingCube ref={blob3} strength={0.5} radius={0.3} color="#F59E0B" />
                <MarchingCube ref={blob4} strength={0.4} radius={0.2} color="#F59E0B" />
            </MarchingCubes>
        </Float>
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
            background: '#0F172A'
        }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 75 }} dpr={[1, 2]}>
                {/* Studio Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[-2, 5, 2]} intensity={1.2} />
                <pointLight position={[5, -5, -5]} intensity={0.5} color="#3b82f6" />
                <Environment preset="city" blur={0.8} />

                <MetaBalls />
            </Canvas>
        </div>
    );
};

export default BlobBackground;
