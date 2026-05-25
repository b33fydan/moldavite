import { useSimStore } from '../../state/useSimStore'
import { SCENE_ASSETS } from '../../constants/assets'
import { IconButton } from '../ui/IconButton'
import { ResetButton } from '../ui/ResetButton'

export function SidePanel() {
  const activeScene = useSimStore((s) => s.activeScene)
  const selectedAsset = useSimStore((s) => s.selectedAsset)
  const setSelectedAsset = useSimStore((s) => s.setSelectedAsset)
  const assets = SCENE_ASSETS[activeScene]

  return (
    <div className="
      fixed left-3 top-1/2 -translate-y-1/2 z-10
      flex flex-col gap-2 p-2 rounded-xl
      bg-[#11131a]/80 backdrop-blur-sm border border-[#1e2028]
    ">
      {assets.map((a) => (
        <IconButton
          key={a.id}
          icon={a.icon}
          label={a.label}
          selected={selectedAsset === a.id}
          onClick={() => setSelectedAsset(a.id)}
        />
      ))}
      <div className="h-px bg-[#1e2028] my-1" />
      <ResetButton />
    </div>
  )
}
