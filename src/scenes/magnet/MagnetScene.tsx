import { useCallback, useRef, useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'
import { MagnetSphere } from './MagnetSphere'
import { MagnetBody } from './MagnetBody'
import { useSimStore } from '../../state/useSimStore'
import type { AssetId } from '../../state/simTypes'
import { SPHERE_RADIUS } from '../../scene/CentralSphere'

interface SpawnedObj {
  id: string
  asset: AssetId
  position: [number, number, number]
}

const MAX_OBJECTS = 75

function MagnetSceneInner() {
  const [objects, setObjects] = useState<SpawnedObj[]>([])
  const idCounter = useRef(0)
  const selectedAsset = useSimStore((s) => s.selectedAsset)
  const resetNonce = useSimStore((s) => s.resetNonce)
  const { camera } = useThree()

  useEffect(() => {
    setObjects([])
    idCounter.current = 0
  }, [resetNonce])

  const handleClick = useCallback(
    (e: THREE.Event & { nativeEvent?: PointerEvent; point?: THREE.Vector3 }) => {
      const ne = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent
      if (ne?.button !== 0) return
      if (objects.length >= MAX_OBJECTS) return

      const point = (e as unknown as { point: THREE.Vector3 }).point
      if (!point) return

      const dir = point.clone().sub(camera.position).normalize()
      const spawnPos = camera.position
        .clone()
        .add(dir.multiplyScalar(SPHERE_RADIUS + 2.5))

      const id = `magnet-${idCounter.current++}`
      setObjects((prev) => [
        ...prev,
        {
          id,
          asset: selectedAsset,
          position: [spawnPos.x, spawnPos.y, spawnPos.z],
        },
      ])
    },
    [objects.length, selectedAsset, camera],
  )

  return (
    <group>
      <MagnetSphere />
      <mesh
        visible={false}
        onPointerDown={handleClick}
      >
        <sphereGeometry args={[20, 16, 16]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>
      {objects.map((obj) => (
        <MagnetBody
          key={obj.id}
          id={obj.id}
          asset={obj.asset}
          position={obj.position}
        />
      ))}
    </group>
  )
}

export function MagnetScene() {
  return (
    <Physics gravity={[0, 0, 0]} timeStep={1 / 60}>
      <MagnetSceneInner />
    </Physics>
  )
}
