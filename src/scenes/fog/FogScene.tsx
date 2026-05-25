import { useCallback, useRef, useState } from 'react'
import { useSimStore } from '../../state/useSimStore'
import { createFogBloom } from './fogBloomMath'
import { FogBloom } from './FogBloom'
import { FogSphere } from './FogSphere'
import type { FogBloomCluster, FogSurfacePoint } from './fogTypes'

const MAX_BLOOMS = 36

function FogSceneInner() {
  const [blooms, setBlooms] = useState<FogBloomCluster[]>([])
  const idCounter = useRef(0)
  const selectedAsset = useSimStore((s) => s.selectedAsset)

  const handleSurfaceClick = useCallback(
    (surface: FogSurfacePoint) => {
      const id = `fog-${idCounter.current++}`
      const bloom = createFogBloom({
        id,
        asset: selectedAsset,
        surface,
        seed: idCounter.current * 97,
      })

      setBlooms((prev) => [...prev, bloom].slice(-MAX_BLOOMS))
    },
    [selectedAsset],
  )

  return (
    <group>
      <FogSphere onSurfaceClick={handleSurfaceClick} />
      {blooms.map((bloom) => (
        <FogBloom key={bloom.id} bloom={bloom} />
      ))}
    </group>
  )
}

export function FogScene() {
  const resetNonce = useSimStore((s) => s.resetNonce)

  return <FogSceneInner key={resetNonce} />
}
