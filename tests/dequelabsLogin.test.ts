import { BrowserContext, chromium, expect, Page, test } from "@playwright/test";
import { AxeResults } from "axe-core";
import HeadersPage from "../src/pages/HeaderPage";
import AccessibilityGeneralizeFunctions from "../src/utils/AccessibilityGeneralizedFunctions";

const logger = require("../src/utils/tddLogger");

test.describe("User Authentication test scenario @assystwebnew", () => {
    // Test to navigate to the Deque Labs Broken Workshop login page
    // This test simply opens the URL and checks that the page loads successfully

    //let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    //let isMobile: boolean | undefined;

    let objHeaderPage: HeadersPage;
    let objAccessibilityGeneralizedFunctions: AccessibilityGeneralizeFunctions;
    
    test.beforeAll(async ({ browser, isMobile }) => {
        browser = await chromium.launch();
        context = await browser.newContext({
            recordVideo: {
                dir: `./test-results/videos/`,
                size: { width: 1418, height: 789 }
            }
        });
        await context.clearCookies();
        page = await context.newPage();
        objHeaderPage = new HeadersPage(page, isMobile);
        objAccessibilityGeneralizedFunctions = new AccessibilityGeneralizeFunctions(page, isMobile);
    })

    test.beforeEach(async ({ browser }, testInfo) => {
        await test.step("Given a user is able to navigate to the application", async () => {
            //Adding scenario information - playwright report
            testInfo.annotations.push({ type: 'scenario-given-step-01', description: 'Given a user is able to navigate to the application' });
            // test step implementation in code
            // Navigate to the target URL
            // await page.goto('https://broken-workshop.dequelabs.com/');
            // Wait for the page to load by checking for a visible element (e.g., the body)
            await expect(page.locator('body')).toBeVisible();
            // Optionally, you can add more assertions here to verify specific elements on the login page
            // Example: Check for a login form or a specific heading
            // await expect(page.locator('form')).toBeVisible();
        });
    })

    test('Verify that the Deque Labs Broken Workshop Home Page is aligning to accessibility guidelines', async ({ browser }, testInfo) => {
        let axeBuilderObject: AxeResults | undefined;
        await test.step("When conduct accessibility verification for the whole page", async () => {
            //Adding scenario information - playwright report
            testInfo.annotations.push({ type: 'scenario-when-step-01', description: 'When conduct accessibility verification for the whole Home page' });
            // test step implementation in code
            let disableRulesArray: string[] = ['document-title', 'html-has-lang', 'landmark-one-main', 'page-has-heading-one'];
            axeBuilderObject = await objAccessibilityGeneralizedFunctions.generalizedCheckAccessibilityBasedOnWCAGAATagsAndRulesDisabled(page, testInfo, disableRulesArray, "Home");
            if (!axeBuilderObject) {
                throw new Error("Accessibility check did not return results.");
            }
            logger.info("Home Page accessibility testing results generation is completed");
            //Capture a screenshot and attach it.
            const path = testInfo.outputPath('step2-home-page.png');
            await page.screenshot({ path });
            testInfo.attachments.push({ name: 'step2-home-page.png', path, contentType: 'image/png' });
        })
        await test.step("Then accessibility verification results should meet WCAG AA or AAA standards", async () => {
            //Adding scenario table information - playwright report
            testInfo.annotations.push({ type: 'scenario-then-step-01', description: 'Then accessibility verification results should meet WCAG AA or AAA standards' });
            // test step implementation in code
            if (!axeBuilderObject) {
                throw new Error("Accessibility results are undefined.");
            }
            await objAccessibilityGeneralizedFunctions.generalizedAssertAccessibilityResults(axeBuilderObject, testInfo, "Home");
            logger.info("Home Page accessibility testing verification is completed");            
        })
    });

    test.afterEach(async ({ browser }, testInfo) => {        
        // Capture the test execution results status after every test
        if (testInfo.status !== testInfo.expectedStatus)
            logger.info(`${testInfo.title} did not run as expected!`);
    })
    
    test.afterAll(async ({ browser }, testInfo) => {
        await page.close();          
        await context.close();
        await browser.close();        
    })
});

