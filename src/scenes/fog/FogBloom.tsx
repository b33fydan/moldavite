import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AssetId } from '../../state/simTypes'
import type { FogBloomCluster, FogBloomParticle } from './fogTypes'

const ASSET_COLORS: Record<AssetId, string> = {
  sphere: '#9be7ff',
  triangle: '#f7d48b',
  capsule: '#f4a7c5',
  cluster: '#d6fff0',
}

const BASE_SIZES: Record<AssetId, number> = {
  sphere: 0.055,
  triangle: 0.09,
  capsule: 0.065,
  cluster: 0.07,
}

function BloomGeometry({ asset }: { asset: AssetId }) {
  switch (asset) {
    case 'sphere':
      return <icosahedronGeometry args={[BASE_SIZES.sphere, 1]} />
    case 'triangle':
      return <coneGeometry args={[BASE_SIZES.triangle, BASE_SIZES.triangle * 1.25, 3]} />
    case 'capsule':
      return <capsuleGeometry args={[BASE_SIZES.capsule * 0.42, BASE_SIZES.capsule * 1.35, 4, 8]} />
    case 'cluster':
      return <boxGeometry args={[BASE_SIZES.cluster, BASE_SIZES.cluster, BASE_SIZES.cluster]} />
  }
}

function BloomParticle({ asset, particle }: { asset: AssetId; particle: FogBloomParticle }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const baseQuaternion = useMemo(() => {
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), particle.normal)
    const spin = new THREE.Quaternion().setFromAxisAngle(particle.normal, particle.twist)
    return quaternion.multiply(spin)
  }, [particle.normal, particle.twist])

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return

    const elapsed = clock.elapsedTime
    const age = Math.max(0, elapsed - particle.phase * 0.05)
    const fade = Math.min(1, age * 0.8)
    const breath = 1 + Math.sin(elapsed * 1.15 + particle.phase) * 0.09
    const drift = Math.sin(elapsed * 0.42 + particle.phase) * 0.035 * particle.drift

    group.position.copy(particle.position).addScaledVector(particle.normal, drift)
    group.quaternion.copy(baseQuaternion)
    group.scale.setScalar(particle.scale * fade * breath)

    if (materialRef.current) {
      materialRef.current.opacity = 0.22 + fade * 0.58
      materialRef.current.emissiveIntensity = 0.08 + fade * 0.14
    }
  })

  return (
    <group ref={groupRef} position={particle.position} scale={0.01}>
      <mesh>
        <BloomGeometry asset={asset} />
        <meshStandardMaterial
          ref={materialRef}
          color={ASSET_COLORS[asset]}
          emissive={ASSET_COLORS[asset]}
          emissiveIntensity={0.08}
          roughness={0.78}
          metalness={0.05}
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export function FogBloom({ bloom }: { bloom: FogBloomCluster }) {
  return (
    <group>
      {bloom.particles.map((particle) => (
        <BloomParticle key={particle.id} asset={bloom.asset} particle={particle} />
      ))}
    </group>
  )
}
