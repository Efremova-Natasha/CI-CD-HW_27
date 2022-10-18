import { BRANDS, PAGES } from "../types/types";
import { FilterPage } from "./filterPage";
import { HomePage } from "./homePage";

export class PageFactory {
    static getPage(pageName: PAGES, filter?: BRANDS){
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage()
            case PAGES.FILTER:
                return new FilterPage(filter)    
            default:
                break;
        }
    }
}