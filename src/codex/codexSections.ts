import type { CodexSection, CodexSectionId } from './codexTypes'

export const CODEX_SECTIONS: CodexSection[] = [
  {
    id: 'original-codex',
    title: '1. Original Codex: prompt(prompt(node))',
    formulaFragment: 'prompt(prompt(node))',
    visualMetaphor: 'Locked deterministic prompt chain',
    explanation: {
      simple: 'The original Codex is a fixed instruction layer. One prompt activates another prompt, which activates a task node. It can execute, but it does not learn, doubt, remember, or revise itself.',
      technical: 'This represents deterministic DAG task orchestration: activation, instruction, and directed execution without learned memory, context drift, self-correction, or adversarial reflection.',
    },
    interactionHint: 'Click DAG nodes to reveal nested prompt activation.',
    sphereBehavior: 'locked',
  },
  {
    id: 'dag-orchestration',
    title: '2. DAG Orchestration Layer',
    formulaFragment: 'directed DAG execution',
    visualMetaphor: 'One-way task graph without cycles',
    explanation: {
      simple: 'The system follows ordered task chains. That makes it predictable, but brittle when the world changes.',
      technical: 'Directed acyclic execution is easy to reason about but lacks feedback loops, online correction, and adaptive threat-model updates under adversarial or drifting conditions.',
    },
    interactionHint: 'Toggle input change to see the fixed route remain unchanged.',
    sphereBehavior: 'dag',
  },
  {
    id: 'tensor-depth',
    title: '3. tensor(depth): Root Input Layer',
    formulaFragment: 'tensor(depth)',
    visualMetaphor: 'Layered state lattice around the sphere',
    explanation: {
      simple: 'The tensor encodes the system’s current state: signals, memory traces, temporal patterns, and context depth.',
      technical: 'Depth turns flat input into a structured representation of state, memory, temporal signal, threat indicators, and context that later stages can monitor and transform.',
    },
    interactionHint: 'Adjust depth to add or remove layers around the sphere.',
    sphereBehavior: 'tensor',
  },
  {
    id: 'callback-tensor',
    title: '4. callback(tensor): Event-Bound Reflection',
    formulaFragment: 'callback(tensor)',
    visualMetaphor: 'Checkpoint markers watching tensor boundaries',
    explanation: {
      simple: 'Callbacks watch important transitions. When a boundary is crossed, they trigger reflection or adjustment.',
      technical: 'Callbacks bind monitoring to state transitions: anomaly detection, memory matching, threshold breach, contradiction detection, and conditional retrieval.',
    },
    interactionHint: 'Click a callback marker to inspect what it noticed.',
    sphereBehavior: 'callback',
  },
  {
    id: 'mirror-recursion',
    title: '5. mirror(...): Recursive Self-Invocation',
    formulaFragment: 'mirror(...)',
    visualMetaphor: 'Peer self-models projected around the sphere',
    explanation: {
      simple: 'The system creates alternate interpretations of its own state. The mirrors are intentionally different so disagreement becomes visible.',
      technical: 'Mirroring is recursive self-invocation into alternate self-models or peer-agent perspectives. The point is tension: surfacing dissonance, hidden assumptions, and interpretive variance.',
    },
    interactionHint: 'Click each mirror to read a different interpretation.',
    sphereBehavior: 'mirror',
  },
  {
    id: 'transform',
    title: '6. transform',
    formulaFragment: 'transform',
    visualMetaphor: 'Noisy signal shaped into structured input',
    explanation: {
      simple: 'Transform turns chaotic input into a structured simulation the system can reason over.',
      technical: 'The transform stage normalizes adversarial or noisy data into a usable representation of the attack space, preserving relevant structure while filtering irrelevant distortion.',
    },
    interactionHint: 'Toggle noise to compare chaotic input with transformed structure.',
    sphereBehavior: 'transform',
  },
  {
    id: 'reflect',
    title: '7. reflect',
    formulaFragment: 'reflect',
    visualMetaphor: 'Mirror outputs compared for dissonance',
    explanation: {
      simple: 'Reflect compares the mirrors. When interpretations disagree, the dissonance meter rises.',
      technical: 'Reflection evaluates whether mirrored states are stable, contradictory, symmetrical, or chaotic. This is a conceptual self-check, not evidence of production-grade autonomy.',
    },
    interactionHint: 'Interact with mirrors to change the dissonance meter.',
    sphereBehavior: 'reflect',
  },
  {
    id: 'revise',
    title: '8. revise',
    formulaFragment: 'revise',
    visualMetaphor: 'Outer defensive boundary updates',
    explanation: {
      simple: 'Revise changes the system’s boundary and policy after reflection. The same input can now produce a different response.',
      technical: 'Revision updates policies, thresholds, and defensive strategies. This is the adaptive step that distinguishes the symbolic framework from a static prompt DAG.',
    },
    interactionHint: 'Replay the input after revision to see a changed response.',
    sphereBehavior: 'revise',
  },
  {
    id: 'full-protocol',
    title: '9. Full Mirror Stack Protocol',
    formulaFragment: 'mirror(callback(tensor(depth))) → transform → mirror → reflect → revise',
    visualMetaphor: 'Continuous protocol cycle around the sphere',
    explanation: {
      simple: 'The full protocol moves from static prompt execution toward recursive, adversarial, self-correcting reasoning as a conceptual architecture.',
      technical: 'The evolved Moldavitian Codex is framed as a symbolic architecture: mirror(callback(tensor(depth))) feeds transform, mirror, reflect, and revise in a loop for adversarial self-evaluation and policy adaptation.',
    },
    interactionHint: 'Run the cycle to animate the whole protocol from input to revision.',
    sphereBehavior: 'cycle',
  },
]

export const CODEX_SECTION_IDS = CODEX_SECTIONS.map((section) => section.id)

export function getCodexSection(id: CodexSectionId): CodexSection {
  return CODEX_SECTIONS.find((section) => section.id === id) ?? CODEX_SECTIONS[0]
}

export function getNextSectionId(id: CodexSectionId): CodexSectionId {
  const index = CODEX_SECTION_IDS.indexOf(id)
  return CODEX_SECTION_IDS[Math.min(CODEX_SECTION_IDS.length - 1, index + 1)]
}

export function getPreviousSectionId(id: CodexSectionId): CodexSectionId {
  const index = CODEX_SECTION_IDS.indexOf(id)
  return CODEX_SECTION_IDS[Math.max(0, index - 1)]
}
