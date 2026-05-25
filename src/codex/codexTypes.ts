export type CodexSectionId =
  | 'original-codex'
  | 'dag-orchestration'
  | 'tensor-depth'
  | 'callback-tensor'
  | 'mirror-recursion'
  | 'transform'
  | 'reflect'
  | 'revise'
  | 'full-protocol'

export type ExplanationMode = 'simple' | 'technical'

export type SphereBehavior =
  | 'locked'
  | 'dag'
  | 'tensor'
  | 'callback'
  | 'mirror'
  | 'transform'
  | 'reflect'
  | 'revise'
  | 'cycle'

export interface CodexSection {
  id: CodexSectionId
  title: string
  formulaFragment: string
  visualMetaphor: string
  explanation: {
    simple: string
    technical: string
  }
  interactionHint: string
  sphereBehavior: SphereBehavior
}
