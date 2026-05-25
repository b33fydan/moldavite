export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

export function dampedSpring(
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number,
): [number, number] {
  const springForce = (target - current) * stiffness
  const dampForce = -velocity * damping
  const acceleration = springForce + dampForce
  const newVelocity = velocity + acceleration * dt
  const newValue = current + newVelocity * dt
  return [newValue, newVelocity]
}
