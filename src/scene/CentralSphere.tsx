import { useRef } from 'react'
import * as THREE from 'three'

export const SPHERE_RADIUS = 2

export function CentralSphere() {
  const ref = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[SPHERE_RADIUS, 2]} />
      <meshStandardMaterial
        color="#1a1c28"
        roughness={0.7}
        metalness={0.3}
        flatShading
      />
    </mesh>
  )
}
