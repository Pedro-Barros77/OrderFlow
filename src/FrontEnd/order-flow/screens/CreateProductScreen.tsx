import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { InputOutline } from "react-native-input-outline";
import { Colors, GetCategoryColor } from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDown from "react-native-paper-dropdown";
import { Provider, Surface } from "react-native-paper";
import { Category } from "../Models/Category";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import ToggleSwitch from 'toggle-switch-react-native'
import App from "../App";
import { CategoryIcon } from "../constants/Icons";

export default function CreateProduct({ navigation }: RootStackScreenProps<'CreateProduct'>) {

  const Categories = [
    new Category(1, "Outros", CategoryColor.gray, CategoryIcons.question),
    new Category(5, "Bebidas", CategoryColor.blue, CategoryIcons.drinks),
    new Category(2, "Carne/Peixe", CategoryColor.orange, CategoryIcons.meat),
    new Category(3, "Porções", CategoryColor.yellow, CategoryIcons.portions),
    new Category(4, "Sobremesas", CategoryColor.purple, CategoryIcons.desserts),
  ];

  const txtNameRef = useRef(null);
  const txtPriceRef = useRef(null);

  const [categoryId, setCategoryId] = useState('1');
  const [category, setCategory] = useState<Category>(Categories[0]);
  const [showCategory, setShowCategory] = useState(false);
  const [isFavorite, setFavorite] = useState(false);


  function onNameChange() {

  }
  function onPriceChange() {

  }

  function onCancel() {
    navigation.goBack();
  }

  function onSave() {

  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>

        <View style={styles.formContainer}>

          <View style={[styles.imgContainer, { backgroundColor: GetCategoryColor(category.ColorTheme) }]}>
            <CategoryIcon catIcon={category.CategoryIcon} size={90} color={GetCategoryColor(category.ColorTheme, true)}></CategoryIcon>
          </View>

          <InputOutline
            ref={txtNameRef}
            style={styles.input}
            activeColor={Colors.app.tint}
            placeholder="Nome"
            onChangeText={onNameChange}
          />

          <View style={styles.dropdownContainer}>
            <DropDown
              label={"Categoria"}
              mode={"outlined"}
              visible={showCategory}
              showDropDown={() => setShowCategory(true)}
              onDismiss={() => setShowCategory(false)}
              value={categoryId}
              setValue={(value) => { setCategoryId(value); setCategory(Categories.find(x => x.Id == Number.parseInt(value))!) }}
              list={Categories.map(x => ({ label: x.Title, value: x.Id.toString() }))}
              dropDownStyle={styles.dropDownItems}
              activeColor={Colors.app.tint}

            />
          </View>

          <InputOutline
            ref={txtPriceRef}
            style={styles.input}
            activeColor={Colors.app.tint}
            placeholder="Preço"
            onChangeText={onPriceChange}
            keyboardType="decimal-pad"
          />

          <View style={styles.favoriteContainer}>
            <ToggleSwitch
              isOn={isFavorite}
              onColor={Colors.app.tintGreen}
              offColor={Colors.app.redCancel}
              animationSpeed={200}
              label="Marcar como Favorito"
              labelStyle={styles.favoriteLabel}
              size="large"
              onToggle={isOn => setFavorite(isOn)}
            />
          </View>

        </View>

        <View style={styles.buttonsContainer}>

          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.redCancel }]} onPress={onCancel} activeOpacity={.7}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.tintGreen }]} onPress={onSave} activeOpacity={.7}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  imgContainer: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10,
  },

  formContainer: {

  },
  input: {
    display: "flex",
    alignSelf: "center",
    width: "90%",
    height: 50,
    backgroundColor: Colors.app.white,
    marginVertical: 10,
  },

  dropdownContainer: {
    // flex: 1,
    display: "flex",
    marginHorizontal: 20,
    marginBottom: 8,
    justifyContent: "center",
  },

  dropDownItems: {
    transform: [{ translateY: -95 }],
  },

  favoriteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginVertical: 20,
  },

  favoriteLabel: {
    fontSize: 15,
  },


  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",

    width: "100%",
    paddingVertical: 10,
  },

  button: {
    width: "45%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: Colors.app.white,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
});
