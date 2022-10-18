import { NavigationBar } from "./elements/navigationBar";

export class BasePage {
    protected url!: string;
    public navigationBar: NavigationBar
    constructor() {
        this.navigationBar = new NavigationBar()
     }
    public getPageTitle() {
        return cy.title()
    }

    public visitPage(){
        cy.viewport(1920, 1080)
        cy.visit(this.url)
    }
    public waitForTitleToIncludeText(titleText: string){
        this.getPageTitle().should("include", titleText)
    }
}