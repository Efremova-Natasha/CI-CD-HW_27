/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
import './commands';
import { SORTING_TYPES } from './types/types';
import '@shelex/cypress-allure-plugin';

declare global {
    namespace Cypress {
        interface Chainable {
            inputPriceInFilledPriceFrom(price: string): Cypress.Chainable<JQuery<HTMLElement>>
            waitForUrlBySort(typeOfSort: SORTING_TYPES): Cypress.Chainable<JQuery<HTMLElement>>
        }
    }
}