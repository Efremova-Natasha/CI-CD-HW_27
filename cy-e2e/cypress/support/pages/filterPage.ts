import { BRANDS, PRICE, SORTING_TYPES } from "../types/types";
import { HomePage } from "./homePage";


export class FilterPage extends HomePage {
    readonly brand: BRANDS = BRANDS.EMPTY;
    constructor(brand?: BRANDS) {
        super();
        if (brand) {
            this.brand = brand;
            this.url = `/${brand}`
        } else {
            this.url = `/filter`
        }
    }

    public getCarsBrandFromAds() {
        return cy.get("div[class='listing-item']")
    }

    public carsBrandFromAdsInclude() {
        this.getCarsBrandFromAds()
            .each(
                ($el) => {
                    cy.wrap($el.text().toLowerCase()).should("include", this.brand.toLowerCase())
                });
    }

    public getPriceAd(onlyFirst: boolean): Cypress.Chainable<JQuery<HTMLElement>> {
        const price = cy.get("div[class='listing-item__priceusd']")
        return onlyFirst ? price.first() : price
    }

    public compareTheCheapestCarAndInputPrice(price: PRICE) {
        this.getPriceAd(true).invoke('text')
            .then(text => {
                expect(+(text.slice(2, -2).replace(/\s/g, ''))).to.be.greaterThan((+price - 1))
            })
    }

    public checkSortingByPrice(typeOfSort: SORTING_TYPES) {
        cy.waitForUrlBySort(typeOfSort)
        const arrayPrices: Array<number> = [];
        this.getPriceAd(false)
            .each(
                ($el) => {
                    arrayPrices.push(+($el.text().slice(2, -2).replace(/\s/g, '')))
                })
            .then(() => {
                expect(this.isArraySorted(typeOfSort, arrayPrices)).to.be.true
            }
            )
    }

    public isArraySorted(typeOfSort: SORTING_TYPES, arrayPrices: Array<number>) {
        let sorted = true;
        switch (typeOfSort) {
            case SORTING_TYPES.CHEAP:
                for (let i = 0; i < arrayPrices.length - 1; i++) {
                    if (!sorted) break
                    sorted = (arrayPrices[i] <= arrayPrices[i + 1])
                }
                return sorted

            case SORTING_TYPES.EXPENSIVE:
                for (let i = 0; i < arrayPrices.length - 1; i++) {
                    if (!sorted) break
                    sorted = (arrayPrices[i] >= arrayPrices[i + 1])
                }
                return sorted
        }
    }

}
