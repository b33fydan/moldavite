import { beforeEach, describe, expect, it } from 'vitest'
import { useSimStore } from '../state/useSimStore'

describe('codex store fields', () => {
  beforeEach(() => {
    useSimStore.setState({
      activeScene: 'magnet',
      activeSection: 'original-codex',
      depth: 2,
      noiseLevel: 0.35,
      dissonanceScore: 24,
      selectedNode: null,
      selectedMirror: null,
      cycleRunning: false,
      explanationMode: 'simple',
    })
  })

  it('tracks Mirror Stack explainer state', () => {
    const s = useSimStore.getState()
    expect(s.activeSection).toBe('original-codex')
    expect(s.depth).toBe(2)
    expect(s.noiseLevel).toBe(0.35)
    expect(s.dissonanceScore).toBe(24)
    expect(s.cycleRunning).toBe(false)
  })

  it('updates explainer navigation and selections', () => {
    useSimStore.getState().setActiveSection('reflect')
    useSimStore.getState().setDepth(5)
    useSimStore.getState().setNoiseLevel(0.9)
    useSimStore.getState().setDissonanceScore(72)
    useSimStore.getState().setSelectedNode('node-b')
    useSimStore.getState().setSelectedMirror('peer-2')
    useSimStore.getState().setCycleRunning(true)
    useSimStore.getState().toggleExplanationMode()

    const s = useSimStore.getState()
    expect(s.activeSection).toBe('reflect')
    expect(s.depth).toBe(5)
    expect(s.noiseLevel).toBe(0.9)
    expect(s.dissonanceScore).toBe(72)
    expect(s.selectedNode).toBe('node-b')
    expect(s.selectedMirror).toBe('peer-2')
    expect(s.cycleRunning).toBe(true)
    expect(s.explanationMode).toBe('technical')
  })
})
