import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import TextInputBtn from "../components/TextInputBtn";
import HorizontalDivider from "../components/HorizontalDivider";
import CategoryCard from "../components/CategoryCard";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import { FlatList } from "react-native";
import ShowMore from "../components/ShowMore";
import ProductCard from "../components/ProductCard";
import { Category } from "../Models/Category";
import { Product } from "../Models/Product";

export default function Products() {
  const txtProductsRef = useRef("Teste");
  const [txtProductsValue, setText] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);


  const Categories = [
    new Category(1, "Bebidas", CategoryColor.blue, CategoryIcons.drinks),
    new Category(2, "Carne/Peixe", CategoryColor.orange, CategoryIcons.meat),
    new Category(3, "Porções", CategoryColor.yellow, CategoryIcons.portions),
    new Category(4, "Sobremesas", CategoryColor.purple, CategoryIcons.desserts),
    new Category(5, "Outros", CategoryColor.gray, CategoryIcons.question),
  ];

  const Favorites = [
    new Product(1, "Batata Média", Categories.find(x => x.Id == 3), 15.00, ""),
    new Product(2, "Heineken Long Neck", Categories.find(x => x.Id == 1), 8.00, ""),
    new Product(3, "Peixe Grande", Categories.find(x => x.Id == 2), 40.00, ""),
    new Product(4, "Churrasquinho", Categories.find(x => x.Id == 2), 9.00, ""),
    new Product(5, "Molho Extra", Categories.find(x => x.Id == 5), 2.00, ""),
  ];




  return (
    <View>
      <TextInputBtn
        ref={txtProductsRef}
        placeholder="Produtos"
        onChangeText={setText}
        onPress={OnSearch}
      />

      <HorizontalDivider label="Categorias" />

      <ShowMore disabled={Categories.length <= 8}>
        <SafeAreaView>
          <FlatList
            columnWrapperStyle={styles.categoryCol}
            contentContainerStyle={{ justifyContent: "center" }}
            data={FillOdd(Categories, 2)}
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

      <HorizontalDivider label="Favoritos" />

      <SafeAreaView>
          <FlatList
            columnWrapperStyle={styles.categoryCol}
            contentContainerStyle={{ justifyContent: "center" }}
            data={FillOdd(Favorites, 3)}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  title={item.Name}
                  price={item.Price}
                  category={item.Category}
                  imageUrl={item.ImageUrl}
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
  while(data.length % columns != 0){
    data.push(Object.create(data[0]));
    data[data.length - 1].Id = 0;
  }
  return data;
}

function OnSearch() {}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  categoryCol: {
    justifyContent: "space-evenly",
    marginHorizontal: "2%",
  },
  emptyItem: {
    backgroundColor: "transparent",
  },
});
