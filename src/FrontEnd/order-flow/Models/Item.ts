import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { Category } from "./Category";
import { Product } from "./Product";
import { Table } from "./Table";

export class Item {
  id: number = 0;
  productId: number = 0;
  tableId: number = 0;
  product: Product | undefined = undefined;
  table: Table | undefined = undefined;
  Count: number = 0;
  discount: number = 0;
  deliverd: boolean = false;  
}
