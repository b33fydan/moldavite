import { RigidBody } from '@react-three/rapier'
import { SPHERE_RADIUS } from '../../scene/CentralSphere'

export function MagnetSphere() {
  return (
    <RigidBody type="fixed" colliders="ball">
      <mesh>
        <icosahedronGeometry args={[SPHERE_RADIUS, 2]} />
        <meshStandardMaterial
          color="#1a1c28"
          roughness={0.7}
          metalness={0.3}
          flatShading
        />
      </mesh>
    </RigidBody>
  )
}
