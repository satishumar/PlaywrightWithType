import { test } from '../fixtures';
import { EXPECTED_TEXT } from '../utils/testData';

test.describe('Cart Page', () => { test('TC_CART_01 - Cart page displayed when cart icon is clicked', async ({authenticatedInventoryPage,
  }) => {
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertCartUrl();
  });

  test('TC_CART_02 - Empty cart shows zero items', async ({
    authenticatedInventoryPage,
  }) => {
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.assertCartIsEmpty();
  });

  test('TC_CART_03 - Cart shows 1 item after adding one product', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertCartItemCount(1);
  });

  test('TC_CART_04 - Continue shopping returns to inventory page', async ({
    authenticatedInventoryPage,
  }) => {
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.clickContinueShopping();
    await authenticatedInventoryPage.assertOnInventoryPage();
  });

  test('TC_CART_05 - Checkout button is visible on cart page', async ({
    authenticatedInventoryPage,
  }) => {
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.assertCheckoutButtonVisible();
  });

  test('TC_CART_06 - Remove item reduces cart count to zero', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage = await authenticatedInventoryPage.goToCart();
    await cartPage.removeAllItems();
    await cartPage.assertCartIsEmpty();
  });
});
