import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { Category } from "./Category";

export class Product {
  Id: number = 0;
  Name: string = "";
  CategoryId: number = 1;
  Category: Category = new Category(0, "Outros", CategoryColor.gray, CategoryIcons.question);
  Price: number = 0;
  ImageUrl: string = "";
  IsFavorite: boolean = false;

  constructor(
    id: number,
    name: string,
    category: Category | undefined,
    price: number,
    imageUrl: string,
    isFavorite: boolean
  ) {
    this.Id = id;
    this.Name = name;
    if (category) {
      this.Category = category;
      this.CategoryId = category.Id;
    }
    this.Price = price;
    this.ImageUrl = imageUrl;
    this.IsFavorite = isFavorite;
  }
}
