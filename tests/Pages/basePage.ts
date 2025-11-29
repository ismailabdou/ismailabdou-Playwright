import { Page, Locator } from 'playwright/test'

// Base page class to be extended by all page classes

export default class BasePage {
    protected readonly page: Page;
    // Constructor to initialize the page object
    constructor(page: Page) {
        this.page = page;
    }
    // Common methods for all pages can be added here

    protected async clickOnElement(element: Locator) {
        await element.click();
    }
    protected async enterTextToElement(element: Locator, text: string) {
        await element.fill(text);

    }
    public async takeScreenshot(filePath: string) {
        await this.page.screenshot({ path: filePath });

}
}
