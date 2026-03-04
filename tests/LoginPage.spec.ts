import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



test.describe('Login Page', () => {
let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC_LOGIN_01 - Successful login with valid credentials', async ({  page}) => {
 
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASSWORD!);
    await loginPage.assertLoginSuccess();
    await page.waitForURL(/.*inventory/);
  });

  test('TC_LOGIN_03 - Error shown when both fields are empty', async ({  }) => {
 
    await loginPage.login("", "");
    await loginPage.assertErrorMessage(process.env.ERROR_MESSAGE_USERNAME_REQUIRED!);
  });

  test('TC_LOGIN_04 - Error shown when password is missing', async ({ page }) => {
   
    await loginPage.login(process.env.STANDARD_USER!, process.env.ONLY_USERNAME_PASSWORD!);
    await loginPage.assertErrorMessage(process.env.ERROR_MESSAGE_PASSWORD_REQUIRED!);
  });

  test('TC_LOGIN_05 - Error shown when username is missing', async ({ page }) => {
  
    await loginPage.login("", process.env.ONLY_PASSWORD!);
    await loginPage.assertErrorMessage(process.env.ERROR_MESSAGE_USERNAME_REQUIRED!);
  });

  test('TC_LOGIN_06 - Page title is correct', async ({ page }) => {
  
    await loginPage.assertPageTitle(process.env.APP_TITLE!);
  });
});
