import { CategoryColor, CategoryIcons } from "../constants/Enums";

export class Category{
    id: number = 0;
    title: string = "";
    colorTheme: CategoryColor = 0;
    categoryIcon: CategoryIcons = 0;

    constructor(id: number, title: string, colorTheme: CategoryColor, categoryIcon: CategoryIcons){
        this.id = id;
        this.title = title;
        this.colorTheme = colorTheme;
        this.categoryIcon = categoryIcon;
    }
}