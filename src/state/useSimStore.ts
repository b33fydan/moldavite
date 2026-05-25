import { create } from 'zustand'
import type { SceneId, AssetId, CodexSectionId, ExplanationMode } from './simTypes'

interface SimState {
  activeScene: SceneId
  selectedAsset: AssetId
  resetNonce: number
  activeSection: CodexSectionId
  depth: number
  noiseLevel: number
  dissonanceScore: number
  selectedNode: string | null
  selectedMirror: string | null
  cycleRunning: boolean
  explanationMode: ExplanationMode
  setActiveScene: (scene: SceneId) => void
  setSelectedAsset: (asset: AssetId) => void
  resetScene: () => void
  setActiveSection: (section: CodexSectionId) => void
  setDepth: (depth: number) => void
  setNoiseLevel: (noiseLevel: number) => void
  setDissonanceScore: (score: number) => void
  setSelectedNode: (node: string | null) => void
  setSelectedMirror: (mirror: string | null) => void
  setCycleRunning: (running: boolean) => void
  toggleExplanationMode: () => void
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const useSimStore = create<SimState>((set) => ({
  activeScene: 'magnet',
  selectedAsset: 'sphere',
  resetNonce: 0,
  activeSection: 'original-codex',
  depth: 2,
  noiseLevel: 0.35,
  dissonanceScore: 24,
  selectedNode: null,
  selectedMirror: null,
  cycleRunning: false,
  explanationMode: 'simple',
  setActiveScene: (scene) => set({ activeScene: scene, resetNonce: 0 }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  resetScene: () => set((s) => ({ resetNonce: s.resetNonce + 1 })),
  setActiveSection: (section) => set({
    activeSection: section,
    selectedNode: null,
    selectedMirror: null,
    cycleRunning: false,
  }),
  setDepth: (depth) => set({ depth: Math.round(clamp(depth, 1, 7)) }),
  setNoiseLevel: (noiseLevel) => set({ noiseLevel: clamp(noiseLevel, 0, 1) }),
  setDissonanceScore: (score) => set({ dissonanceScore: Math.round(clamp(score, 0, 100)) }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setSelectedMirror: (mirror) => set({ selectedMirror: mirror }),
  setCycleRunning: (running) => set({ cycleRunning: running }),
  toggleExplanationMode: () => set((s) => ({
    explanationMode: s.explanationMode === 'simple' ? 'technical' : 'simple',
  })),
}))
