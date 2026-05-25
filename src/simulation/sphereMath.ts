import * as THREE from 'three'

export function nearestPointOnSphere(
  point: THREE.Vector3,
  center: THREE.Vector3,
  radius: number,
): THREE.Vector3 {
  const dir = point.clone().sub(center).normalize()
  return center.clone().add(dir.multiplyScalar(radius))
}

export function sphereNormal(
  point: THREE.Vector3,
  center: THREE.Vector3,
): THREE.Vector3 {
  return point.clone().sub(center).normalize()
}

export function distanceToSphere(
  point: THREE.Vector3,
  center: THREE.Vector3,
  radius: number,
): number {
  return point.distanceTo(center) - radius
}

export function randomPointOnSphere(
  center: THREE.Vector3,
  radius: number,
): THREE.Vector3 {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return new THREE.Vector3(
    center.x + radius * Math.sin(phi) * Math.cos(theta),
    center.y + radius * Math.sin(phi) * Math.sin(theta),
    center.z + radius * Math.cos(phi),
  )
}
