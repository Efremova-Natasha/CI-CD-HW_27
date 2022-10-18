import { FilterPage } from "../support/pages/filterPage";
import { PageFactory } from "../support/pages/pageFactory";
import { PAGES, PRICE, SORTING_TYPES } from "../support/types/types";

describe("cars.av.by filter page", () => {
    const filterPage = PageFactory.getPage(PAGES.FILTER) as FilterPage;
    beforeEach(() => {
        filterPage.visitPage()
    })
    it("Filter by price from cheap", () => {
        filterPage.clickSortDropDownList(SORTING_TYPES.CHEAP)
        filterPage.checkSortingByPrice(SORTING_TYPES.CHEAP)
    })
    it("Filter by price from expensive", () => {
        filterPage.clickSortDropDownList(SORTING_TYPES.EXPENSIVE)
        filterPage.checkSortingByPrice(SORTING_TYPES.EXPENSIVE)
    })
    it(`Filter by price from ${PRICE.TEN_TH}`, () => {
        filterPage.inputPriceInFilledPriceFrom(PRICE.TEN_TH)
        filterPage.clickSortDropDownList(SORTING_TYPES.CHEAP)
        filterPage.compareTheCheapestCarAndInputPrice(PRICE.TEN_TH)
    })
})