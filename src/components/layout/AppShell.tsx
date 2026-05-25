import { SidePanel } from './SidePanel'
import { SceneSwitcher } from './SceneSwitcher'
import { CalmCanvas } from '../../scene/CalmCanvas'
import { KeyboardHandler } from './KeyboardHandler'
import { CodexExplainerOverlay } from '../../codex/components/CodexExplainerOverlay'
import { useSimStore } from '../../state/useSimStore'

export function AppShell() {
  const activeScene = useSimStore((s) => s.activeScene)
  const isCodex = activeScene === 'codex'

  return (
    <div className="relative w-full h-full">
      <CalmCanvas />
      {isCodex ? <CodexExplainerOverlay /> : <SidePanel />}
      <SceneSwitcher />
      <KeyboardHandler />
    </div>
  )
}
