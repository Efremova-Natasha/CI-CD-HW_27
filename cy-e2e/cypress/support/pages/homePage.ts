import { BRANDS, INNER_TEXT_IN_SPAN_BUTTON, SORTING_TYPES } from "../types/types";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    constructor() {
        super();

        this.url = "/"
    }

    public getBrandByInnerText(brand: BRANDS) {
        return cy.get("div[class='catalog__list']").contains(brand)
    }

    public clickBrandByInnerText(brand: BRANDS) {
        this.getBrandByInnerText(brand).click()
    }

    public inputPriceInFilledPriceFrom(price: string) {
        cy.inputPriceInFilledPriceFrom(price)
    }

    public clickOnSpanButtonByInnerText(innerText: INNER_TEXT_IN_SPAN_BUTTON) {
        cy.get("span[class='button__text']").contains(innerText).click()
    }

    public clickSortDropDownList(typeSort: SORTING_TYPES) {
        cy.get("span[class='dropdown-link__value']").click()
        cy.get("button[class='dropdown__listbutton']").contains(typeSort).click()
        cy.waitForUrlBySort(typeSort)
    }
}