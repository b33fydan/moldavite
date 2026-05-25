import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import {
  computeAttractionForce,
  shouldSettle,
  MAX_FORCE,
} from '../scenes/magnet/magnetForces'

describe('magnetForces', () => {
  const sphereCenter = new THREE.Vector3(0, 0, 0)
  const sphereRadius = 2

  describe('computeAttractionForce', () => {
    it('pulls toward sphere center', () => {
      const pos = new THREE.Vector3(5, 0, 0)
      const force = computeAttractionForce(pos, sphereCenter, sphereRadius)
      expect(force.x).toBeLessThan(0)
      expect(force.y).toBeCloseTo(0)
      expect(force.z).toBeCloseTo(0)
    })

    it('returns zero force at sphere surface', () => {
      const pos = new THREE.Vector3(2, 0, 0)
      const force = computeAttractionForce(pos, sphereCenter, sphereRadius)
      expect(force.length()).toBeCloseTo(0)
    })

    it('caps force magnitude', () => {
      const pos = new THREE.Vector3(2.1, 0, 0)
      const force = computeAttractionForce(pos, sphereCenter, sphereRadius)
      expect(force.length()).toBeLessThanOrEqual(MAX_FORCE + 0.01)
    })
  })

  describe('shouldSettle', () => {
    it('returns true when close and slow', () => {
      const pos = new THREE.Vector3(2.1, 0, 0)
      const vel = new THREE.Vector3(0.01, 0, 0)
      expect(shouldSettle(pos, sphereCenter, sphereRadius, vel)).toBe(true)
    })

    it('returns false when far from surface', () => {
      const pos = new THREE.Vector3(5, 0, 0)
      const vel = new THREE.Vector3(0, 0, 0)
      expect(shouldSettle(pos, sphereCenter, sphereRadius, vel)).toBe(false)
    })

    it('returns false when moving fast', () => {
      const pos = new THREE.Vector3(2.1, 0, 0)
      const vel = new THREE.Vector3(2, 0, 0)
      expect(shouldSettle(pos, sphereCenter, sphereRadius, vel)).toBe(false)
    })
  })
})
