import * as THREE from 'three'

const ATTRACTION_STRENGTH = 8
const MAX_FORCE = 6
const DAMPING = 0.92
const SETTLE_DISTANCE = 0.15
const SETTLE_SPEED = 0.3

const _dir = new THREE.Vector3()

export function computeAttractionForce(
  objectPos: THREE.Vector3,
  sphereCenter: THREE.Vector3,
  sphereRadius: number,
): THREE.Vector3 {
  _dir.copy(sphereCenter).sub(objectPos)
  const dist = _dir.length()
  const surfaceDist = dist - sphereRadius

  if (surfaceDist <= 0) {
    return new THREE.Vector3(0, 0, 0)
  }

  _dir.normalize()
  const forceMag = Math.min(ATTRACTION_STRENGTH / (surfaceDist + 0.5), MAX_FORCE)
  return _dir.clone().multiplyScalar(forceMag)
}

export function shouldSettle(
  objectPos: THREE.Vector3,
  sphereCenter: THREE.Vector3,
  sphereRadius: number,
  velocity: THREE.Vector3,
): boolean {
  const dist = objectPos.distanceTo(sphereCenter) - sphereRadius
  return dist < SETTLE_DISTANCE && velocity.length() < SETTLE_SPEED
}

export function applyDamping(velocity: THREE.Vector3): THREE.Vector3 {
  return velocity.multiplyScalar(DAMPING)
}

export { ATTRACTION_STRENGTH, MAX_FORCE, DAMPING, SETTLE_DISTANCE, SETTLE_SPEED }
