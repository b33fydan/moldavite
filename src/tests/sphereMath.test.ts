import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import {
  nearestPointOnSphere,
  sphereNormal,
  distanceToSphere,
} from '../simulation/sphereMath'

describe('sphereMath', () => {
  const center = new THREE.Vector3(0, 0, 0)
  const radius = 2

  describe('nearestPointOnSphere', () => {
    it('returns a point on the sphere surface', () => {
      const point = new THREE.Vector3(5, 0, 0)
      const result = nearestPointOnSphere(point, center, radius)
      expect(result.distanceTo(center)).toBeCloseTo(radius)
    })

    it('preserves direction from center', () => {
      const point = new THREE.Vector3(0, 10, 0)
      const result = nearestPointOnSphere(point, center, radius)
      expect(result.x).toBeCloseTo(0)
      expect(result.y).toBeCloseTo(2)
      expect(result.z).toBeCloseTo(0)
    })
  })

  describe('sphereNormal', () => {
    it('returns normalized vector pointing outward', () => {
      const point = new THREE.Vector3(2, 0, 0)
      const normal = sphereNormal(point, center)
      expect(normal.length()).toBeCloseTo(1)
      expect(normal.x).toBeCloseTo(1)
    })
  })

  describe('distanceToSphere', () => {
    it('returns positive distance for point outside sphere', () => {
      const point = new THREE.Vector3(5, 0, 0)
      expect(distanceToSphere(point, center, radius)).toBeCloseTo(3)
    })

    it('returns negative distance for point inside sphere', () => {
      const point = new THREE.Vector3(1, 0, 0)
      expect(distanceToSphere(point, center, radius)).toBeCloseTo(-1)
    })

    it('returns zero for point on surface', () => {
      const point = new THREE.Vector3(2, 0, 0)
      expect(distanceToSphere(point, center, radius)).toBeCloseTo(0)
    })
  })
})
