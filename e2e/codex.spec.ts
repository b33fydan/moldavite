import { expect, test } from '@playwright/test'

const codexChrome = '[data-testid="codex-chrome"]'
const chapterPanel = '[data-testid="codex-chapter-panel"]'
const conceptPanel = '[data-testid="codex-concept-panel"]'
const formulaStrip = '[data-testid="codex-formula-strip"]'

async function openCodex(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Codex' }).click()
  await expect(page.locator(codexChrome)).toBeAttached()
}

async function expectContainedInViewport(page: import('@playwright/test').Page, selector: string) {
  const result = await page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  expect(result.top).toBeGreaterThanOrEqual(0)
  expect(result.left).toBeGreaterThanOrEqual(0)
  expect(result.right).toBeLessThanOrEqual(result.width)
  expect(result.bottom).toBeLessThanOrEqual(result.height)
}

test.describe('Codex deployment smoke', () => {
  test('loads the Codex scene and advances sections', async ({ page }) => {
    await openCodex(page)

    await expect(page.locator(chapterPanel)).toBeVisible()
    await expect(page.locator(conceptPanel)).toBeVisible()
    await expect(page.locator(formulaStrip)).toBeVisible()

    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByRole('heading', { name: /DAG Orchestration Layer/i })).toBeVisible()
  })

  test('keeps Codex panels contained on a short desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 580 })
    await openCodex(page)

    await expectContainedInViewport(page, chapterPanel)
    await expectContainedInViewport(page, conceptPanel)
    await expectContainedInViewport(page, formulaStrip)
  })

  test('uses compact mobile layout without horizontal body overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openCodex(page)

    await expect(page.locator(chapterPanel)).toBeVisible()
    await expect(page.locator(conceptPanel)).toBeVisible()
    await expect(page.locator(formulaStrip)).toBeVisible()

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      doc: document.documentElement.scrollWidth,
      width: window.innerWidth,
    }))

    expect(Math.max(overflow.body, overflow.doc)).toBeLessThanOrEqual(overflow.width)
  })
})
