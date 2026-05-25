import type { AssetId } from '../../state/simTypes'
import * as THREE from 'three'

export interface MagnetObject {
  id: string
  asset: AssetId
  position: THREE.Vector3
  settled: boolean
}
