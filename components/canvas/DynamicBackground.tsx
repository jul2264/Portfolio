'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    camera.position.set(0, 0, 850);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // 2. Fixed Convex 3D Spherical Dome (Stationary in 3D Space, Bulging Forward)
    const domeGroup = new THREE.Group();
    scene.add(domeGroup);

    // Expansive radius spanning the background
    const calculateRadius = (w: number, h: number) => Math.max(w, h) * 0.85;
    let sphereRadius = calculateRadius(width, height);

    // Position sphere center so the convex apex faces the camera gracefully at center
    const domeCenterZ = -sphereRadius * 0.65;
    domeGroup.position.set(0, 0, domeCenterZ);

    // Ultra-Fine Micro-Grid Segments (Dense resolution for buttery-smooth deformation)
    const latSegments = 180;
    const lonSegments = 240;

    // A. Invisible Depth Occluder Sphere (Culls back-facing lines)
    const occluderGeo = new THREE.SphereGeometry(sphereRadius * 0.996, 72, 54);
    const occluderMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
    });
    const occluderMesh = new THREE.Mesh(occluderGeo, occluderMat);
    occluderMesh.renderOrder = 0;
    domeGroup.add(occluderMesh);

    // B. Base Convex Wireframe Sphere (Side-Angle Ultra-Fine Micro-Mesh)
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, lonSegments, latSegments);

    const posAttr = sphereGeo.attributes.position;
    const vertexCount = posAttr.count;
    const originalPositions = new Float32Array(posAttr.array);

    // Subtle Greyish Translucent Tone (Calibrated for ultra-dense micro-grid)
    const isDark = theme !== 'light';
    const wireColor = isDark ? 0x64748b : 0x94a3b8;
    const wireOpacity = isDark ? 0.032 : 0.038;
    const highlightOpacity = isDark ? 0.22 : 0.24;

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: wireOpacity,
      depthTest: true,
      depthWrite: false,
    });

    const sphereMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    sphereMesh.renderOrder = 1;
    domeGroup.add(sphereMesh);

    // C. Ultra-Dense Side-Angle Wire Grid (220 Horizontal Parallels & 280 Vertical Meridians)
    const ringsGroup = new THREE.Group();
    ringsGroup.renderOrder = 1;
    const ringMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: wireOpacity * 1.3,
      depthTest: true,
      depthWrite: false,
    });

    // 220 Horizontal Latitude Parallel Rings (Fine horizontal micro-lines)
    const latCount = 220;
    for (let i = 1; i <= latCount; i++) {
      const latAngle = ((i / (latCount + 1)) - 0.5) * Math.PI * 0.90;
      const ringRadius = sphereRadius * Math.cos(latAngle);
      const ringY = sphereRadius * Math.sin(latAngle);

      const circleGeo = new THREE.BufferGeometry();
      const points: number[] = [];
      const numPts = 180;
      for (let j = 0; j <= numPts; j++) {
        const theta = (j / numPts) * Math.PI * 2;
        points.push(ringRadius * Math.sin(theta), ringY, ringRadius * Math.cos(theta));
      }
      circleGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const ring = new THREE.Line(circleGeo, ringMat);
      ringsGroup.add(ring);
    }

    // 280 Vertical Longitude Radial Meridians (Fine vertical micro-lines)
    const lonCount = 280;
    for (let i = 0; i < lonCount; i++) {
      const theta = (i / lonCount) * Math.PI * 2;
      const arcGeo = new THREE.BufferGeometry();
      const points: number[] = [];
      const numPts = 100;
      for (let j = 0; j <= numPts; j++) {
        const phi = (j / numPts) * Math.PI;
        points.push(
          sphereRadius * Math.sin(phi) * Math.sin(theta),
          sphereRadius * Math.cos(phi),
          sphereRadius * Math.sin(phi) * Math.cos(theta)
        );
      }
      arcGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const arc = new THREE.Line(arcGeo, ringMat);
      ringsGroup.add(arc);
    }
    domeGroup.add(ringsGroup);

    // D. Intersection Technical Crosshair Nodes (Ultra-fine micro-dots)
    const pointsGeo = new THREE.BufferGeometry();
    const nodePositions: number[] = [];
    for (let i = 0; i < vertexCount; i++) {
      nodePositions.push(originalPositions[i * 3], originalPositions[i * 3 + 1], originalPositions[i * 3 + 2]);
    }
    pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));

    const createNodeTexture = () => {
      const size = 32;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = size;
      tempCanvas.height = size;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.clearRect(0, 0, size, size);
        tempCtx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.6)' : 'rgba(100, 116, 139, 0.6)';
        tempCtx.lineWidth = 2;
        tempCtx.beginPath();
        tempCtx.moveTo(size / 2, 6);
        tempCtx.lineTo(size / 2, size - 6);
        tempCtx.moveTo(6, size / 2);
        tempCtx.lineTo(size - 6, size / 2);
        tempCtx.stroke();
        tempCtx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.75)' : 'rgba(100, 116, 139, 0.75)';
        tempCtx.fillRect(size / 2 - 2, size / 2 - 2, 4, 4);
      }
      return new THREE.CanvasTexture(tempCanvas);
    };

    const pointsMat = new THREE.PointsMaterial({
      size: 3.5,
      map: createNodeTexture(),
      transparent: true,
      opacity: isDark ? 0.14 : 0.12,
      depthTest: true,
      depthWrite: false,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    pointsMesh.renderOrder = 1;
    domeGroup.add(pointsMesh);

    // 3. Mouse Interaction & Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseNorm.x = (clientX / width) * 2 - 1;
      mouseNorm.y = -(clientY / height) * 2 + 1;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseNorm.set(-999, -999);
      isHovering = false;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 4. Animation Frame Loop (Sphere is 100% FIXED; smooth fluid hover deformation)
    let animationFrameId: number;
    const hitVector = new THREE.Vector3();
    const tempVertex = new THREE.Vector3();
    const localHit = new THREE.Vector3();
    const lerpedLocalHit = new THREE.Vector3();
    let hasValidHit = false;
    const inverseDomeMatrix = new THREE.Matrix4();

    const maxElevation = 45;
    const elevationFieldRadius = 220;

    const animate = () => {
      // 100% FIXED and stationary: No rotation, no spinning, no tilt

      // Smooth Localized 3D Surface Deformation on the Micro-Grid
      if (isHovering && mouseNorm.x > -2) {
        raycaster.setFromCamera(mouseNorm, camera);
        const intersects = raycaster.intersectObject(sphereMesh);

        if (intersects.length > 0) {
          hitVector.copy(intersects[0].point);
          inverseDomeMatrix.copy(domeGroup.matrixWorld).invert();
          localHit.copy(hitVector).applyMatrix4(inverseDomeMatrix);

          if (!hasValidHit) {
            lerpedLocalHit.copy(localHit);
            hasValidHit = true;
          } else {
            // Buttery-smooth cursor hit point interpolation
            lerpedLocalHit.lerp(localHit, 0.18);
          }

          const positions = posAttr.array as Float32Array;
          const pointPositions = pointsGeo.attributes.position.array as Float32Array;

          for (let i = 0; i < vertexCount; i++) {
            const ox = originalPositions[i * 3];
            const oy = originalPositions[i * 3 + 1];
            const oz = originalPositions[i * 3 + 2];

            if (oz > 0) {
              tempVertex.set(ox, oy, oz);
              const dist = tempVertex.distanceTo(lerpedLocalHit);

              if (dist < elevationFieldRadius) {
                const normDist = dist / elevationFieldRadius;
                const factor = Math.cos((normDist * Math.PI) / 2) ** 2;
                const elevation = 1 + (factor * maxElevation) / sphereRadius;

                // Smooth organic micro-vertex elevation outward in 3D relief
                positions[i * 3] = ox * elevation;
                positions[i * 3 + 1] = oy * elevation;
                positions[i * 3 + 2] = oz * elevation;

                pointPositions[i * 3] = ox * elevation;
                pointPositions[i * 3 + 1] = oy * elevation;
                pointPositions[i * 3 + 2] = oz * elevation;
              } else {
                positions[i * 3] = ox;
                positions[i * 3 + 1] = oy;
                positions[i * 3 + 2] = oz;

                pointPositions[i * 3] = ox;
                pointPositions[i * 3 + 1] = oy;
                pointPositions[i * 3 + 2] = oz;
              }
            }
          }

          posAttr.needsUpdate = true;
          pointsGeo.attributes.position.needsUpdate = true;
          wireframeMat.opacity = THREE.MathUtils.lerp(wireframeMat.opacity, highlightOpacity, 0.14);
        } else {
          hasValidHit = false;
          // Smoothly return vertices to resting state
          const positions = posAttr.array as Float32Array;
          const pointPositions = pointsGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < vertexCount; i++) {
            positions[i * 3] = originalPositions[i * 3];
            positions[i * 3 + 1] = originalPositions[i * 3 + 1];
            positions[i * 3 + 2] = originalPositions[i * 3 + 2];

            pointPositions[i * 3] = originalPositions[i * 3];
            pointPositions[i * 3 + 1] = originalPositions[i * 3 + 1];
            pointPositions[i * 3 + 2] = originalPositions[i * 3 + 2];
          }
          posAttr.needsUpdate = true;
          pointsGeo.attributes.position.needsUpdate = true;
          wireframeMat.opacity = THREE.MathUtils.lerp(wireframeMat.opacity, wireOpacity, 0.08);
        }
      } else {
        hasValidHit = false;
        wireframeMat.opacity = THREE.MathUtils.lerp(wireframeMat.opacity, wireOpacity, 0.08);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      occluderGeo.dispose();
      occluderMat.dispose();
      sphereGeo.dispose();
      wireframeMat.dispose();
      ringMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}






