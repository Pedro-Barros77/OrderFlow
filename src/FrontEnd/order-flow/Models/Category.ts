import { CategoryColor, CategoryIcons } from "../constants/Enums";

export class Category{
    Id: number = 0;
    Title: string = "";
    ColorTheme: CategoryColor = 0;
    CategoryIcon: CategoryIcons = 0;

    constructor(id: number, title: string, colorTheme: CategoryColor, categoryIcon: CategoryIcons){
        this.Id = id;
        this.Title = title;
        this.ColorTheme = colorTheme;
        this.CategoryIcon = categoryIcon;
    }
}