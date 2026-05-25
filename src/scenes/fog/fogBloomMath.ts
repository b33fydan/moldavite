import * as THREE from 'three'
import type { AssetId } from '../../state/simTypes'
import type { FogBloomCluster, FogBloomParticle, FogSurfaceFrame, FogSurfacePoint } from './fogTypes'

const FALLBACK_NORMAL = new THREE.Vector3(0, 0, 1)
const Y_AXIS = new THREE.Vector3(0, 1, 0)

interface BloomOptions {
  id: string
  asset: AssetId
  surface: FogSurfacePoint
  seed: number
  count?: number
}

function seededRandom(seed: number) {
  let state = seed >>> 0

  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function projectToSphereSurface(hitPoint: THREE.Vector3, sphereRadius: number): FogSurfacePoint {
  const normal = hitPoint.lengthSq() > 0 ? hitPoint.clone().normalize() : FALLBACK_NORMAL.clone()

  return {
    position: normal.clone().multiplyScalar(sphereRadius),
    normal,
  }
}

export function createSurfaceFrame(normal: THREE.Vector3): FogSurfaceFrame {
  const normalized = normal.lengthSq() > 0 ? normal.clone().normalize() : FALLBACK_NORMAL.clone()
  const reference = Math.abs(normalized.dot(Y_AXIS)) > 0.92 ? new THREE.Vector3(1, 0, 0) : Y_AXIS
  const tangent = new THREE.Vector3().crossVectors(reference, normalized).normalize()
  const bitangent = new THREE.Vector3().crossVectors(normalized, tangent).normalize()

  return {
    normal: normalized,
    tangent,
    bitangent,
  }
}

export function createFogBloom({ id, asset, surface, seed, count = 18 }: BloomOptions): FogBloomCluster {
  const random = seededRandom(seed)
  const frame = createSurfaceFrame(surface.normal)
  const sphereRadius = surface.position.length()
  const particles: FogBloomParticle[] = []

  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2
    const radial = Math.sqrt(random()) * 0.32
    const lift = 0.025 + random() * 0.065
    const tangentOffset = Math.cos(angle) * radial
    const bitangentOffset = Math.sin(angle) * radial
    const surfacePosition = surface.position
      .clone()
      .add(frame.tangent.clone().multiplyScalar(tangentOffset))
      .add(frame.bitangent.clone().multiplyScalar(bitangentOffset))
      .normalize()
      .multiplyScalar(sphereRadius + lift)
    const particleNormal = surfacePosition.clone().normalize()

    particles.push({
      id: `${id}-p${index}`,
      position: surfacePosition,
      normal: particleNormal,
      localOffset: new THREE.Vector3(tangentOffset, bitangentOffset, lift),
      scale: 0.65 + random() * 0.75,
      phase: random() * Math.PI * 2,
      drift: 0.35 + random() * 0.65,
      twist: random() * Math.PI * 2,
    })
  }

  return {
    id,
    asset,
    surface: {
      position: surface.position.clone(),
      normal: surface.normal.clone(),
    },
    particles,
  }
}
