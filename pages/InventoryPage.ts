import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';
import { CartPage } from './CartPage';

/**
 * InventoryPage — extends GenericUtils
 *
 * All common browser interactions (click, assertVisible, assertText, etc.)
 * come from GenericUtils — no duplication needed.
 */
export class InventoryPage extends GenericUtils {

  private readonly pageTitle: Locator;
  private readonly allAddToCartButtons: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  private readonly productNames: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page); // ← GenericUtils constructor

    this.pageTitle           = page.locator('.app_logo');
    this.allAddToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge           = page.locator('[data-test="shopping-cart-badge"]');
    this.cartIcon            = page.locator('[data-test="shopping-cart-link"]');
    this.productNames        = page.locator('[data-test="inventory-item-name"]');
    this.sortDropdown        = page.locator('[data-test="product-sort-container"]');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Navigate to inventory page */
  async goto(): Promise<void> {
    await this.navigateTo('/inventory');
    await this.waitForPageLoad();
  }

  /** Add the first product to cart */
  async addFirstProductToCart(): Promise<void> {
    await this.click(this.allAddToCartButtons.first());       
  }

  /** Add product by index (0-based) */
  async addProductToCartByIndex(index: number): Promise<void> {
    await this.click(this.allAddToCartButtons.nth(index));     
  }

  /** Sort products using dropdown */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.selectByValue(this.sortDropdown, option);       
  }

  /** Get all product names on the page */
  async getAllProductNames(): Promise<string[]> {
    return await this.getAllTexts(this.productNames);         
  }

  /** Navigate to cart page */
  async goToCart(): Promise<CartPage> {
    await this.click(this.cartIcon);                          
    return new CartPage(this.page);
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  async assertOnInventoryPage(): Promise<void> {
    await this.assertText(this.pageTitle, 'Swag Labs');
  }

  async assertCartCount(expectedCount: number): Promise<void> {
    await this.assertVisible(this.cartBadge);                              // ✅ GenericUtils.assertVisible
    await this.assertText(this.cartBadge, String(expectedCount));          // ✅ GenericUtils.assertText
  }

  async assertCartIsEmpty(): Promise<void> {
    await this.assertHidden(this.cartBadge);                   // ✅ GenericUtils.assertHidden
  }

  async assertProductCount(expectedCount: number): Promise<void> {
    await this.assertCount(this.allAddToCartButtons, expectedCount); // ✅ GenericUtils.assertCount
  }
}
