import { expect, Locator, Page, TestInfo } from "@playwright/test";
import PlaywrightWrapper from "../base/playwrightBase";
import Assert from "../base/assertBase";
import AxeBuilder from "@axe-core/playwright";
import { AxeResults } from "axe-core";
import HeaderPage from "../pages/HeaderPage";

const logger = require("../utils/tddLogger");

export default class AccessibilityGeneralizeFunctions {
    private axeBuilder!: AxeResults; 
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
    //accessibility methods - assert based on violations
    async checkAccessibilityViolations(axeBuilderObject: AxeResults) {
        expect(axeBuilderObject.violations).toEqual([]);
    }
    /**
    * accessibility methods - Header Page Generalized Methods
    */
    async checkAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page: Page, testInfo: TestInfo, strDisableRulesArray: string[], strWcagaaTagsArray: string[], strCategory: string) {
        if(this.isMobile==false) {
            let wcagaaTagsArray: string[] = strWcagaaTagsArray;
            let disableRulesArray: string[] = strDisableRulesArray;
            const axeBuilderObj = await this.checkAccessibilityForWCAGTagsAndRulesDisabled(page, wcagaaTagsArray, disableRulesArray);
            await this.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + " Page accessibility results when Tags And Rules Disabled");
            return axeBuilderObj;
        } if(this.isMobile==true) {
            logger.warn("Please note that the " + strCategory + "functionality is not available in the mobile web application"); 
            testInfo.attach("Please note that the " + strCategory + "functionality is not available in the mobile web application");
        }
    }
    async assertAccessibilityResults(axeBuilderObject: AxeResults, testInfo: TestInfo, strCategory: string) {
        if(this.isMobile==false) {
          await this.checkAccessibilityViolations(axeBuilderObject);
          logger.info("Event\'s Linked Items Page accessibility testing results generation is completed");
        } if(this.isMobile==true) {
          logger.warn("Please note that the " + strCategory + "functionality is not available in the mobile web application"); 
          testInfo.attach("Please note that the " + strCategory + "functionality is not available in the mobile web application");
        } 
    }
    /**
     * accessibility methods - Generalized Methods
     */    
    //01 - accessibility generalized methods - verification generalized method - return results in a array
    async generalizedCheckAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page: Page, testInfo: TestInfo, strDisableRulesArray: string[], strWcagaaTagsArray: string[], strCategory: string) {
        return await this.checkAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page, testInfo, strDisableRulesArray, strWcagaaTagsArray, strCategory);
    }
    //02 - accessibility generalized methods - assertion generalized method
    async generalizedAssertAccessibilityResults(axeBuilderObject: AxeResults, testInfo: TestInfo, strCategory: string) {
        await this.assertAccessibilityResults(axeBuilderObject, testInfo, strCategory);               
    }
    //03 - accessibility generalized methods - whole page verification generalized method - return results in a array
    async checkAccessibilityForWholePage(page: Page, testInfo: TestInfo, strCategory: string) {
        const axeBuilderObj = await this.checkAccessibilityForWholePageSupporter(page);
        await this.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + "accessibility results for whole page");
        return axeBuilderObj;
    }
    //04 - accessibility generalized methods - specific element verification generalized method - return results in a array
    async checkAccessibilityForSpecificElementOfThePage(page: Page, testInfo: TestInfo, strCategory: string, elementLocator: string) {
        const axeBuilderObj = await this.checkAccessibilityForSpecificElementOfThePageSupporter(page, elementLocator);
        await this.attachAccessibilityResultsJsonToReport(testInfo, axeBuilderObj, strCategory + "Page accessibility results for specific Element");
        await this.checkAccessibilityViolations(axeBuilderObj);
    } 
    //ui accessibility methods
    async checkAccessibilityForWholePageSupporter(page: Page) {
        this.axeBuilder = await new AxeBuilder({ page }).analyze();
        return this.axeBuilder;
    }

    async checkAccessibilityForSpecificElementOfThePageSupporter(page: Page, elementLocator: string) {
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
}

export { AccessibilityGeneralizeFunctions as AccessibilityGeneralizedFunctions };
