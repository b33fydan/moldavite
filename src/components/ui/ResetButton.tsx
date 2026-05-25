import { useSimStore } from '../../state/useSimStore'

export function ResetButton() {
  const resetScene = useSimStore((s) => s.resetScene)

  return (
    <button
      onClick={resetScene}
      title="Reset scene (R)"
      className="
        w-11 h-11 rounded-lg flex items-center justify-center text-sm
        bg-[#11131a] border border-[#1e2028] text-[#777b86]
        hover:border-[#ff4f9a]/50 hover:text-[#ff4f9a]
        transition-all duration-200 cursor-pointer
      "
    >
      ↺
    </button>
  )
}
