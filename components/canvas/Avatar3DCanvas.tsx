'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SpeechLipSyncEngine, VisemeFrame } from '@/lib/speechLipSync';

interface Avatar3DCanvasProps {
  lipSyncEngine: SpeechLipSyncEngine;
  isActive: boolean;
  isSpeaking: boolean;
  className?: string;
}

export function Avatar3DCanvas({
  lipSyncEngine,
  isActive,
  isSpeaking,
  className = '',
}: Avatar3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = canvas.clientWidth || 320;
    const height = canvas.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    keyLight.position.set(1.2, 1.8, 2.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLight.position.set(-1.5, 1.5, -1.5);
    scene.add(rimLight);

    // 3. 3D Character Head Container (For full 3D Gaze & Head Tilt tracking)
    const headGroup = new THREE.Group();
    scene.add(headGroup);

    // Load High-Res Likeness Avatar Texture
    const textureLoader = new THREE.TextureLoader();
    const avatarTexture = textureLoader.load('/julian_avatar.jpg');
    avatarTexture.colorSpace = THREE.SRGBColorSpace;
    avatarTexture.minFilter = THREE.LinearFilter;
    avatarTexture.magFilter = THREE.LinearFilter;

    // A. Base 3D Curved Avatar Portrait Mesh
    const portraitGeo = new THREE.PlaneGeometry(1.65, 1.65, 32, 32);
    // Subtle convex 3D curvature
    const pos = portraitGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const dist = Math.sqrt(u * u + v * v);
      pos.setZ(i, -dist * dist * 0.18);
    }
    portraitGeo.computeVertexNormals();

    const portraitMat = new THREE.MeshStandardMaterial({
      map: avatarTexture,
      roughness: 0.6,
      metalness: 0.05,
    });

    const portraitMesh = new THREE.Mesh(portraitGeo, portraitMat);
    portraitMesh.position.set(0, 0, 0);
    headGroup.add(portraitMesh);

    // B. Real-Time Dynamic 3D Mouth & Lip-Sync Canvas Layer
    const mouthCanvas = document.createElement('canvas');
    mouthCanvas.width = 256;
    mouthCanvas.height = 160;
    const mouthCtx = mouthCanvas.getContext('2d');
    const mouthTexture = new THREE.CanvasTexture(mouthCanvas);
    mouthTexture.minFilter = THREE.LinearFilter;

    const mouthGeo = new THREE.PlaneGeometry(0.38, 0.24);
    const mouthMat = new THREE.MeshBasicMaterial({
      map: mouthTexture,
      transparent: true,
      depthWrite: false,
    });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    // Position exactly over Julian's avatar mouth coordinates
    mouthMesh.position.set(0.005, -0.19, 0.03);
    headGroup.add(mouthMesh);

    // C. Procedural Eyelid Blinking Canvas Layers (Left & Right Eyes)
    const blinkCanvas = document.createElement('canvas');
    blinkCanvas.width = 256;
    blinkCanvas.height = 128;
    const blinkCtx = blinkCanvas.getContext('2d');
    const blinkTexture = new THREE.CanvasTexture(blinkCanvas);
    blinkTexture.minFilter = THREE.LinearFilter;

    const blinkGeo = new THREE.PlaneGeometry(0.72, 0.22);
    const blinkMat = new THREE.MeshBasicMaterial({
      map: blinkTexture,
      transparent: true,
      depthWrite: false,
    });
    const blinkMesh = new THREE.Mesh(blinkGeo, blinkMat);
    // Position over eyes behind glasses
    blinkMesh.position.set(0.005, 0.065, 0.025);
    headGroup.add(blinkMesh);

    // D. 3D Glasses Specular Glint Plane (Moves with light & cursor)
    const glintGeo = new THREE.PlaneGeometry(0.74, 0.24);
    const glintMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 0.4,
      transparent: true,
      roughness: 0.05,
      reflectivity: 0.8,
      clearcoat: 1.0,
    });
    const glintMesh = new THREE.Mesh(glintGeo, glintMat);
    glintMesh.position.set(0.005, 0.07, 0.04);
    headGroup.add(glintMesh);

    // Render Procedural Mouth Visemes on Dynamic Canvas
    const drawMouth = (viseme: VisemeFrame) => {
      if (!mouthCtx) return;
      const w = mouthCanvas.width;
      const h = mouthCanvas.height;
      mouthCtx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Base skin tones matching Julian's portrait
      const skinTone = '#b97a4d';
      const skinShadow = '#98603a';
      const lipColor = '#8e4b38';
      const lipHighlight = '#a85b46';
      const oralCavity = '#1a0508';
      const teethColor = '#f8f9fa';

      const openY = viseme.jawOpen * 28;
      const smileW = viseme.mouthSmile * 16;
      const puckerW = viseme.mouthPucker * 20;
      const mouthWidth = Math.max(30, 48 + smileW - puckerW);
      const mouthHeight = Math.max(4, 6 + openY);

      if (viseme.jawOpen > 0.05) {
        // 1. Oral Cavity
        mouthCtx.save();
        mouthCtx.beginPath();
        mouthCtx.ellipse(cx, cy, mouthWidth, mouthHeight, 0, 0, Math.PI * 2);
        mouthCtx.fillStyle = oralCavity;
        mouthCtx.fill();

        // 2. Upper Teeth
        mouthCtx.beginPath();
        mouthCtx.rect(cx - mouthWidth * 0.65, cy - mouthHeight * 0.9, mouthWidth * 1.3, mouthHeight * 0.6);
        mouthCtx.fillStyle = teethColor;
        mouthCtx.fill();

        // 3. Lower Teeth
        if (viseme.jawOpen > 0.4) {
          mouthCtx.beginPath();
          mouthCtx.rect(cx - mouthWidth * 0.5, cy + mouthHeight * 0.35, mouthWidth * 1.0, mouthHeight * 0.5);
          mouthCtx.fillStyle = teethColor;
          mouthCtx.fill();
        }

        // 4. Tongue
        mouthCtx.beginPath();
        mouthCtx.ellipse(cx, cy + mouthHeight * 0.6, mouthWidth * 0.5, mouthHeight * 0.4, 0, 0, Math.PI * 2);
        mouthCtx.fillStyle = '#b3394a';
        mouthCtx.fill();
        mouthCtx.restore();
      }

      // 5. Upper Lip Outline
      mouthCtx.save();
      mouthCtx.beginPath();
      mouthCtx.moveTo(cx - mouthWidth - 4, cy - 2);
      mouthCtx.quadraticCurveTo(cx - mouthWidth * 0.4, cy - 6 - viseme.mouthSmile * 4, cx, cy - 4);
      mouthCtx.quadraticCurveTo(cx + mouthWidth * 0.4, cy - 6 - viseme.mouthSmile * 4, cx + mouthWidth + 4, cy - 2);
      mouthCtx.quadraticCurveTo(cx, cy + 1, cx - mouthWidth - 4, cy - 2);
      mouthCtx.fillStyle = lipColor;
      mouthCtx.fill();

      // 6. Lower Lip Outline
      mouthCtx.beginPath();
      mouthCtx.moveTo(cx - mouthWidth - 4, cy + 2);
      mouthCtx.quadraticCurveTo(cx, cy + mouthHeight + 6, cx + mouthWidth + 4, cy + 2);
      mouthCtx.quadraticCurveTo(cx, cy + mouthHeight - 1, cx - mouthWidth - 4, cy + 2);
      mouthCtx.fillStyle = lipHighlight;
      mouthCtx.fill();

      // Subtle Mustache / Stubble blending
      mouthCtx.beginPath();
      mouthCtx.ellipse(cx, cy - 10, mouthWidth * 0.7, 4, 0, 0, Math.PI * 2);
      mouthCtx.fillStyle = 'rgba(24, 20, 18, 0.15)';
      mouthCtx.fill();

      mouthCtx.restore();
      mouthTexture.needsUpdate = true;
    };

    // Render Procedural Eyelids on Blink
    const drawEyelids = (blinkVal: number) => {
      if (!blinkCtx) return;
      const w = blinkCanvas.width;
      const h = blinkCanvas.height;
      blinkCtx.clearRect(0, 0, w, h);

      if (blinkVal > 0.05) {
        blinkCtx.save();
        const skinTone = '#b97a4d';
        const eyeW = 46;
        const eyeH = 28 * blinkVal;

        // Left Eye (x: 72, y: 64)
        blinkCtx.beginPath();
        blinkCtx.ellipse(74, 64, eyeW, eyeH, 0, 0, Math.PI * 2);
        blinkCtx.fillStyle = skinTone;
        blinkCtx.fill();
        blinkCtx.strokeStyle = '#221115';
        blinkCtx.lineWidth = 3;
        blinkCtx.stroke();

        // Right Eye (x: 182, y: 64)
        blinkCtx.beginPath();
        blinkCtx.ellipse(182, 64, eyeW, eyeH, 0, 0, Math.PI * 2);
        blinkCtx.fillStyle = skinTone;
        blinkCtx.fill();
        blinkCtx.strokeStyle = '#221115';
        blinkCtx.lineWidth = 3;
        blinkCtx.stroke();

        blinkCtx.restore();
      }
      blinkTexture.needsUpdate = true;
    };

    // 4. Animation Frame Loop (Full 60fps 3D Lip-Sync & Head Gaze)
    let animationFrameId: number;
    let lastTime = performance.now() / 1000;

    const animate = () => {
      const now = performance.now() / 1000;
      const delta = Math.min(now - lastTime, 0.1);
      lastTime = now;

      if (isActive) {
        // Smooth mouse tracking
        mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, mousePos.current.targetX, 0.08);
        mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, mousePos.current.targetY, 0.08);

        // Update Visemes & Facial Animation
        const viseme = lipSyncEngine.update(delta, mousePos.current.x, mousePos.current.y);

        // Update Dynamic Morph Textures
        drawMouth(viseme);
        drawEyelids(viseme.eyeBlink);

        // 3D Head Gaze & Tilt Tracking
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mousePos.current.x * 0.22, 0.1);
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mousePos.current.y * 0.16, 0.1);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, -mousePos.current.x * 0.05, 0.1);

        // Breathing sway
        headGroup.position.y = Math.sin(now * 1.6) * 0.015;

        // Eyebrow lift displacement
        blinkMesh.position.y = 0.065 + viseme.browInnerUp * 0.012;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = canvas.clientWidth || 320;
      const h = canvas.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      portraitGeo.dispose();
      portraitMat.dispose();
      mouthGeo.dispose();
      mouthMat.dispose();
      mouthTexture.dispose();
      blinkGeo.dispose();
      blinkMat.dispose();
      blinkTexture.dispose();
      glintGeo.dispose();
      glintMat.dispose();
      renderer.dispose();
    };
  }, [isActive, lipSyncEngine]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
