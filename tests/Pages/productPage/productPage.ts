import BasePage from "../basePage";

export default class ProductPage extends BasePage {

    private readonly saucelabsbackpackAddToCartButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    private readonly cartBtn = this.page.locator('.shopping_cart_badge');

    async clickOnAddToCartButton() {
        await this.clickOnElement(this.saucelabsbackpackAddToCartButton);
    }
    async clickOnCartButton() {

        await this.clickOnElement(this.cartBtn);
    }
}