// components/EnhancedBinaryBackground.jsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";

const EnhancedBinaryBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Binary columns
    const columns = [];
    const columnCount = 20;

    class BinaryColumn {
      constructor(x) {
        this.characters = [];
        this.x = x;
        this.speed = Math.random() * 0.1 + 0.05;

        // Create binary characters
        for (let i = 0; i < 20; i++) {
          const text = new Text();

          text.text = Math.round(Math.random()).toString();
          text.fontSize = 0.2;
          text.color = new THREE.Color(0x4f46e5);
          text.position.x = x;
          text.position.y = i * 0.5;
          text.position.z = Math.random() * -2;
          text.sync();

          this.characters.push(text);
          scene.add(text);
        }
      }

      update() {
        this.characters.forEach((char) => {
          char.position.y -= this.speed;

          if (char.position.y < -10) {
            char.position.y = 10;
            char.text = Math.round(Math.random()).toString();
            char.material.opacity = Math.random() * 0.5 + 0.25;
            char.sync();
          }
        });
      }
    }

    // Create columns
    for (let i = 0; i < columnCount; i++) {
      const x = (i - columnCount / 2) * 0.8;
      columns.push(new BinaryColumn(x));
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      columns.forEach((column) => {
        column.update();
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      camera.position.x = mouse.x * 0.5;
      camera.position.y = mouse.y * 0.5;
      camera.lookAt(scene.position);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: "transparent" }}
    />
  );
};

export default EnhancedBinaryBackground;
