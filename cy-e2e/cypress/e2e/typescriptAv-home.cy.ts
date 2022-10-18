import { FilterPage } from "../support/pages/filterPage";
import { HomePage } from "../support/pages/homePage"
import { PageFactory } from "../support/pages/pageFactory";
import { BRANDS, INNER_TEXT_IN_SPAN_BUTTON, NAVIGATION_ITEMS, PAGES, PRICE, SORTING_TYPES } from "../support/types/types";

let filterPage: FilterPage;

describe("cars.av.by home page", () => {
    const homePage = PageFactory.getPage(PAGES.HOME) as HomePage;
    before(() => {
        cy.intercept("GET", "https://api.av.by/offer-types/cars/landings/audi").as("audi")
    })
    beforeEach(() => {
        homePage.visitPage()
    })
    it(`Filter by ${BRANDS.AUDI}`, () => {
        filterPage = PageFactory.getPage(PAGES.FILTER, BRANDS.AUDI) as FilterPage;
        homePage.clickBrandByInnerText(BRANDS.AUDI)
        cy.wait("@audi").then(data => {
            expect(data.response?.statusCode).to.equal(200)
        })
        filterPage.waitForTitleToIncludeText(BRANDS.AUDI)
    })
    it(`Should open ${NAVIGATION_ITEMS.TIRES_AND_WHEELS} page `, () => {
        homePage.navigationBar.clickNavigationItemByInnerText(NAVIGATION_ITEMS.TIRES_AND_WHEELS)
        homePage.waitForTitleToIncludeText(`${NAVIGATION_ITEMS.TIRES_AND_WHEELS.toLowerCase()}`)
    })
    it(`Filter by price from ${PRICE.EIGHT_TH}`, () => {
        filterPage = PageFactory.getPage(PAGES.FILTER) as FilterPage;
        homePage.inputPriceInFilledPriceFrom(PRICE.EIGHT_TH)
        homePage.clickOnSpanButtonByInnerText(INNER_TEXT_IN_SPAN_BUTTON.SHOW)
        filterPage.clickSortDropDownList(SORTING_TYPES.CHEAP)
        filterPage.compareTheCheapestCarAndInputPrice(PRICE.EIGHT_TH)
    })
})