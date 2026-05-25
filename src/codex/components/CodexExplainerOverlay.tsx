import { CODEX_SECTIONS, getCodexSection, getNextSectionId, getPreviousSectionId } from '../codexSections'
import { useSimStore } from '../../state/useSimStore'
import type { CodexSectionId } from '../codexTypes'

const FORMULA_PARTS: { label: string; section: CodexSectionId }[] = [
  { label: 'mirror', section: 'mirror-recursion' },
  { label: 'callback', section: 'callback-tensor' },
  { label: 'tensor(depth)', section: 'tensor-depth' },
  { label: 'transform', section: 'transform' },
  { label: 'mirror', section: 'mirror-recursion' },
  { label: 'reflect', section: 'reflect' },
  { label: 'revise', section: 'revise' },
]

const MIRROR_COPY: Record<string, string> = {
  'mirror-1': 'Peer perspective: the input is probably benign drift.',
  'mirror-2': 'Adversarial perspective: the same pattern may be probing a boundary.',
  'mirror-3': 'Memory perspective: this resembles a prior contradiction.',
  'mirror-4': 'Policy perspective: thresholds may need revision before response.',
}

const NODE_COPY: Record<string, string> = {
  'node-1': 'prompt: activation begins with a fixed instruction.',
  'node-2': 'prompt(prompt): nested instruction selects the next task.',
  'node-3': 'node: directed execution proceeds without feedback.',
  'node-4': 'route: the graph remains acyclic and deterministic.',
  'node-5': 'output: no learned memory or self-revision is introduced.',
  anomaly: 'Callback noticed an anomaly crossing the expected boundary.',
  'memory-match': 'Callback retrieved a similar prior signal pattern.',
  threshold: 'Callback detected a threshold breach.',
  contradiction: 'Callback detected disagreement with current assumptions.',
}

export function CodexChapterNav() {
  const activeSection = useSimStore((s) => s.activeSection)
  const setActiveSection = useSimStore((s) => s.setActiveSection)

  return (
    <aside data-testid="codex-chapter-panel" className="fixed left-3 right-3 top-20 z-20 flex h-40 w-auto flex-col overflow-hidden rounded-2xl border border-[#1e2028] bg-[#080b12]/88 p-3 backdrop-blur-md lg:right-auto lg:bottom-20 lg:h-auto lg:w-64">
      <div className="mb-3 shrink-0 text-[10px] uppercase tracking-[0.28em] text-[#55d6ff]">Mirror Stack</div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {CODEX_SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`rounded-xl border px-3 py-2 text-left transition-all ${
              activeSection === section.id
                ? 'border-[#55d6ff]/60 bg-[#123244]/80 text-[#f5f7fb] shadow-[0_0_22px_rgba(85,214,255,0.14)]'
                : 'border-[#1e2028] bg-[#11131a]/70 text-[#777b86] hover:border-[#6250d8]/70 hover:text-[#f5f7fb]'
            }`}
          >
            <div className="text-[10px] text-[#777b86]">{String(index + 1).padStart(2, '0')}</div>
            <div className="text-xs font-semibold leading-snug">{section.title.replace(/^\d+\.\s*/, '')}</div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export function CodexExplanationPanel() {
  const activeSection = useSimStore((s) => s.activeSection)
  const explanationMode = useSimStore((s) => s.explanationMode)
  const selectedNode = useSimStore((s) => s.selectedNode)
  const selectedMirror = useSimStore((s) => s.selectedMirror)
  const depth = useSimStore((s) => s.depth)
  const noiseLevel = useSimStore((s) => s.noiseLevel)
  const dissonanceScore = useSimStore((s) => s.dissonanceScore)
  const cycleRunning = useSimStore((s) => s.cycleRunning)
  const section = getCodexSection(activeSection)
  const toggleExplanationMode = useSimStore((s) => s.toggleExplanationMode)
  const setDepth = useSimStore((s) => s.setDepth)
  const setNoiseLevel = useSimStore((s) => s.setNoiseLevel)
  const setCycleRunning = useSimStore((s) => s.setCycleRunning)
  const setActiveSection = useSimStore((s) => s.setActiveSection)

  const selectedInsight = selectedMirror ? MIRROR_COPY[selectedMirror] : selectedNode ? NODE_COPY[selectedNode] : null

  return (
    <aside data-testid="codex-concept-panel" className="fixed bottom-20 left-3 right-3 z-20 flex h-64 w-auto flex-col overflow-hidden rounded-2xl border border-[#1e2028] bg-[#080b12]/88 p-4 backdrop-blur-md lg:left-auto lg:top-20 lg:bottom-20 lg:h-auto lg:w-80">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[#55d6ff]">Concept panel</div>
        <button onClick={toggleExplanationMode} className="rounded-full border border-[#1e2028] px-3 py-1 text-[10px] uppercase tracking-wide text-[#f5f7fb] hover:border-[#55d6ff]">
          {explanationMode}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <h1 className="mb-2 text-xl font-semibold leading-tight text-[#f5f7fb]">{section.title}</h1>
        <div className="mb-3 rounded-xl border border-[#1e2028] bg-[#11131a]/80 p-3 font-mono text-xs text-[#55d6ff]">{section.formulaFragment}</div>
        <p className="mb-3 text-sm leading-relaxed text-[#c9d0dc]">{section.explanation[explanationMode]}</p>
        <p className="mb-4 rounded-xl border border-[#6250d8]/30 bg-[#6250d8]/10 p-3 text-xs leading-relaxed text-[#dcd7ff]">{section.interactionHint}</p>

        {selectedInsight && (
          <div className="mb-4 rounded-xl border border-[#55d6ff]/30 bg-[#0e2734]/80 p-3 text-xs leading-relaxed text-[#d9f8ff]">
            <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#55d6ff]">Selected signal</div>
            {selectedInsight}
          </div>
        )}

        <div className="space-y-4 text-xs text-[#c9d0dc]">
          <label className="block">
            <div className="mb-1 flex justify-between"><span>tensor depth</span><span>{depth}</span></div>
            <input type="range" min="1" max="7" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full accent-[#55d6ff]" />
          </label>
          <label className="block">
            <div className="mb-1 flex justify-between"><span>noise level</span><span>{Math.round(noiseLevel * 100)}%</span></div>
            <input type="range" min="0" max="1" step="0.05" value={noiseLevel} onChange={(e) => setNoiseLevel(Number(e.target.value))} className="w-full accent-[#ff4f9a]" />
          </label>
          <div>
            <div className="mb-1 flex justify-between"><span>dissonance meter</span><span>{dissonanceScore}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-[#1e2028]"><div className="h-full rounded-full bg-gradient-to-r from-[#55d6ff] via-[#6250d8] to-[#ff4f9a] transition-all" style={{ width: `${dissonanceScore}%` }} /></div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={() => setActiveSection(getPreviousSectionId(activeSection))} className="flex-1 rounded-xl bg-[#11131a] px-3 py-2 text-xs text-[#f5f7fb] hover:bg-[#1e2028]">Back</button>
          <button onClick={() => setActiveSection(getNextSectionId(activeSection))} className="flex-1 rounded-xl bg-[#11131a] px-3 py-2 text-xs text-[#f5f7fb] hover:bg-[#1e2028]">Next</button>
        </div>
        <button
          onClick={() => { setActiveSection('full-protocol'); setCycleRunning(!cycleRunning) }}
          className={`mt-2 w-full rounded-xl px-3 py-2 text-xs font-semibold transition-all ${cycleRunning ? 'bg-[#ff4f9a] text-white' : 'bg-[#55d6ff] text-[#05070c]'}`}
        >
          {cycleRunning ? 'Stop Cycle' : 'Run Cycle'}
        </button>
      </div>
    </aside>
  )
}

export function FormulaStrip() {
  const activeSection = useSimStore((s) => s.activeSection)
  const setActiveSection = useSimStore((s) => s.setActiveSection)

  return (
    <div data-testid="codex-formula-strip" className="fixed bottom-3 left-3 right-3 z-20 flex max-w-none items-center gap-2 overflow-x-auto rounded-2xl border border-[#1e2028] bg-[#080b12]/90 px-4 py-3 font-mono text-xs text-[#777b86] backdrop-blur-md lg:left-1/2 lg:right-auto lg:max-w-[92vw] lg:-translate-x-1/2">
      <button onClick={() => setActiveSection('original-codex')} className={`rounded-lg px-2 py-1 ${activeSection === 'original-codex' ? 'bg-[#6250d8] text-white' : 'hover:text-white'}`}>prompt(prompt(node))</button>
      <span>→</span>
      {FORMULA_PARTS.map((part, i) => (
        <span key={`${part.label}-${i}`} className="flex items-center gap-2">
          <button onClick={() => setActiveSection(part.section)} className={`rounded-lg px-2 py-1 ${activeSection === part.section ? 'bg-[#55d6ff] text-[#05070c]' : 'hover:text-white'}`}>{part.label}</button>
          {i < FORMULA_PARTS.length - 1 && <span>→</span>}
        </span>
      ))}
    </div>
  )
}

export function CodexLegend() {
  return (
    <div className="fixed left-[17.5rem] top-20 z-20 hidden max-w-xs rounded-2xl border border-[#1e2028] bg-[#080b12]/70 p-3 text-xs text-[#aab3c2] backdrop-blur-md xl:block">
      <div className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#55d6ff]">Symbol legend</div>
      <div>Sphere = current system state / belief / memory / threat model</div>
      <div>Rings = tensor depth or defensive thresholds</div>
      <div>Ghosts = mirror perspectives, not production agents</div>
    </div>
  )
}

export function CodexExplainerOverlay() {
  return (
    <div data-testid="codex-chrome">
      <CodexChapterNav />
      <CodexLegend />
      <CodexExplanationPanel />
      <FormulaStrip />
    </div>
  )
}
