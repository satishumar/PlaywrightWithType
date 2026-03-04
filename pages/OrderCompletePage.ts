import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';
import { InventoryPage } from './InventoryPage';

/**
 * OrderCompletePage — Checkout Complete (Success)
 *
 * Displays success message after order completion
 * Allows user to go back to shopping
 */
export class OrderCompletePage extends GenericUtils {

  private readonly pageTitle: Locator;
  private readonly successMessage: Locator;
  private readonly orderId: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle        = page.locator('[data-test="title"]');
    this.successMessage   = page.locator('[data-test="complete-header"]');
    this.orderId          = page.locator('[data-test="complete-text"]');
    this.backHomeButton   = page.locator('[data-test="back-to-products"]');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Navigate to order complete page */
  async goto(): Promise<void> {
    await this.navigateTo('/checkout-complete');
    await this.waitForPageLoad();
  }

  /** Click back to products button */
  async clickBackToProducts(): Promise<InventoryPage> {
    await this.click(this.backHomeButton);
    return new InventoryPage(this.page);
  }

  /** Get success message text */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /** Get order completion text */
  async getOrderText(): Promise<string> {
    return await this.getText(this.orderId);
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Assert on order complete page */
  async assertOnOrderCompletePage(): Promise<void> {
    await this.assertText(this.pageTitle, 'Checkout: Complete!');
  }

  /** Assert success message is displayed */
  async assertSuccessMessageVisible(): Promise<void> {
    await this.assertVisible(this.successMessage);
  }

  /** Assert success message text */
  async assertSuccessMessageText(expectedText: string): Promise<void> {
    await this.assertText(this.successMessage, expectedText);
  }

  /** Assert order text is visible */
  async assertOrderTextVisible(): Promise<void> {
    await this.assertVisible(this.orderId);
  }

  /** Assert back to products button is visible */
  async assertBackToProductsButtonVisible(): Promise<void> {
    await this.assertVisible(this.backHomeButton);
  }

  /** Assert page URL contains checkout-complete */
  async assertOrderCompleteUrl(): Promise<void> {
    await this.assertUrlContains('checkout-complete');
  }

  /** Assert page title */
  async assertPageTitle(): Promise<void> {
    await this.assertVisible(this.pageTitle);
  }
}
