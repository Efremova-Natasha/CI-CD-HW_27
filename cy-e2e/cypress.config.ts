import { defineConfig } from "cypress";
import { assetsFolder, baseUrl, defaultWatingTime } from "./cypress/support/constants/constants";
import AllureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  e2e: {
    specPattern: "cy-e2e/cypress/e2e/**/*.cy.ts",
    baseUrl,
    defaultCommandTimeout: defaultWatingTime * 5,
    supportFile: "cy-e2e/cypress/support/index.ts",
    videosFolder: `${assetsFolder}/videos`,
    downloadsFolder: `${assetsFolder}/downloads`,
    screenshotsFolder: `${assetsFolder}/screenshots`,
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: `${assetsFolder}/allure-results`
    }
  },
});
