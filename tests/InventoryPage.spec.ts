import { test, expect } from '../fixtures';
import { EXPECTED_TEXT, URLS } from '../utils/testData';


test.describe('Inventory Page', () => {

  test('TC_INV_01 - Inventory page displayed after login', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.assertOnInventoryPage();
    await authenticatedInventoryPage.assertUrlContains(URLS.inventory);
  });

  test('TC_INV_02 - Cart badge shows 1 after adding one product', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addFirstProductToCart();
    await authenticatedInventoryPage.assertCartCount(1);
  });

  test('TC_INV_03 - Cart badge shows 2 after adding two products', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.addProductToCartByIndex(0);
    await authenticatedInventoryPage.addProductToCartByIndex(1);
    await authenticatedInventoryPage.assertCartCount(2);
  });

  test('TC_INV_04 - Cart badge not visible when cart is empty', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.assertCartIsEmpty();
  });

  test('TC_INV_05 - Products are sorted A to Z by default', async ({
    authenticatedInventoryPage,
  }) => {
    const names = await authenticatedInventoryPage.getAllProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC_INV_06 - Page has exactly 6 products', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.assertProductCount(EXPECTED_TEXT.totalProducts); // ✅ testData
  });
});
