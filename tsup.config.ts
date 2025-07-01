import { defineConfig } from "tsup"
export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['src/utils/AccessibilityGeneralizedFunctions.ts'],
    dts: true,
    external: [
        'playwright-core'
    ],
})
