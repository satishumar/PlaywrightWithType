import { Page, Locator } from '@playwright/test';
import { GenericUtils } from '../utils/GenericUtils';

/**
 * LoginPage — extends GenericUtils
 *
 * Inheriting GenericUtils means this page has access to all reusable
 * methods (click, fillField, assertText, waitForVisible, etc.)
 * WITHOUT rewriting them. This is the industry-standard pattern.
 */
export class LoginPage extends GenericUtils {

  // --- Locators ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly appLogo: Locator;


  constructor(page: Page) {
    super(page); // ← calls GenericUtils constructor, sets this.page

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
    this.appLogo       = page.locator('.app_logo');
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Go to login page */
  async goto(): Promise<void> {
    await this.navigateTo('/');        
    await this.waitForPageLoad();      
  }

  /** Fill credentials and submit */
  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.usernameInput, username);  
    await this.fillField(this.passwordInput, password);  
    await this.click(this.loginButton);                  
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  /** Assert successful login */
  async assertLoginSuccess(): Promise<void> {
    await this.assertVisible(this.appLogo);            
    await this.assertText(this.appLogo, 'Swag Labs');  
  }

  /** Assert error message with exact text */
  async assertErrorMessage(expectedMessage: string): Promise<void> {
    await this.assertVisible(this.errorMessage);                  
    await this.assertText(this.errorMessage, expectedMessage);    
  }
}
