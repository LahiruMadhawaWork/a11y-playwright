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

    
}

export { HeaderPage as HeaderPage };
