import { OrbitControls } from '@react-three/drei'

export function CameraRig() {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      mouseButtons={{ LEFT: undefined as unknown as number, MIDDLE: 2, RIGHT: 0 }}
      minDistance={4}
      maxDistance={12}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
    />
  )
}
