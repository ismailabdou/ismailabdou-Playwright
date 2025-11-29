import { after, before } from 'node:test';
import { test } from '../fixtures/fixture';
//import LoginPage from './Pages/loginPage/loginPage';
//import ProductPage from './Pages/productPage/productPage';
import * as testData from './testData/testData.json';
import LoginPage from './Pages/loginPage/loginPage';
import ProductPage from './Pages/productPage/productPage';
import { Page } from 'playwright';

//hooks
let page: Page;
let loginPage: LoginPage;
let productPage: ProductPage;
test.describe('E2E Test Suite', () => {
test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await page.goto('https://www.saucedemo.com/');
})

test.afterEach(async () => {
    await page.close();
})


test('E2E', async () => {

    // const loginPage = new LoginPage(page);
    // const productPage = new ProductPage(page);
    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    // Take screenshot after login
    await loginPage.takeScreenshot('./tests/screenshots/loginPage.png');
    await loginPage.clickOnLoginButton();

    await productPage.clickOnAddToCartButton();
    // Take screenshot after login
    await productPage.takeScreenshot('./tests/screenshots/productPage.png');
    await productPage.clickOnCartButton();

    // Take screenshot after login
    await productPage.takeScreenshot('./tests/screenshots/cartPage.png');

    await page.waitForTimeout(3000);
})
});



test('outside suite 1 @sanity', async ({ page }) => {
   console.log('ouside suite sanity 1 executed');
})
test('outside suite 2 @sanity', async ({ page }) => {
   console.log('ouside suite sanity 2 executed');
})
test('outside suite 1 @smoke', async ({ page }) => {
   console.log('ouside suite smoke 1 executed');
})
test('outside suite 2 @smoke', async ({ page }) => {
   console.log('ouside suite smoke 2 executed');
})
