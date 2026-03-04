import { test, expect } from '../fixtures';
import { EXPECTED_TEXT, URLS, CHECKOUT_INFO } from '../utils/testData';

test.describe('Checkout Page', () => {

  test('TC_CHECKOUT_01 - Checkout page displayed after clicking checkout', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();

    await checkoutPage.assertOnCheckoutPage();
    await checkoutPage.assertCheckoutUrl();
  });

  test('TC_CHECKOUT_02 - All form fields are visible', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();

    await checkoutPage.assertFirstNameFieldVisible();
    await checkoutPage.assertLastNameFieldVisible();
    await checkoutPage.assertPostalCodeFieldVisible();
  });

  test('TC_CHECKOUT_03 - Continue button is visible', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();

    await checkoutPage.assertContinueButtonVisible();
  });

  test('TC_CHECKOUT_04 - Fill and submit checkout form', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();

    const overviewPage = await checkoutPage.checkoutWithInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );

    await overviewPage.assertOnCheckoutOverviewPage();
  });

  test('TC_CHECKOUT_05 - Fill checkout info step by step', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();

    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );

    const overviewPage = await checkoutPage.clickContinue();
    await overviewPage.assertOnCheckoutOverviewPage();
  });

});
