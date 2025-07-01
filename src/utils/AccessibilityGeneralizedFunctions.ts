import { Locator, Page, TestInfo } from "@playwright/test";
import PlaywrightWrapper from "../base/playwrightBase";
import Assert from "../base/assertBase";
import { AxeResults } from "axe-core";
import HeaderPage from "../pages/HeaderPage";

const logger = require("../utils/tddLogger");

export default class AccessibilityGeneralizeFunctions {
    private base: PlaywrightWrapper;
    private objAssert: Assert;
    private isMobile: boolean | undefined;

    private objHeaderPage: HeaderPage;

    //Constructor
    constructor(private page: Page, isMobileConstructor: boolean | undefined) {
        this.base = new PlaywrightWrapper(page);
        this.objAssert = new Assert(page);     
        this.isMobile = isMobileConstructor;
        this.objHeaderPage = new HeaderPage(page, isMobileConstructor);
    }
    /**
     * accessibility methods - Generalized Methods
     */    
    //01 - accessibility generalized methods - verification generalized method - return results in a array
    async generalizedCheckAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page: Page, testInfo: TestInfo, strDisableRulesArray: string[], strWcagaaTagsArray: string[], strCategory: string) {
        return await this.objHeaderPage.checkAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page, testInfo, strDisableRulesArray, strWcagaaTagsArray, strCategory);
    }
    //02 - accessibility generalized methods - assertion generalized method
    async generalizedAssertAccessibilityResults(axeBuilderObject: AxeResults, testInfo: TestInfo, strCategory: string) {
        await this.objHeaderPage.assertAccessibilityResults(axeBuilderObject, testInfo, strCategory);               
    }
    //03 - accessibility generalized methods - whole page verification generalized method - return results in a array
    async checkAccessibilityForWholePage(page: Page, testInfo: TestInfo, strCategory: string) {
        const axeBuilderObj = await this.base.checkAccessibilityForWholePage(page);
        await this.base.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + "accessibility results for whole page");
        return axeBuilderObj;
    }
    //04 - accessibility generalized methods - specific element verification generalized method - return results in a array
    async checkAccessibilityForSpecificElementOfThePage(page: Page, testInfo: TestInfo, strCategory: string, elementLocator: string) {
        const axeBuilderObj = await this.base.checkAccessibilityForSpecificElementOfThePage(page, elementLocator);
        await this.base.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + "Page accessibility results for specific Element");
        await this.objAssert.checkAccessibilityViolations(axeBuilderObj);
    } 
}

export { AccessibilityGeneralizeFunctions as AccessibilityGeneralizedFunctions };
