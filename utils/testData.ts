/**
 * Test Data & Constants
 * Centralized constants for all tests to maintain consistency
 */

export const EXPECTED_TEXT = {
  appTitle: 'Swag Labs',
  cartTitle: 'Your Cart',
  checkoutTitle: 'Checkout: Your Information',
  checkoutOverviewTitle: 'Checkout: Overview',
  orderCompleteTitle: 'Checkout: Complete!',
  totalProducts: 6,
  productListTitle: 'Products',
  successMessage: 'Thank you for your order!',
};

export const URLS = {
  login: '/',
  inventory: '/inventory',
  cart: '/cart',
  checkout: '/checkout-step-one',
  checkoutOverview: '/checkout-step-two',
  checkoutComplete: '/checkout-complete',
};

export const ERROR_MESSAGES = {
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
};

export const PRODUCTS = {
  backpackName: 'Sauce Labs Backpack',
  bikeLightName: 'Sauce Labs Bike Light',
  boltTShirtName: 'Sauce Labs Bolt T-Shirt',
};

export const CHECKOUT_INFO = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};
