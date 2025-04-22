'use client'


import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

function Shelf({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[2, 3, 1]} />
      <meshStandardMaterial color="#a3a3a3" />
    </mesh>
  )
}

function WarehouseScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f4f4f4" />
      </mesh>

      {/* Shelves */}
      <Shelf position={[-4, 1.5, -2]} />
      <Shelf position={[0, 1.5, -2]} />
      <Shelf position={[4, 1.5, -2]} />
      <Shelf position={[-2, 1.5, 2]} />
      <Shelf position={[2, 1.5, 2]} />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function WarehouseBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <WarehouseScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
