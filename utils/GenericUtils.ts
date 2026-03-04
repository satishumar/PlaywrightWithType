import { Page, Locator, expect } from '@playwright/test';

/**
 * GenericUtils — Reusable Utility Methods
 *
 * 
 */
export class GenericUtils {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─────────────────────────────────────────────
  // 🔵 NAVIGATION
  // ─────────────────────────────────────────────

  /** Navigate to a URL (absolute or relative to baseURL) */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /** Reload the current page */
  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  /** Wait for page to reach 'load' state */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /** Wait for page to reach 'networkidle' state (all requests done) */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Get current page URL */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /** Get current page title */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // ─────────────────────────────────────────────
  // 🔵 CLICK ACTIONS
  // ─────────────────────────────────────────────

  /** Click a locator */
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Double-click a locator */
  async doubleClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.dblclick();
  }

  /** Right-click a locator */
  async rightClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click({ button: 'right' });
  }

  /** Click using JavaScript (useful when element is behind overlay) */
  async forceClick(locator: Locator): Promise<void> {
    await locator.click({ force: true });
  }

  // ─────────────────────────────────────────────
  // 🔵 INPUT / FORM ACTIONS
  // ─────────────────────────────────────────────

  /** Clear a field and type new text */
  async fillField(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /** Type character by character (useful for autocomplete/search inputs) */
  async typeSlowly(locator: Locator, text: string, delayMs = 50): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.pressSequentially(text, { delay: delayMs });
  }

  /** Clear a field completely */
  async clearField(locator: Locator): Promise<void> {
    await locator.clear();
  }

  /** Select an option from a <select> dropdown by visible text */
  async selectByText(locator: Locator, text: string): Promise<void> {
    await locator.selectOption({ label: text });
  }

  /** Select an option from a <select> dropdown by value */
  async selectByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }

  /** Check a checkbox if not already checked */
  async checkCheckbox(locator: Locator): Promise<void> {
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  /** Uncheck a checkbox if checked */
  async uncheckCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  // ─────────────────────────────────────────────
  // 🔵 GET TEXT / ATTRIBUTE
  // ─────────────────────────────────────────────

  /** Get trimmed inner text of an element */
  async getText(locator: Locator): Promise<string> {
    return (await locator.innerText()).trim();
  }

  /** Get the value of a form input */
  async getInputValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  /** Get the value of any HTML attribute */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /** Get all text contents of a list of elements */
  async getAllTexts(locator: Locator): Promise<string[]> {
    return await locator.allInnerTexts();
  }

  // ─────────────────────────────────────────────
  // 🔵 WAIT METHODS
  // ─────────────────────────────────────────────

  /** Wait for a locator to become visible */
  async waitForVisible(locator: Locator, timeoutMs = 10_000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: timeoutMs });
  }

  /** Wait for a locator to be hidden */
  async waitForHidden(locator: Locator, timeoutMs = 10_000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout: timeoutMs });
  }

  /** Wait for a fixed amount of milliseconds (use sparingly) */
  async waitForMs(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /** Wait for a URL to match a string or regex */
  async waitForUrl(urlOrRegex: string | RegExp, timeoutMs = 15_000): Promise<void> {
    await this.page.waitForURL(urlOrRegex, { timeout: timeoutMs });
  }

  // ─────────────────────────────────────────────
  // 🔵 VISIBILITY / STATE CHECKS
  // ─────────────────────────────────────────────

  /** Returns true if element is visible on the page */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /** Returns true if element is enabled (not disabled) */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /** Returns true if checkbox/radio is checked */
  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  /** Count number of matching elements */
  async countElements(locator: Locator): Promise<number> {
    return await locator.count();
  }

  // ─────────────────────────────────────────────
  // 🔵 SCROLL ACTIONS
  // ─────────────────────────────────────────────

  /** Scroll an element into the viewport */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /** Scroll to the bottom of the page */
  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /** Scroll to the top of the page */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  // ─────────────────────────────────────────────
  // 🔵 SCREENSHOT / DEBUG
  // ─────────────────────────────────────────────

  /** Take a screenshot and save to given path */
  async takeScreenshot(filePath: string): Promise<void> {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  // ─────────────────────────────────────────────
  // 🔵 ASSERTIONS (reusable assert wrappers)
  // ─────────────────────────────────────────────

  /** Assert element is visible */
  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  /** Assert element is hidden */
  async assertHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  /** Assert element has exact text */
  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /** Assert element contains text (partial match) */
  async assertContainsText(locator: Locator, partialText: string): Promise<void> {
    await expect(locator).toContainText(partialText);
  }

  /** Assert input field has given value */
  async assertInputValue(locator: Locator, expectedValue: string): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  /** Assert element count */
  async assertCount(locator: Locator, expectedCount: number): Promise<void> {
    await expect(locator).toHaveCount(expectedCount);
  }

  /** Assert page URL contains a given string */
  async assertUrlContains(partialUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  /** Assert page title */
  async assertPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
