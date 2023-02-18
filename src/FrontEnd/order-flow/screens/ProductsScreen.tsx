import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import TextInputBtn from "../components/TextInputBtn";
import HorizontalDivider from "../components/HorizontalDivider";
import CategoryCard from "../components/CategoryCard";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { FlatList } from "react-native";
import ShowMore from "../components/ShowMore";
import ProductCard from "../components/ProductCard";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { RootTabScreenProps } from "../types";

export default function Products({ navigation }: RootTabScreenProps<'Products'>) {
  const txtProductsRef = useRef(null);
  const [txtProductsValue, setText] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentCategories, setCategories] = useState<Array<Category>>([]);
  const [currentProducts, setProducts] = useState<Array<Product>>([]);
  const [productsDividerText, setProductsDividerText] = useState("Favoritos");

  const Categories = [
    new Category(1, "Bebidas", CategoryColor.blue, CategoryIcons.drinks),
    new Category(2, "Carne/Peixe", CategoryColor.orange, CategoryIcons.meat),
    new Category(3, "Porções", CategoryColor.yellow, CategoryIcons.portions),
    new Category(4, "Sobremesas", CategoryColor.purple, CategoryIcons.desserts),
    new Category(5, "Outros", CategoryColor.gray, CategoryIcons.question),
  ];

  const Favorites = [
    new Product(1, "Batata Média", Categories.find((x) => x.Id == 3), 15.0, "", true),
    new Product(2, "Heineken Long Neck", Categories.find((x) => x.Id == 1), 8.0, "", true),
    new Product(3, "Peixe Grande", Categories.find((x) => x.Id == 2), 40.0, "", true),
    new Product(4, "Churrasquinho", Categories.find((x) => x.Id == 2), 9.0, "", false),
    new Product(5, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
    new Product(6, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", true),
    new Product(7, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
    new Product(8, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
    new Product(9, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
    new Product(10, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", true),
    new Product(11, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
    new Product(12, "Molho Extra", Categories.find((x) => x.Id == 5), 2.0, "", false),
  ];

  React.useEffect(() => {
    OnSearchChange();
  }, [txtProductsValue]);

  function OnSearchChange() {
    setCategories(Categories.filter((x) => x.Title.toLowerCase().indexOf(txtProductsValue.toLowerCase()) != -1));


    let newProducts = []
    if (txtProductsValue.length > 0) {
      newProducts = Favorites.filter((x) =>
        x.Name.toLowerCase().indexOf(txtProductsValue.toLowerCase()) != -1 ||
        x.Category.Title.toLowerCase().indexOf(txtProductsValue.toLowerCase()) != -1
      );

      setProducts([...newProducts].sort(SortProducts));
    }
    else {
      newProducts = Favorites.filter((x) => x.IsFavorite);
      setProducts(newProducts);
    }
    setProductsDividerText(txtProductsValue.length == 0 ? "Favoritos" : "Produtos")
  }

  function SortProducts(a: Product, b: Product): number {
    const gr = (a: any, b: any): any => a > b;
    const sm = (a: any, b: any): any => a > b;
    const cmp = (a: any, b: any) => gr(a, b) - sm(a, b)

    if(a.IsFavorite && !b.IsFavorite) return -1;
    else if(!a.IsFavorite && b.IsFavorite) return 1;

    return ((a.Name.toLowerCase().startsWith(txtProductsValue.toLowerCase()) ? -1 : 1))
      ||
      (
        cmp(a.Name.toLowerCase(), b.Name.toLowerCase())
        || cmp(a.Category.Title.toLowerCase(), b.Category.Title.toLowerCase())
      )
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInputBtn
        ref={txtProductsRef}
        placeholder="Produtos"
        onChangeText={setText}
        onPress={OnSearch}
      />

      <HorizontalDivider label="Categorias" />

      <ShowMore disabled={currentCategories.length <= 8}>
        <SafeAreaView>
          <FlatList
            columnWrapperStyle={styles.categoryCol}
            contentContainerStyle={{ justifyContent: "center" }}
            data={FillOdd(currentCategories, 2)}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <CategoryCard
                  label={item.Title}
                  catIcon={item.CategoryIcon}
                  colorTheme={item.ColorTheme}
                  hidden={item.Id == 0}
                />
              );
            }}
            keyExtractor={(item, index) => item.Id.toString()}
          />
        </SafeAreaView>
      </ShowMore>

      <HorizontalDivider label={productsDividerText} />

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          columnWrapperStyle={styles.categoryCol}
          contentContainerStyle={{ justifyContent: "center" }}
          data={FillOdd(currentProducts, 3)}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <ProductCard
                product={item}
                hidden={item.Id == 0}
              />
            );
          }}
          keyExtractor={(item, index) => item.Id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

function FillOdd(data: any, columns: number) {
  while (data.length % columns != 0) {
    data.push(Object.create(data[0]));
    data[data.length - 1].Id = 0;
  }
  return data;
}

function OnSearch() { }

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryCol: {
    justifyContent: "space-evenly",
    marginHorizontal: "2%",
  },
  emptyItem: {
    backgroundColor: "transparent",
  },
});
