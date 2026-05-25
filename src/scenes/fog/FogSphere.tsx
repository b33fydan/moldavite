import { useCallback, useRef } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { SPHERE_RADIUS } from '../../scene/CentralSphere'
import { projectToSphereSurface } from './fogBloomMath'
import type { FogSurfacePoint } from './fogTypes'

interface Props {
  onSurfaceClick: (surface: FogSurfacePoint) => void
}

export function FogSphere({ onSurfaceClick }: Props) {
  const meshRef = useRef<THREE.Mesh>(null)

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (event.nativeEvent.button !== 0) return

      event.stopPropagation()
      const localPoint = meshRef.current?.worldToLocal(event.point.clone()) ?? event.point.clone()
      onSurfaceClick(projectToSphereSurface(localPoint, SPHERE_RADIUS))
    },
    [onSurfaceClick],
  )

  return (
    <group>
      <mesh ref={meshRef} onPointerDown={handlePointerDown}>
        <sphereGeometry args={[SPHERE_RADIUS, 48, 32]} />
        <meshStandardMaterial
          color="#222633"
          roughness={0.92}
          metalness={0.05}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[SPHERE_RADIUS, 48, 32]} />
        <meshStandardMaterial
          color="#c7f4ff"
          emissive="#5cc7d8"
          emissiveIntensity={0.08}
          roughness={1}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
