import { create } from 'zustand'
import type { SceneId, AssetId } from './simTypes'

interface SimState {
  activeScene: SceneId
  selectedAsset: AssetId
  resetNonce: number
  setActiveScene: (scene: SceneId) => void
  setSelectedAsset: (asset: AssetId) => void
  resetScene: () => void
}

export const useSimStore = create<SimState>((set) => ({
  activeScene: 'magnet',
  selectedAsset: 'sphere',
  resetNonce: 0,
  setActiveScene: (scene) => set({ activeScene: scene, resetNonce: 0 }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  resetScene: () => set((s) => ({ resetNonce: s.resetNonce + 1 })),
}))
