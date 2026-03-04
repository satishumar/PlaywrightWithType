import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';
import { OrderCompletePage } from './OrderCompletePage';

/**
 * CheckoutOverviewPage — Checkout Step Two (Overview)
 *
 * Displays order summary: items, prices, total
 * Allows user to confirm and finish order
 */
export class CheckoutOverviewPage extends GenericUtils {

  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly totalPrice: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle     = page.locator('[data-test="title"]');
    this.cartItems     = page.locator('[data-test="inventory-item"]');
    this.itemTotal     = page.locator('[data-test="subtotal-label"]');
    this.tax           = page.locator('[data-test="tax-label"]');
    this.totalPrice    = page.locator('[data-test="total-label"]');
    this.finishButton  = page.locator('[data-test="finish"]');
    this.cancelButton  = page.locator('[data-test="cancel"]');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Navigate to checkout overview page */
  async goto(): Promise<void> {
    await this.navigateTo('/checkout-step-two');
    await this.waitForPageLoad();
  }

  /** Click finish button to complete order */
  async clickFinish(): Promise<OrderCompletePage> {
    await this.click(this.finishButton);
    return new OrderCompletePage(this.page);
  }

  /** Click cancel button to go back */
  async clickCancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  /** Get number of items in order */
  async getItemCount(): Promise<number> {
    return await this.countElements(this.cartItems);
  }

  /** Get item total text */
  async getItemTotal(): Promise<string> {
    return await this.getText(this.itemTotal);
  }

  /** Get tax text */
  async getTax(): Promise<string> {
    return await this.getText(this.tax);
  }

  /** Get total price text */
  async getTotalPrice(): Promise<string> {
    return await this.getText(this.totalPrice);
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Assert on checkout overview page */
  async assertOnCheckoutOverviewPage(): Promise<void> {
    await this.assertText(this.pageTitle, 'Checkout: Overview');
  }

  /** Assert items are displayed */
  async assertItemsDisplayed(): Promise<void> {
    await this.assertVisible(this.cartItems.first());  // Check at least one item
  }

  /** Assert item count matches */
  async assertItemCount(expectedCount: number): Promise<void> {
    await this.assertCount(this.cartItems, expectedCount);
  }

  /** Assert item total is visible */
  async assertItemTotalVisible(): Promise<void> {
    await this.assertVisible(this.itemTotal);
  }

  /** Assert tax is visible */
  async assertTaxVisible(): Promise<void> {
    await this.assertVisible(this.tax);
  }

  /** Assert total price is visible */
  async assertTotalPriceVisible(): Promise<void> {
    await this.assertVisible(this.totalPrice);
  }

  /** Assert finish button is visible */
  async assertFinishButtonVisible(): Promise<void> {
    await this.assertVisible(this.finishButton);
  }

  /** Assert page URL contains checkout-step-two */
  async assertCheckoutOverviewUrl(): Promise<void> {
    await this.assertUrlContains('checkout-step-two');
  }
}
