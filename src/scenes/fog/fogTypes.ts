import type * as THREE from 'three'
import type { AssetId } from '../../state/simTypes'

export interface FogSurfacePoint {
  position: THREE.Vector3
  normal: THREE.Vector3
}

export interface FogSurfaceFrame {
  normal: THREE.Vector3
  tangent: THREE.Vector3
  bitangent: THREE.Vector3
}

export interface FogBloomParticle {
  id: string
  position: THREE.Vector3
  normal: THREE.Vector3
  localOffset: THREE.Vector3
  scale: number
  phase: number
  drift: number
  twist: number
}

export interface FogBloomCluster {
  id: string
  asset: AssetId
  surface: FogSurfacePoint
  particles: FogBloomParticle[]
}
