import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Moon, Sunset, RotateCw, ZoomIn, Check, Eye } from 'lucide-react';
import { BUILDING_FLOORS } from '../data/mockData';

interface Building3DExplorerProps {
  onSelectUnitFromFloor?: (floor: number) => void;
  onOpenInquire: (context?: string) => void;
}

export const Building3DExplorer: React.FC<Building3DExplorerProps> = ({
  onSelectUnitFromFloor,
  onOpenInquire,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFloor, setSelectedFloor] = useState<number>(7);
  const [lightingMode, setLightingMode] = useState<'day' | 'dusk' | 'night'>('dusk');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References for three.js manipulation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const floorMeshesRef = useRef<Map<number, THREE.Mesh>>(new Map());
  const lightsRef = useRef<{
    ambient?: THREE.AmbientLight;
    directional?: THREE.DirectionalLight;
    pointLights: THREE.PointLight[];
  }>({ pointLights: [] });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fog for atmospheric depth
    scene.fog = new THREE.FogExp2(0x131a12, 0.025);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(28, 22, 32);
    camera.lookAt(0, 10, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.6);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffecd2, 1.8);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    lightsRef.current.directional = dirLight;

    // Ground platform / Piazza
    const groundGeo = new THREE.CylinderGeometry(24, 25, 1, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x182017,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Botanical surrounding foliage (Trees & shrubs around the arbor base)
    const treeGroup = new THREE.Group();
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x2e251b, roughness: 0.9 });
    const treeCanopyMat = new THREE.MeshStandardMaterial({ color: 0x243b22, roughness: 0.7 });

    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const radius = 17 + Math.random() * 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 2.5 + Math.random(), 6);
      const trunk = new THREE.Mesh(trunkGeo, treeTrunkMat);
      trunk.position.set(x, 1, z);

      const canopyGeo = new THREE.DodecahedronGeometry(1.2 + Math.random() * 0.8, 1);
      const canopy = new THREE.Mesh(canopyGeo, treeCanopyMat);
      canopy.position.set(x, 2.5 + Math.random(), z);
      canopy.castShadow = true;

      treeGroup.add(trunk);
      treeGroup.add(canopy);
    }
    scene.add(treeGroup);

    // 5. Build Procedural Belgrade Arbor Tower
    // Featuring organic stepped canopy ribs, floor plates, glass windows
    const buildingGroup = new THREE.Group();
    floorMeshesRef.current.clear();

    const floorHeight = 1.6;
    const totalFloors = 13; // Ground (0) to Penthouse (12)

    for (let f = 0; f < totalFloors; f++) {
      const floorY = f * floorHeight;

      // Base width subtly tapering then stepping at upper balconies
      let widthX = 12;
      let depthZ = 10;

      if (f > 8) {
        // Upper stepped terraces
        widthX = 10.5 - (f - 8) * 0.8;
        depthZ = 8.5 - (f - 8) * 0.7;
      } else if (f < 2) {
        // Colonnade ground/retail level
        widthX = 13;
        depthZ = 11;
      }

      // Concrete / Limestone core slab
      const slabGeo = new THREE.BoxGeometry(widthX, 0.25, depthZ);
      const slabMat = new THREE.MeshStandardMaterial({
        color: 0x2d382c,
        roughness: 0.6,
        metalness: 0.2,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.set(0, floorY, 0);
      slab.receiveShadow = true;
      slab.castShadow = true;
      buildingGroup.add(slab);

      // Floor glass & interior volume
      const glassGeo = new THREE.BoxGeometry(widthX - 0.4, floorHeight - 0.3, depthZ - 0.4);
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x6e8870,
        roughness: 0.2,
        metalness: 0.85,
        transparent: true,
        opacity: 0.85,
        emissive: 0x1a2618,
        emissiveIntensity: 0.4,
      });
      const floorMesh = new THREE.Mesh(glassGeo, glassMat);
      floorMesh.position.set(0, floorY + floorHeight / 2, 0);
      floorMesh.userData = { floorNumber: f };
      buildingGroup.add(floorMesh);

      // Save reference to this floor
      floorMeshesRef.current.set(f, floorMesh);

      // Architectural Canopy Fins (Inspired by tree branches/leaves on facade)
      const finCount = 6;
      for (let fin = 0; fin < finCount; fin++) {
        const finGeo = new THREE.BoxGeometry(0.2, floorHeight + 0.1, 0.8);
        const finMat = new THREE.MeshStandardMaterial({
          color: 0xc8a97e,
          roughness: 0.4,
          metalness: 0.6,
        });
        const finMeshL = new THREE.Mesh(finGeo, finMat);
        const posX = -widthX / 2 + (fin / (finCount - 1)) * widthX;
        finMeshL.position.set(posX, floorY + floorHeight / 2, depthZ / 2 + 0.2);
        finMeshL.rotation.y = (fin % 2 === 0 ? 0.15 : -0.15);
        buildingGroup.add(finMeshL);

        const finMeshR = finMeshL.clone();
        finMeshR.position.z = -depthZ / 2 - 0.2;
        buildingGroup.add(finMeshR);
      }
    }

    // Sky Penthouse Crown Arbor structure (Overhead canopy pergola on roof)
    const crownY = totalFloors * floorHeight;
    const crownPergola = new THREE.Group();
    for (let p = 0; p < 8; p++) {
      const beamGeo = new THREE.BoxGeometry(9, 0.2, 0.4);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0xc8a97e, metalness: 0.7, roughness: 0.3 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, crownY + 0.5, -3 + p * 0.9);
      crownPergola.add(beam);
    }
    buildingGroup.add(crownPergola);

    scene.add(buildingGroup);

    // Mouse Interaction / Orbit simulation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      buildingGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(8, Math.min(38, camera.position.y - deltaY * 0.08));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.02;
      const currentDist = camera.position.length();
      if ((e.deltaY > 0 && currentDist < 60) || (e.deltaY < 0 && currentDist > 16)) {
        camera.position.multiplyScalar(1 + Math.sign(e.deltaY) * zoomSpeed);
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 6. Animation loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      clock.getDelta();

      if (isRotating && !isDragging) {
        buildingGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isRotating]);

  // Update floor highlighting when selectedFloor changes
  useEffect(() => {
    floorMeshesRef.current.forEach((mesh, floorNum) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (floorNum === selectedFloor) {
        mat.emissive.setHex(0xc8a97e);
        mat.emissiveIntensity = 0.85;
        mat.color.setHex(0xe8dfd1);
      } else {
        mat.emissive.setHex(0x1a2618);
        mat.emissiveIntensity = 0.35;
        mat.color.setHex(0x6e8870);
      }
    });
  }, [selectedFloor]);

  // Update lighting conditions
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current.directional || !lightsRef.current.ambient) return;
    const { directional, ambient } = lightsRef.current;
    const scene = sceneRef.current;

    if (lightingMode === 'day') {
      scene.fog = new THREE.FogExp2(0x182417, 0.015);
      ambient.color.setHex(0xffffff);
      ambient.intensity = 0.8;
      directional.color.setHex(0xfffaed);
      directional.intensity = 2.0;
      directional.position.set(35, 50, 30);
    } else if (lightingMode === 'dusk') {
      scene.fog = new THREE.FogExp2(0x141a13, 0.02);
      ambient.color.setHex(0xe2a870);
      ambient.intensity = 0.55;
      directional.color.setHex(0xffaa5e);
      directional.intensity = 2.4;
      directional.position.set(45, 18, 20);
    } else {
      // Night
      scene.fog = new THREE.FogExp2(0x0c110b, 0.035);
      ambient.color.setHex(0x1c2b1e);
      ambient.intensity = 0.4;
      directional.color.setHex(0x8fa3b0);
      directional.intensity = 0.8;
      directional.position.set(10, 30, -25);
    }
  }, [lightingMode]);

  const activeFloorData = BUILDING_FLOORS.find(
    (f) => f.level === selectedFloor || (selectedFloor >= f.level && selectedFloor < f.level + 3)
  ) || BUILDING_FLOORS[2];

  return (
    <section id="3d-explorer" className="relative w-full min-h-screen bg-[#111710] py-20 px-4 sm:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3E562E]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C8A97E] mb-2 font-medium">
              Interactive 3D Spatial Architecture
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F5F3ED] font-light">
              Explore Belgrade Arbor in 3D
            </h2>
          </div>
          <p className="text-sm text-[#A68553] max-w-md font-light leading-relaxed">
            Rotate the complex in real-time, inspect floor elevations, and select levels to preview residences, canopy loggias, and retail pavilions.
          </p>
        </div>

        {/* Explorer Canvas Container */}
        <div className="relative w-full h-[620px] sm:h-[720px] rounded-3xl overflow-hidden border border-[#C8A97E]/20 bg-gradient-to-b from-[#182317] to-[#0E140D] shadow-2xl">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121811] z-20 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#C8A97E]/30 border-t-[#C8A97E] animate-spin" />
              <p className="text-xs tracking-widest uppercase text-[#C8A97E]">Loading 3D Canopy Architecture...</p>
            </div>
          )}

          {/* Three.js Canvas Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Quick HUD Overlay Controls */}
          {/* Top Left: Floor Level Quick Selectors */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 max-h-[75%] overflow-y-auto pr-1">
            <span className="text-[10px] uppercase tracking-widest text-[#C8A97E]/80 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md">
              Select Floor
            </span>
            {[12, 11, 9, 7, 5, 3, 0].map((fl) => (
              <button
                key={fl}
                type="button"
                onClick={() => setSelectedFloor(fl)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-md ${
                  selectedFloor === fl
                    ? 'bg-[#C8A97E] text-[#121811] shadow-lg scale-105 font-bold'
                    : 'bg-[#1D281C]/70 text-[#E8DFD1] hover:bg-[#2A3A29] hover:text-white border border-white/5'
                }`}
              >
                <span className="w-4 text-center">{fl === 0 ? 'G' : fl}</span>
                <span className="text-[10px] hidden sm:inline text-inherit opacity-80">
                  {fl === 12 ? 'Sky Penthouse' : fl === 0 ? 'Ground Colonnade' : `Level ${fl}`}
                </span>
                {selectedFloor === fl && <Check className="w-3 h-3 ml-1" />}
              </button>
            ))}
          </div>

          {/* Top Right: Lighting / Environment Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-full bg-[#182317]/80 backdrop-blur-md border border-[#C8A97E]/20">
            <button
              type="button"
              onClick={() => setLightingMode('day')}
              className={`p-2 rounded-full transition-colors ${
                lightingMode === 'day' ? 'bg-[#C8A97E] text-[#121811]' : 'text-[#E8DFD1] hover:text-white'
              }`}
              title="Day Sunlight"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('dusk')}
              className={`p-2 rounded-full transition-colors ${
                lightingMode === 'dusk' ? 'bg-[#C8A97E] text-[#121811]' : 'text-[#E8DFD1] hover:text-white'
              }`}
              title="Golden Hour Dusk"
            >
              <Sunset className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('night')}
              className={`p-2 rounded-full transition-colors ${
                lightingMode === 'night' ? 'bg-[#C8A97E] text-[#121811]' : 'text-[#E8DFD1] hover:text-white'
              }`}
              title="Illuminated Night"
            >
              <Moon className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-0.5" />
            <button
              type="button"
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded-full transition-colors ${
                isRotating ? 'text-[#C8A97E]' : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Toggle Auto Rotation"
            >
              <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>
          </div>

          {/* Bottom Left: Mouse Interaction Hint */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 text-[11px] text-[#A68553] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
            <ZoomIn className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Click &amp; drag to orbit • Scroll to zoom</span>
          </div>

          {/* Bottom Right: Floor Detail Card */}
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto z-10 sm:max-w-sm rounded-2xl bg-[#192418]/90 backdrop-blur-xl border border-[#C8A97E]/30 p-5 shadow-2xl text-[#E8DFD1]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] font-medium block">
                  {activeFloorData.elevation} Elevation
                </span>
                <h4 className="font-serif text-xl text-[#F5F3ED]">{activeFloorData.name}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#2A3A29] text-[#C8A97E] border border-[#C8A97E]/20">
                {activeFloorData.category}
              </span>
            </div>

            <p className="text-xs text-[#A68553] mb-4 leading-relaxed font-light">
              {selectedFloor === 12
                ? 'Signature Sky Penthouse featuring 4.2m ceiling heights, private wraparound garden loggia, and 360-degree river and city vistas.'
                : selectedFloor === 0
                ? 'Ground level commercial colonnade hosting boutique cafés, artisan bakeries, and high-street retail under the architectural tree canopy.'
                : 'Premium residential apartments with acoustic triple-glazing, organic canopy solar shading, and expansive balconies overlooking New Belgrade.'}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <span className="text-[#C8A97E]">
                <strong>{activeFloorData.unitsAvailable}</strong> units available on this tier
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onSelectUnitFromFloor) {
                    onSelectUnitFromFloor(selectedFloor);
                  } else {
                    onOpenInquire(`Floor ${selectedFloor}`);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#F5F3ED] hover:text-[#C8A97E] font-medium transition-colors"
              >
                <span>View Units</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
