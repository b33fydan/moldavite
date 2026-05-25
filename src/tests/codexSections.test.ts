import { describe, expect, it } from 'vitest'
import { CODEX_SECTIONS, CODEX_SECTION_IDS, getCodexSection, getNextSectionId, getPreviousSectionId } from '../codex/codexSections'

describe('codexSections', () => {
  it('defines the nine requested explainer sections in order', () => {
    expect(CODEX_SECTIONS).toHaveLength(9)
    expect(CODEX_SECTION_IDS).toEqual([
      'original-codex',
      'dag-orchestration',
      'tensor-depth',
      'callback-tensor',
      'mirror-recursion',
      'transform',
      'reflect',
      'revise',
      'full-protocol',
    ])
  })

  it('stores required learning fields for every section', () => {
    for (const section of CODEX_SECTIONS) {
      expect(section.id).toBeTruthy()
      expect(section.title).toBeTruthy()
      expect(section.formulaFragment).toBeTruthy()
      expect(section.visualMetaphor).toBeTruthy()
      expect(section.explanation.simple).toBeTruthy()
      expect(section.explanation.technical).toBeTruthy()
      expect(section.interactionHint).toBeTruthy()
      expect(section.sphereBehavior).toBeTruthy()
    }
  })

  it('navigates sections with clamped previous and next helpers', () => {
    expect(getPreviousSectionId('original-codex')).toBe('original-codex')
    expect(getNextSectionId('original-codex')).toBe('dag-orchestration')
    expect(getPreviousSectionId('tensor-depth')).toBe('dag-orchestration')
    expect(getNextSectionId('full-protocol')).toBe('full-protocol')
  })

  it('looks up a section by id', () => {
    expect(getCodexSection('reflect').title).toContain('reflect')
  })
})
