import BasePage from "../basePage";

// Login page class extending the base page class
export default class LoginPage extends BasePage {
    // Locators for the login page elements
    private readonly usernameField = this.page.locator('[id="user-name"]');
    private readonly passwordField = this.page.locator('[id="password"]');
    private readonly loginButton = this.page.locator('[id="login-button"]');
    
    // Method to enter username
    async enterUsername(username: string){
        await this.enterTextToElement(this.usernameField, username);
    }
    // Method to enter password
    async enterPassword(password: string){
        await this.enterTextToElement(this.passwordField, password);

    }
    // Method to click on the login button
    async clickOnLoginButton(){
        await this.clickOnElement(this.loginButton);
    }
}