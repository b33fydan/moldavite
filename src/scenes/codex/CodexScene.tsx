import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SPHERE_RADIUS } from '../../scene/CentralSphere'
import { useSimStore } from '../../state/useSimStore'
import { getCodexSection } from '../../codex/codexSections'

const NODE_POINTS: [number, number, number][] = [
  [-2.9, 1.2, 0],
  [-1.3, 0.3, 0],
  [0.2, 0.9, 0],
  [1.6, -0.1, 0],
  [3.0, 0.7, 0],
]

const MIRROR_POINTS: [number, number, number][] = [
  [3.2, 1.2, -0.2],
  [-3.1, 0.8, 0.4],
  [2.4, -1.5, 0.2],
  [-2.4, -1.4, -0.3],
]

function Ring({
  radius,
  color,
  opacity = 0.45,
  rotation = [Math.PI / 2, 0, 0] as [number, number, number],
}: {
  radius: number
  color: string
  opacity?: number
  rotation?: [number, number, number]
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Connector({ from, to, color = '#55d6ff', opacity = 0.36 }: { from: THREE.Vector3; to: THREE.Vector3; color?: string; opacity?: number }) {
  const midpoint = from.clone().add(to).multiplyScalar(0.5)
  const direction = to.clone().sub(from)
  const length = direction.length()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.01, 0.01, length, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function ProtocolSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const activeSection = useSimStore((s) => s.activeSection)
  const depth = useSimStore((s) => s.depth)
  const noiseLevel = useSimStore((s) => s.noiseLevel)
  const dissonanceScore = useSimStore((s) => s.dissonanceScore)
  const cycleRunning = useSimStore((s) => s.cycleRunning)
  const behavior = getCodexSection(activeSection).sphereBehavior

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    meshRef.current.rotation.y = t * (behavior === 'locked' ? 0.04 : 0.16)
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.05
    const pulse = behavior === 'revise' || cycleRunning ? 1 + Math.sin(t * 3) * 0.035 : 1
    meshRef.current.scale.setScalar(pulse)
  })

  const color = behavior === 'locked'
    ? '#252a34'
    : behavior === 'reflect'
      ? '#b78cff'
      : behavior === 'revise'
        ? '#55d6ff'
        : '#1f3446'

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[SPHERE_RADIUS, behavior === 'locked' ? 1 : 3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={behavior === 'locked' ? 0.03 : 0.14}
          roughness={0.72}
          metalness={0.24}
          flatShading={behavior === 'locked'}
          wireframe={behavior === 'tensor'}
        />
      </mesh>
      {(behavior === 'tensor' || behavior === 'callback' || behavior === 'cycle') && Array.from({ length: depth }).map((_, i) => (
        <Ring key={i} radius={SPHERE_RADIUS + 0.28 + i * 0.18} color={i % 2 ? '#6250d8' : '#55d6ff'} opacity={0.18 + i * 0.035} rotation={[Math.PI / 2, i * 0.28, 0]} />
      ))}
      {behavior === 'transform' && Array.from({ length: 4 }).map((_, i) => (
        <Ring key={i} radius={SPHERE_RADIUS + 0.25 + i * 0.18} color={noiseLevel > 0.5 ? '#ff4f9a' : '#55d6ff'} opacity={0.16 + noiseLevel * 0.28} rotation={[Math.PI / 2, 0.3 * i, 0.4]} />
      ))}
      {behavior === 'reflect' && <Ring radius={SPHERE_RADIUS + 0.5} color={dissonanceScore > 55 ? '#ff4f9a' : '#55d6ff'} opacity={0.32 + dissonanceScore / 240} />}
      {behavior === 'revise' && (
        <mesh scale={1.18}>
          <icosahedronGeometry args={[SPHERE_RADIUS, 2]} />
          <meshBasicMaterial color="#55d6ff" transparent opacity={0.12} wireframe />
        </mesh>
      )}
    </group>
  )
}

function DagVisual() {
  const selectedNode = useSimStore((s) => s.selectedNode)
  const setSelectedNode = useSimStore((s) => s.setSelectedNode)
  const activeSection = useSimStore((s) => s.activeSection)
  const points = useMemo(() => NODE_POINTS.map((p) => new THREE.Vector3(...p)), [])

  if (!['original-codex', 'dag-orchestration'].includes(activeSection)) return null

  return (
    <group position={[0, -2.4, 0]}>
      {points.slice(0, -1).map((point, i) => (
        <Connector key={`c-${i}`} from={point} to={points[i + 1]} color="#777b86" opacity={0.48} />
      ))}
      {points.map((point, i) => {
        const id = `node-${i + 1}`
        return (
          <mesh key={id} position={point} onPointerDown={(e) => { e.stopPropagation(); setSelectedNode(id) }}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color={selectedNode === id ? '#55d6ff' : '#6250d8'}
              emissive={selectedNode === id ? '#55d6ff' : '#6250d8'}
              emissiveIntensity={0.28}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function CallbackMarkers() {
  const activeSection = useSimStore((s) => s.activeSection)
  const setSelectedNode = useSimStore((s) => s.setSelectedNode)
  if (!['callback-tensor', 'full-protocol'].includes(activeSection)) return null
  const labels = ['anomaly', 'memory-match', 'threshold', 'contradiction']

  return (
    <group>
      {labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2
        return (
          <mesh key={label} position={[Math.cos(angle) * 2.9, Math.sin(angle) * 1.4, Math.sin(angle) * 1.3]} onPointerDown={(e) => { e.stopPropagation(); setSelectedNode(label) }}>
            <octahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial color="#ff4f9a" emissive="#ff4f9a" emissiveIntensity={0.35} />
          </mesh>
        )
      })}
    </group>
  )
}

function MirrorAgents() {
  const activeSection = useSimStore((s) => s.activeSection)
  const selectedMirror = useSimStore((s) => s.selectedMirror)
  const setSelectedMirror = useSimStore((s) => s.setSelectedMirror)
  const setDissonanceScore = useSimStore((s) => s.setDissonanceScore)
  if (!['mirror-recursion', 'reflect', 'full-protocol'].includes(activeSection)) return null

  return (
    <group>
      {MIRROR_POINTS.map((point, i) => {
        const id = `mirror-${i + 1}`
        return (
          <group key={id} position={point}>
            <Connector from={new THREE.Vector3(0, 0, 0)} to={new THREE.Vector3(...point)} color={activeSection === 'reflect' ? '#b78cff' : '#55d6ff'} opacity={0.22} />
            <mesh onPointerDown={(e) => { e.stopPropagation(); setSelectedMirror(id); setDissonanceScore(34 + i * 17) }} scale={selectedMirror === id ? 1.25 : 1}>
              <icosahedronGeometry args={[0.38, i % 2 ? 1 : 0]} />
              <meshStandardMaterial
                color={selectedMirror === id ? '#f7f1ff' : ['#55d6ff', '#6250d8', '#ff4f9a', '#f7d48b'][i]}
                emissive={['#55d6ff', '#6250d8', '#ff4f9a', '#f7d48b'][i]}
                emissiveIntensity={0.18}
                transparent
                opacity={0.72}
                wireframe={i === 2}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function SignalTransform() {
  const activeSection = useSimStore((s) => s.activeSection)
  const noiseLevel = useSimStore((s) => s.noiseLevel)
  if (!['transform', 'full-protocol'].includes(activeSection)) return null

  return (
    <group position={[-4, 0, 0]}>
      {Array.from({ length: 9 }).map((_, i) => {
        const y = (i - 4) * 0.22 * (1 + noiseLevel)
        return <Connector key={i} from={new THREE.Vector3(0, y, 0)} to={new THREE.Vector3(2.1, y * (1 - noiseLevel * 0.7), 0)} color={i % 2 ? '#ff4f9a' : '#55d6ff'} opacity={0.26 + noiseLevel * 0.25} />
      })}
      <mesh position={[2.35, 0, 0]}>
        <boxGeometry args={[0.08, 2.6, 0.08]} />
        <meshBasicMaterial color="#f7f1ff" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

export function CodexScene() {
  return (
    <group>
      <ProtocolSphere />
      <DagVisual />
      <CallbackMarkers />
      <MirrorAgents />
      <SignalTransform />
    </group>
  )
}
