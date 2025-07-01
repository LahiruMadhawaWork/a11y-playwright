import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  /* Maximum time one test can run for. */
  timeout: 2 * 60000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20000,
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',  
    launchOptions: {
      args: ["--start-maximized"],
    },
    // viewport: { width: 1500, height: 900 },
    viewport: null,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    screenshot: "on",
    video: "on",
    /*contextOptions : {
      recordVideo:{
        dir:'./test-results/videos'
      }
    },*/
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"], viewport: { width: 1536, height: 864 }, isMobile: false },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"], viewport: { width: 1536, height: 864 }, isMobile: false },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"], viewport: { width: 1536, height: 864 }, isMobile: false },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile-Chrome",
    //   use: { ...devices["Pixel 5"], isMobile: true },
    // },
    // {
    //   name: "Mobile-Safari",
    //   use: { ...devices["iPhone 12"], isMobile: true },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft-Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge", viewport: { width: 1536, height: 864 }, isMobile: false },
    // },
    {
      name: "Google-Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1536, height: 864 }, isMobile: false },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
