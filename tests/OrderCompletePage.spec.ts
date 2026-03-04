import { test, expect } from '../fixtures';
import { EXPECTED_TEXT, URLS, CHECKOUT_INFO } from '../utils/testData';
import { OrderCompletePage } from '../pages/OrderCompletePage';

test.describe('Order Complete Page', () => {
  let completePage:OrderCompletePage;

  test.beforeEach(async ({ authenticatedInventoryPage }) => {
 await authenticatedInventoryPage.addFirstProductToCart();
    const cartPage     = await authenticatedInventoryPage.goToCart();
    const checkoutPage = await cartPage.clickCheckout();
    const overviewPage = await checkoutPage.checkoutWithInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
      completePage = await overviewPage.clickFinish();

  });
  test('TC_COMPLETE_01 - Order complete page displayed after finishing checkout', async ({
  
  }) => {
   

    await completePage.assertOnOrderCompletePage();
    await completePage.assertOrderCompleteUrl();
  });

  test('TC_COMPLETE_02 - Success message is displayed', async ({
    authenticatedInventoryPage,
  }) => {
   

    await completePage.assertSuccessMessageVisible();
  });

  test('TC_COMPLETE_03 - Page title is correct', async ({
    
  }) => {
  

    await completePage.assertPageTitle();
  });

  test('TC_COMPLETE_04 - Back to products button is visible', async ({
    authenticatedInventoryPage,
  }) => {
   

    await completePage.assertBackToProductsButtonVisible();
  });

  test('TC_COMPLETE_05 - Order text is visible', async ({
    authenticatedInventoryPage,
  }) => {
   

    await completePage.assertOrderTextVisible();
  });

  test('TC_COMPLETE_06 - Click back to products returns to inventory', async ({
    
  }) => {
 

    const backToInventory = await completePage.clickBackToProducts();
    await backToInventory.assertOnInventoryPage();
  });

  test('TC_COMPLETE_07 - Success message text is correct', async ({
    authenticatedInventoryPage,
  }) => {
  

    await completePage.assertSuccessMessageText(EXPECTED_TEXT.successMessage);
  });

});
