import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';
import { CheckoutPage } from './CheckoutPage';

/**
 * CartPage — extends GenericUtils
 *
 * Uses GenericUtils methods for all browser interactions.
 */
export class CartPage extends GenericUtils {

  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page); // ← GenericUtils constructor

    this.pageTitle              = page.locator('[data-test="title"]');
    this.cartItems              = page.locator('.cart_item');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons          = page.locator('[data-test^="remove"]');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  async clickCheckout(): Promise<CheckoutPage> {
    await this.click(this.checkoutButton);             // ✅ GenericUtils.click
    return new CheckoutPage(this.page);
  }

  async clickContinueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);     // ✅ GenericUtils.click
  }

  /** Remove item from cart by index (0-based) */
  async removeItemByIndex(index: number): Promise<void> {
    await this.click(this.removeButtons.nth(index));   // ✅ GenericUtils.click
  }

  /** Remove all items from cart */
  async removeAllItems(): Promise<void> {
    const count = await this.countElements(this.removeButtons); // ✅ GenericUtils.countElements
    for (let i = 0; i < count; i++) {
      await this.click(this.removeButtons.first());    // ✅ GenericUtils.click
    }
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  async assertOnCartPage(): Promise<void> {
    await this.assertVisible(this.pageTitle);          // ✅ GenericUtils.assertVisible
    await this.assertText(this.pageTitle, 'Your Cart'); // ✅ GenericUtils.assertText
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    await this.assertCount(this.cartItems, expectedCount); // ✅ GenericUtils.assertCount
  }

  async assertCartIsEmpty(): Promise<void> {
    await this.assertCount(this.cartItems, 0);         // ✅ GenericUtils.assertCount
  }

  async assertCheckoutButtonVisible(): Promise<void> {
    await this.assertVisible(this.checkoutButton);     // ✅ GenericUtils.assertVisible
  }

  /** Assert current URL contains /cart */
  async assertCartUrl(): Promise<void> {
    await this.assertUrlContains('cart');              // ✅ GenericUtils.assertUrlContains
  }
}
