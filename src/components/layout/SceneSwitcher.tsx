import { useSimStore } from '../../state/useSimStore'
import { SCENES } from '../../constants/scenes'

export function SceneSwitcher() {
  const activeScene = useSimStore((s) => s.activeScene)
  const setActiveScene = useSimStore((s) => s.setActiveScene)

  return (
    <div className="
      fixed top-3 left-1/2 -translate-x-1/2 z-10
      flex gap-1 p-1 rounded-lg
      bg-[#11131a]/80 backdrop-blur-sm border border-[#1e2028]
    ">
      {SCENES.map((scene) => (
        <button
          key={scene.id}
          onClick={() => setActiveScene(scene.id)}
          className={`
            px-4 py-1.5 rounded-md text-xs font-medium tracking-wide
            transition-all duration-200 cursor-pointer border-none
            ${activeScene === scene.id
              ? 'bg-[#6250d8] text-white'
              : 'bg-transparent text-[#777b86] hover:text-[#f5f7fb]'
            }
          `}
        >
          {scene.label}
        </button>
      ))}
    </div>
  )
}
