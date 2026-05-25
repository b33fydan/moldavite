import type { AssetId, SceneId } from '../state/simTypes'

export interface AssetDef {
  id: AssetId
  label: string
  icon: string
}

export const SCENE_ASSETS: Record<SceneId, AssetDef[]> = {
  magnet: [
    { id: 'sphere', label: 'Sphere', icon: '●' },
    { id: 'capsule', label: 'Capsule', icon: '⬮' },
    { id: 'triangle', label: 'Shard', icon: '▲' },
    { id: 'cluster', label: 'Cluster', icon: '⁘' },
  ],
  fog: [
    { id: 'sphere', label: 'Spheres', icon: '●' },
    { id: 'triangle', label: 'Triangles', icon: '▲' },
    { id: 'capsule', label: 'Pins', icon: '⬮' },
    { id: 'cluster', label: 'Cubelets', icon: '⁘' },
  ],
  meshGarden: [
    { id: 'sphere', label: 'Bud', icon: '●' },
    { id: 'triangle', label: 'Shard', icon: '▲' },
    { id: 'capsule', label: 'Stem', icon: '⬮' },
    { id: 'cluster', label: 'Node', icon: '⁘' },
  ],
}
