import { Locator, Page, TestInfo, expect } from "@playwright/test";
import PlaywrightWrapper from "../base/playwrightBase";
import Assert from "../base/assertBase";
import { AxeResults } from "axe-core";

const logger = require("../utils/tddLogger");

export default class HeaderPage {
    private base: PlaywrightWrapper;
    private objAssert: Assert;

    private isMobile: boolean | undefined;

    //Constructor
    constructor(private page: Page, isMobileConstructor: boolean | undefined) {
    // constructor(private page: Page) {    
        this.base = new PlaywrightWrapper(page);
        this.objAssert = new Assert(page); 
        this.isMobile = isMobileConstructor; 
    }

    /**
    * accessibility methods
    */
    async checkAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page: Page, testInfo: TestInfo, strDisableRulesArray: string[], strWcagaaTagsArray: string[], strCategory: string) {
        if(this.isMobile==false) {
            let wcagaaTagsArray: string[] = strWcagaaTagsArray;
            let disableRulesArray: string[] = strDisableRulesArray;
            const axeBuilderObj = await this.base.checkAccessibilityForWCAGTagsAndRulesDisabled(page, wcagaaTagsArray, disableRulesArray);
            await this.base.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + " Page accessibility results when Tags And Rules Disabled");
            return axeBuilderObj;
        } if(this.isMobile==true) {
            logger.warn("Please note that the " + strCategory + "functionality is not available in the mobile web application"); 
            testInfo.attach("Please note that the " + strCategory + "functionality is not available in the mobile web application");
        }
    }
    async assertAccessibilityResults(axeBuilderObject: AxeResults, testInfo: TestInfo, strCategory: string) {
        if(this.isMobile==false) {
          await this.objAssert.checkAccessibilityViolations(axeBuilderObject);
          logger.info("Event\'s Linked Items Page accessibility testing results generation is completed");
        } if(this.isMobile==true) {
          logger.warn("Please note that the " + strCategory + "functionality is not available in the mobile web application"); 
          testInfo.attach("Please note that the " + strCategory + "functionality is not available in the mobile web application");
        } 
    }
}

export { HeaderPage as HeaderPage };
