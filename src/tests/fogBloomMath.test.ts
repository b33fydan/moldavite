import { describe, expect, it } from 'vitest'
import * as THREE from 'three'
import {
  createFogBloom,
  createSurfaceFrame,
  projectToSphereSurface,
} from '../scenes/fog/fogBloomMath'

describe('fogBloomMath', () => {
  describe('projectToSphereSurface', () => {
    it('projects a hit point to the requested sphere radius', () => {
      const projected = projectToSphereSurface(new THREE.Vector3(4, 1, 0), 2)

      expect(projected.position.length()).toBeCloseTo(2)
      expect(projected.normal.length()).toBeCloseTo(1)
      expect(projected.position.clone().normalize().dot(projected.normal)).toBeCloseTo(1)
    })

    it('falls back to the forward surface when the hit is at sphere center', () => {
      const projected = projectToSphereSurface(new THREE.Vector3(0, 0, 0), 2)

      expect(projected.position.toArray()).toEqual([0, 0, 2])
      expect(projected.normal.toArray()).toEqual([0, 0, 1])
    })
  })

  describe('createSurfaceFrame', () => {
    it('returns an orthonormal tangent frame around the surface normal', () => {
      const normal = new THREE.Vector3(0.25, 0.75, 0.5).normalize()
      const frame = createSurfaceFrame(normal)

      expect(frame.tangent.length()).toBeCloseTo(1)
      expect(frame.bitangent.length()).toBeCloseTo(1)
      expect(frame.normal.length()).toBeCloseTo(1)
      expect(frame.tangent.dot(frame.normal)).toBeCloseTo(0)
      expect(frame.bitangent.dot(frame.normal)).toBeCloseTo(0)
      expect(frame.tangent.dot(frame.bitangent)).toBeCloseTo(0)
    })
  })

  describe('createFogBloom', () => {
    it('creates deterministic particles clustered around a surface point', () => {
      const surface = projectToSphereSurface(new THREE.Vector3(0, 2, 0), 2)
      const first = createFogBloom({
        id: 'bloom-0',
        asset: 'triangle',
        surface,
        seed: 7,
      })
      const second = createFogBloom({
        id: 'bloom-0',
        asset: 'triangle',
        surface,
        seed: 7,
      })

      expect(first).toEqual(second)
      expect(first.particles).toHaveLength(18)
      expect(first.asset).toBe('triangle')
    })

    it('places particles slightly above and near the sphere surface', () => {
      const surface = projectToSphereSurface(new THREE.Vector3(2, 0, 0), 2)
      const bloom = createFogBloom({
        id: 'bloom-1',
        asset: 'capsule',
        surface,
        seed: 11,
      })

      for (const particle of bloom.particles) {
        expect(particle.position.length()).toBeGreaterThanOrEqual(2)
        expect(particle.position.length()).toBeLessThanOrEqual(2.36)
        expect(particle.normal.dot(surface.normal)).toBeGreaterThan(0.94)
        expect(Math.abs(particle.localOffset.z)).toBeLessThanOrEqual(0.09)
      }
    })
  })
})
