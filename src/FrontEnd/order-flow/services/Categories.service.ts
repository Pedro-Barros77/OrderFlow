import { API_BaseUrl } from "../constants/config";
import { Category } from "../models/Category";

function GetAllCategories(): Promise<Array<Category>> {
  const result = fetch(`${API_BaseUrl}/categories/all`)
    .then((response) => response.json())
    .then((json) => {
      return json.data as Array<Category>;
    })
    .catch((error) => {
      console.error(error);
      return new Array<Category>();
    });

  return result;
}


export {GetAllCategories}