/// <reference types="cypress" />

import { defaultWatingTime } from "./constants/constants"
import { SORTING_TYPES } from "./types/types"

Cypress.Commands.add('inputPriceInFilledPriceFrom', (price: string) => {
    cy.get("input[class='richinput-control__value']").first().type(`${price}`)
    cy.wait(defaultWatingTime)
})
Cypress.Commands.add('waitForUrlBySort', (typeOfSort: SORTING_TYPES) => {
    switch (typeOfSort) {
        case SORTING_TYPES.CHEAP:
            cy.url().should('include', 'sort=2')
            break

        case SORTING_TYPES.EXPENSIVE:
            cy.url().should('include', 'sort=3')
            break
    }
})

