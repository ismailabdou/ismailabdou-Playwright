import { test, expect } from '@playwright/test'
import { promises } from 'dns';

test('login', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator('[id="username"]').fill('tomsmith');
    await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!', { delay: 200 });
    await page.locator('[id="password"]').press('Enter');
})


test('click', async ({ page }) => {
    await page.goto("https://play1.automationcamp.ir/mouse_events.html");

    await page.locator('[id="click_area"]').click();
    await expect(page.locator('[id="click_type"]')).toHaveText('Click');

    await page.locator('[id="click_area"]').dblclick();
    await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click');

    await page.locator('[id="click_area"]').click({ button: 'right' });
    await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click');


})

test('Radio', async ({ page }) => {
    await page.goto("http://test.rubywatir.com/radios.php");

    await page.locator('[class="radioclass"]').check();
    await expect(page.locator('[id="radioId"]')).not.toBeChecked();

    await page.locator('[id="radioId"]').check();
    await expect(page.locator('[id="radioId"]')).toBeChecked();


})

test('checkbox', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    await page.locator('(//*[@type="checkbox"])[1]').uncheck();
    await expect(page.locator('(//*[@type="checkbox"])[1]')).not.toBeChecked();

    await page.locator('(//*[@type="checkbox"])[1]').check();
    await expect(page.locator('(//*[@type="checkbox"])[1]').isChecked).toBeTruthy;

})

test('dropdown', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    await page.selectOption('[id="dropdown"]', {
        value: "1"
    });

    await page.pause();

    await page.selectOption('[id="dropdown"]', {
        label: "Option 2"
    });

    await page.pause();
    await page.selectOption('[id="dropdown"]', {
        index: 2
    });

})


test('multiselect', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");

    await page.selectOption('[id="multi-select"]', [
        { value: "California" },
        { value: "New Jersey" },
        { value: "Pennsylvania" }
    ])
    await page.pause();

});

test('dynamic', async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Register.html");

    await page.locator('[role="combobox"]').click();
    await page.locator('//li[text()="India"]').click();
    await page.pause();

});


test('alert', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Alert');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert');
    })

    await page.locator('[onclick="jsAlert()"]').click();

});



test('confirmation ok', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Confirm');
        await alert.accept();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok');
    })

    await page.locator('[onclick="jsConfirm()"]').click();

});


test('cancel', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS Confirm');
        await alert.dismiss();
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Cancel');
    })

    await page.locator('[onclick="jsConfirm()"]').click();

});


test.only('promptalertok', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS prompt');
        await alert.accept('ismail');
        await expect(page.locator('[id="result"]')).toHaveText('You entered: ismail');
    })

    await page.locator('[onclick="jsPrompt()"]').click();

});


test.only('promptalertcancel', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toEqual('I am a JS prompt');
        await alert.dismiss();
        await expect(page.locator('[id="result"]')).toHaveText('You entered: null');
    })

    await page.locator('[onclick="jsPrompt()"]').click();

});


test('frames', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/nested_frames");

    // count frames
    let framesCount = await page.frames().length;
    console.log("Frames count: " + framesCount);

    //locate frame bottom
    let framebottom = page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]');
    await expect(framebottom).toHaveText('BOTTOM');

    //locate frame middle
    let topframe = page.frame('frame-top');
    let frameschilds = topframe?.childFrames();
    let middleframe = frameschilds[1];
    await expect(middleframe.locator('[id="content"]')).toHaveText('MIDDLE');

});

test('tabs', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/windows");

    // wait for new tab to open

    const [browsertabs] = await Promise.all([
        page.waitForEvent('popup'), page.locator('[href="/windows/new"]').click()
    ]);

    // wait for load state

    await browsertabs.waitForLoadState();
    // get all tabs
    const pages = browsertabs.context().pages();
    // print total tabs
    console.log("Total tabs: " + pages.length);
    // switch to default tab and verify text
    const defaultTab = pages[0];
    await expect(defaultTab.locator('//h3')).toHaveText('Opening a new window');
    // switch to latest tab and verify text
    const latestTab = pages[pages.length - 1];
    await expect(latestTab.locator('//h3')).toHaveText('New Window');
    // close tabs

    defaultTab.close();
    latestTab.close();
});



test('seperate page', async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Windows.html");

    await page.locator('[href="#Seperate"]').click();

    // wait for new tab to open

    const [newTab] = await Promise.all([
        page.context().waitForEvent('page'), page.locator('[onclick="newwindow()"]').click()
    ])
    // wait for load state
    await newTab.waitForLoadState();
    await newTab.locator('[href="/downloads"]').click();
    // verify downloads page

    await expect(newTab.locator('[class="d-1"]')).toContainText('Downloads');
    // switch to default page and verify text

    await newTab.close();

    await page.locator('[href="Index.html"]').click();
    // verify home page

    await expect(page.locator('[id="btn1"]')).toHaveText('Sign In');
    // close pages



    await page.close();

});


test('darg and drop', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
    // locate boxes

    const BoxA = await page.locator('[id="column-a"]');
    const BoxB = await page.locator('[id="column-b"]');
    // drag and drop using mouse events
    await BoxA.hover();
    await page.mouse.down();
    // move to box B
    await BoxB.hover();
    await page.mouse.up();
    // wait for 3 seconds to see the result
    await page.waitForTimeout(3000);


    await BoxB.dragTo(BoxA);
    await page.waitForTimeout(3000);

    // wait for 3 seconds to see the result
    await page.close();


});

test('downloadfile', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");

    // initiate download and wait for download event

    const download = await Promise.all([
        page.waitForEvent('download'),
        page.locator('[href="download/output.txt"]').click()
    ])

    // save downloaded file
    const downlodedFile = download[0];
    // get path of downloaded file
    const downloadedFilepath = await downlodedFile.path();
    // get suggested filename
     //const downloadedFilename = downlodedFile.suggestedFilename();
    // save to a specific path
    await downlodedFile.saveAs('ismail00');
    // print file name and path
    console.log("Downloaded file path: " + downloadedFilepath);


});


test('uploadfile', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");

    // initiate file upload dialog and wait for file chooser event

    const uploadfile = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('[id="file-upload"]').click()
    ])

    // set files to upload

    await uploadfile[0].setFiles('ismail00');
    // submit file

    await page.locator('[id="file-submit"]').click();
    // verify upload success

    await page.waitForTimeout(3000);

});