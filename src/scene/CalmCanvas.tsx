import { Canvas } from '@react-three/fiber'
import { Lighting } from './Lighting'
import { CameraRig } from './CameraRig'
import { useSimStore } from '../state/useSimStore'
import { MagnetScene } from '../scenes/magnet/MagnetScene'
import { FogScene } from '../scenes/fog/FogScene'
import { MeshGardenScene } from '../scenes/meshGarden/MeshGardenScene'
import { CodexScene } from '../scenes/codex/CodexScene'

function ActiveScene() {
  const activeScene = useSimStore((s) => s.activeScene)

  switch (activeScene) {
    case 'magnet':
      return <MagnetScene />
    case 'fog':
      return <FogScene />
    case 'meshGarden':
      return <MeshGardenScene />
    case 'codex':
      return <CodexScene />
  }
}

export function CalmCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.setClearColor('#05070c')
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Lighting />
      <CameraRig />
      <ActiveScene />
    </Canvas>
  )
}
