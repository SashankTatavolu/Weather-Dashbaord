import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function Globe({ selectedCityCoordinates }) {
  const globeRef = useRef(null);

  useEffect(() => {
    // Create a Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    // Load and position the 3D model of the globe
    const loader = new GLTFLoader();
    loader.load('/components/Earth.glb', function (gltf) {
      const globe = gltf.scene;
      globe.scale.set(0.1, 0.1, 0.1);
      scene.add(globe);

      // Highlight the selected city
      if (selectedCityCoordinates) {
        const markerGeometry = new THREE.SphereGeometry(0.01, 32, 32);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(
          selectedCityCoordinates.x,
          selectedCityCoordinates.y,
          selectedCityCoordinates.z
        );
        scene.add(marker);
      }
    });

    // Position the camera
    camera.position.z = 5;

    // Add the renderer to the DOM
    globeRef.current.appendChild(renderer.domElement);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
        
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCityCoordinates]);

  return <div ref={globeRef} />;
}

export default Globe;
