import { Page, TestInfo, Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { AxeResults } from "axe-core";

export default class PlaywrightWrapper {
    private axeBuilder!: AxeResults;    

    constructor(private page: Page) { }

    //ui methods
    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
        await this.page.waitForNavigation();
    }

    async waitAndClick(element: Locator) {
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }

    async waitClickAndWaitForNavigation(element: Locator) {
        await element.waitFor({
            state: "visible"
        });
        await Promise.all([            
            element.click(),
            this.page.waitForNavigation()
        ])
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }

    async takeScreenshot(page: Page, stepName: string) {
        let img: Buffer;
        img = await page.screenshot(
            { path: `./test-results/screenshots/${stepName}.png`, type: "png" })
        return img;
    }    

    //ui accessibility methods
    async checkAccessibilityForWholePage(page: Page) {
        this.axeBuilder = await new AxeBuilder({ page }).analyze();
        return this.axeBuilder;
    }

    async checkAccessibilityForSpecificElementOfThePage(page: Page, elementLocator: string) {
        this.axeBuilder = await new AxeBuilder({ page })
            .include(elementLocator)    
            .analyze();
        return this.axeBuilder;
    }

    async checkAccessibilityExcludingSpecificElementOfThePage(page: Page, elementLocator: string) {
        this.axeBuilder = await new AxeBuilder({ page })
            .exclude(elementLocator)
            .analyze();
        return this.axeBuilder;
    }

    async checkAccessibilityForWCAGTags(page: Page, tagsArray: string[]) {
        this.axeBuilder = await new AxeBuilder({ page })
            .withTags(tagsArray)
            .analyze();        
        return this.axeBuilder;
    }

    async checkAccessibilityForWCAGTagsAndRulesDisabled(page: Page, tagsArray: string[], disableRulesArray: string[]) {
        this.axeBuilder = await new AxeBuilder({ page })
            .withTags(tagsArray)
            .disableRules(disableRulesArray)
            .analyze();        
        return this.axeBuilder;
    }

    async attachAccessibilityResultsJsonToReport(testInfo: TestInfo, axeBuilderJsonObject: AxeResults, resultsName: string){
        await testInfo.attach(resultsName, {
            body: JSON.stringify(axeBuilderJsonObject, null, 2),
            contentType: "application/json"
        })
    }
    
    //ui api methods
    // async getRequest(baseURL: string, paramsList: ) {
    //     const _response = await request.get(`${baseURL}`, {
    //         params: paramsList
    //     })
    //     const response = await _response.json();
    //     return response;
    // }

    // async postRequest(baseURL: string, requestBody: JSON) {
    //     const _response = await request.post(`${baseURL}`, {
    //         data: requestBody
    //     })
    //     const response = await _response.json();
    //     return response;
    // }
}

export { PlaywrightWrapper as PlaywrightBase };
