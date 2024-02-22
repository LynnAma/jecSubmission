// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  //loads the base url
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Item Purchase', () => {
  test('should allow user to search for T-Shirt and Checkout successfully', async ({ page }) => {
   //to assert that the page loads successfully
    await expect (page.getByText('Swag Labs')).toBeVisible();

    //enter login credentials
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
    await page.locator('[data-test="login-button"]').click();

    //asserts that login is successfully
    await expect (page.getByText('Products')).toBeVisible();
    await page.locator('#item_1_title_link').click();

    //select t-shirt from the list of items
    await page.getByText('Sauce Labs Bolt T-Shirt', { exact: true }).click();
    await page.getByText('$').click();
    await page.getByText('Get your testing superhero on').click();

    //view more details about t-shirt
    await expect (page.getByRole('img', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();

    //add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    //remove item from cart
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();

    //add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    //check if cart contains one item
    await page.locator('a').filter({ hasText: '1' }).click();
    await page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' }).click();
    await page.locator('a').filter({ hasText: '1' }).click();
    await page.getByText('Get your testing superhero on').click();

    //checkout item
    await expect (page.getByText('Checkout')).toBeVisible();
    await expect (page.getByText('$15.99')).toBeVisible()
    await expect (page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await page.getByText('Get your testing superhero on').click();
    await page.locator('[data-test="checkout"]').click();

    //fill checkout form
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').press('CapsLock');
    await page.locator('[data-test="firstName"]').fill('Ama');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').press('CapsLock');
    await page.locator('[data-test="lastName"]').fill('Lynn');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('900001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    //ensure checkout was successfully
    await expect (page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await page.getByText('Thank you for your order!Your').click();
    await page.locator('[data-test="back-to-products"]').click();
  });
  });


