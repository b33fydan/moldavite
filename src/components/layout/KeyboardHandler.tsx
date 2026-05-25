import { useEffect } from 'react'
import { useSimStore } from '../../state/useSimStore'

export function KeyboardHandler() {
  const resetScene = useSimStore((s) => s.resetScene)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'r' || e.key === 'R') {
        resetScene()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [resetScene])

  return null
}
