import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import type { AssetId } from '../../state/simTypes'
import { SPHERE_RADIUS } from '../../scene/CentralSphere'
import { computeAttractionForce, shouldSettle } from './magnetForces'
import { COLORS } from '../../constants/theme'

const SPHERE_CENTER = new THREE.Vector3(0, 0, 0)
const _vel = new THREE.Vector3()
const _pos = new THREE.Vector3()
const _force = new THREE.Vector3()

const ASSET_COLORS: Record<AssetId, string> = {
  sphere: COLORS.cyan,
  capsule: COLORS.pink,
  triangle: COLORS.selected,
  cluster: COLORS.warmWhite,
}

function AssetGeometry({ asset }: { asset: AssetId }) {
  switch (asset) {
    case 'sphere':
      return <icosahedronGeometry args={[0.12, 1]} />
    case 'capsule':
      return <capsuleGeometry args={[0.06, 0.2, 4, 8]} />
    case 'triangle':
      return <coneGeometry args={[0.12, 0.2, 3]} />
    case 'cluster':
      return <dodecahedronGeometry args={[0.1, 0]} />
  }
}

interface Props {
  id: string
  asset: AssetId
  position: [number, number, number]
}

export function MagnetBody({ asset, position }: Props) {
  const rigidRef = useRef<RapierRigidBody>(null)
  const [settled, setSettled] = useState(false)
  const settledPos = useRef<THREE.Vector3 | null>(null)
  const scaleRef = useRef(0.01)

  useFrame((_, delta) => {
    const rb = rigidRef.current
    if (!rb || settled) return

    const t = rb.translation()
    _pos.set(t.x, t.y, t.z)

    const v = rb.linvel()
    _vel.set(v.x, v.y, v.z)

    if (shouldSettle(_pos, SPHERE_CENTER, SPHERE_RADIUS, _vel)) {
      const normal = _pos.clone().sub(SPHERE_CENTER).normalize()
      settledPos.current = SPHERE_CENTER.clone().add(normal.multiplyScalar(SPHERE_RADIUS + 0.12))
      rb.setBodyType(2, true) // kinematic
      rb.setTranslation(settledPos.current, true)
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
      setSettled(true)
      return
    }

    _force.copy(computeAttractionForce(_pos, SPHERE_CENTER, SPHERE_RADIUS))
    rb.applyImpulse(_force.multiplyScalar(delta), true)

    const lv = rb.linvel()
    rb.setLinvel({ x: lv.x * 0.96, y: lv.y * 0.96, z: lv.z * 0.96 }, true)
  })

  useFrame((_, delta) => {
    if (scaleRef.current < 1) {
      scaleRef.current = Math.min(1, scaleRef.current + delta * 4)
    }
  })

  return (
    <RigidBody
      ref={rigidRef}
      position={position}
      colliders="ball"
      restitution={0.1}
      friction={0.5}
      linearDamping={0.5}
      mass={0.1}
    >
      <mesh scale={scaleRef.current}>
        <AssetGeometry asset={asset} />
        <meshStandardMaterial
          color={ASSET_COLORS[asset]}
          roughness={0.4}
          metalness={0.6}
          flatShading
          emissive={ASSET_COLORS[asset]}
          emissiveIntensity={0.15}
        />
      </mesh>
    </RigidBody>
  )
}
