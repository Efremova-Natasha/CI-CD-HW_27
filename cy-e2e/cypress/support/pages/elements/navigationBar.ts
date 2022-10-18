import { NAVIGATION_ITEMS } from "../../types/types"

export class NavigationBar {
    constructor() { }
    public getNavigationItemByInnerText(itemText: NAVIGATION_ITEMS) {
        return cy.get("nav[class='nav']").contains(itemText)
    }
    public clickNavigationItemByInnerText(itemText: NAVIGATION_ITEMS) {
        this.getNavigationItemByInnerText(itemText).click()
    }

}