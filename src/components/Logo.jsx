import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Logo() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // Store renderer for cleanup

    // Create a 3D cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement); // Safe removal
      }
      renderer.dispose(); // Free resources
      rendererRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="mx-auto" />;
}