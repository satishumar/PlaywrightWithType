import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

/**
 * CheckoutPage — Checkout Step One (Your Information)
 *
 * Handles user information entry: First Name, Last Name, Postal Code
 * Then navigates to Checkout Overview page
 */
export class CheckoutPage extends GenericUtils {

  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle         = page.locator('[data-test="title"]');
    this.firstNameInput    = page.locator('[data-test="firstName"]');
    this.lastNameInput     = page.locator('[data-test="lastName"]');
    this.postalCodeInput   = page.locator('[data-test="postalCode"]');
    this.continueButton    = page.locator('[data-test="continue"]');
    this.cancelButton      = page.locator('[data-test="cancel"]');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Navigate to checkout page */
  async goto(): Promise<void> {
    await this.navigateTo('/checkout-step-one');
    await this.waitForPageLoad();
  }

  /** Fill checkout form with user information */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.lastNameInput, lastName);
    await this.fillField(this.postalCodeInput, postalCode);
  }

  /** Click continue button to go to checkout overview */
  async clickContinue(): Promise<CheckoutOverviewPage> {
    await this.click(this.continueButton);
    return new CheckoutOverviewPage(this.page);
  }

  /** Click cancel button to go back */
  async clickCancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  /** Fill form and continue in one step */
  async checkoutWithInfo(firstName: string, lastName: string, postalCode: string): Promise<CheckoutOverviewPage> {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    return await this.clickContinue();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Assert on checkout information page */
  async assertOnCheckoutPage(): Promise<void> {
    await this.assertText(this.pageTitle, 'Checkout: Your Information');
  }

  /** Assert first name field is visible */
  async assertFirstNameFieldVisible(): Promise<void> {
    await this.assertVisible(this.firstNameInput);
  }

  /** Assert last name field is visible */
  async assertLastNameFieldVisible(): Promise<void> {
    await this.assertVisible(this.lastNameInput);
  }

  /** Assert postal code field is visible */
  async assertPostalCodeFieldVisible(): Promise<void> {
    await this.assertVisible(this.postalCodeInput);
  }

  /** Assert continue button is visible */
  async assertContinueButtonVisible(): Promise<void> {
    await this.assertVisible(this.continueButton);
  }

  /** Assert page URL contains checkout-step-one */
  async assertCheckoutUrl(): Promise<void> {
    await this.assertUrlContains('checkout-step-one');
  }
}
