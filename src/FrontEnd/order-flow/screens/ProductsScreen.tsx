import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import TextInputBtn from "../components/TextInputBtn";
import HorizontalDivider from "../components/HorizontalDivider";
import CategoryCard from "../components/CategoryCard";
import { CategoryColor } from "../constants/Enums";
import { FlatList } from "react-native";

export default function Products() {
  const txtProductsRef = React.useRef("Teste");
  const [txtProductsValue, setText] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const Categories = [
    { id: 1, title: "Bebidas", colorTheme: CategoryColor.blue },
    { id: 2, title: "Carne/Peixe", colorTheme: CategoryColor.blue },
    { id: 3, title: "Carne/Peixe", colorTheme: CategoryColor.blue },
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

      <SafeAreaView>
        <FlatList
          contentContainerStyle={styles.categoryItems}
          data={Categories}
          numColumns={2}
          renderItem={({ item }) => {
            if (item.id == 0) {
              return <View style={styles.emptyItem} />;
            }
            return (
              <CategoryCard label={item.title} colorTheme={item.colorTheme} />
            );
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
        <HorizontalDivider label="Favoritos" />
      </SafeAreaView>
    </View>
  );
}

function createRows(data: any, columns: number) {
  const rows = Math.floor(data.length / columns); // [A]
  let lastRowElements = data.length - rows * columns; // [B]
  while (lastRowElements !== columns) {
    // [C]
    data.push({
      // [D]
      id: 0,
    });
    lastRowElements += 1; // [E]
  }
  return data; // [F]
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
  categoryItems: {
    justifyContent: 'space-evenly',
    
  },
  emptyItem:{
    backgroundColor:"transparent"
  }
});
