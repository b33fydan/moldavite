import { describe, it, expect, beforeEach } from 'vitest'
import { useSimStore } from '../state/useSimStore'

describe('useSimStore', () => {
  beforeEach(() => {
    useSimStore.setState({
      activeScene: 'magnet',
      selectedAsset: 'sphere',
      resetNonce: 0,
    })
  })

  it('has correct initial state', () => {
    const state = useSimStore.getState()
    expect(state.activeScene).toBe('magnet')
    expect(state.selectedAsset).toBe('sphere')
    expect(state.resetNonce).toBe(0)
  })

  it('changes active scene', () => {
    useSimStore.getState().setActiveScene('fog')
    expect(useSimStore.getState().activeScene).toBe('fog')
  })

  it('resets nonce when changing scene', () => {
    useSimStore.getState().resetScene()
    expect(useSimStore.getState().resetNonce).toBe(1)
    useSimStore.getState().setActiveScene('fog')
    expect(useSimStore.getState().resetNonce).toBe(0)
  })

  it('changes selected asset', () => {
    useSimStore.getState().setSelectedAsset('triangle')
    expect(useSimStore.getState().selectedAsset).toBe('triangle')
  })

  it('increments resetNonce', () => {
    useSimStore.getState().resetScene()
    useSimStore.getState().resetScene()
    expect(useSimStore.getState().resetNonce).toBe(2)
  })
})
