import { expect, Locator, Page } from "@playwright/test";
import { AxeResults } from "axe-core";

export default class Assert {

    constructor(private page: Page) { }

    //ui methods
    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(title: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(title);
    }

    async assertToBeVisibile(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async assertContainsText(locator: Locator, textString: string) {
        await expect(locator).toContainText(textString);
    }

    //visual comparison methods
    async visualComparison(page: Page, fullPageScreenshotStatus: string, screenshotName: string) {
        if(fullPageScreenshotStatus.toLocaleLowerCase()=="false") {
            expect(await page.screenshot({
                fullPage: false
            })).toMatchSnapshot(screenshotName + ".png")            
        } else if(fullPageScreenshotStatus.toLocaleLowerCase()=="true") {
            expect(await page.screenshot({
                fullPage: true
            })).toMatchSnapshot(screenshotName + ".png")
        } else {
            throw new Error("Please set the fullPageScreenshotStatus!");
        }
    }

    //accessibility methods
    async checkAccessibilityViolations(axeBuilderObject: AxeResults) {
        expect(axeBuilderObject.violations).toEqual([]);
    }
}
