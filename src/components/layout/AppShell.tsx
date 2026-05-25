import { SidePanel } from './SidePanel'
import { SceneSwitcher } from './SceneSwitcher'
import { CalmCanvas } from '../../scene/CalmCanvas'
import { KeyboardHandler } from './KeyboardHandler'

export function AppShell() {
  return (
    <div className="relative w-full h-full">
      <CalmCanvas />
      <SidePanel />
      <SceneSwitcher />
      <KeyboardHandler />
    </div>
  )
}
