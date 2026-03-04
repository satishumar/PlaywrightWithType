import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Custom Test Fixtures
 * Provides pre-authenticated pages for tests
 */
type TestFixtures = {authenticatedInventoryPage: InventoryPage;};

export const test = base.extend<TestFixtures>({
  /**
   * Fixture: authenticatedInventoryPage
   * - Logs in with standard user credentials
   * - Navigates to inventory page
   * - Returns ready-to-use InventoryPage instance
   */
  authenticatedInventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.STANDARD_USER!,
      process.env.STANDARD_PASSWORD!
    );

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForPageLoad();

    // Provide the fixture to the test
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
