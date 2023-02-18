import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useHeaderHeight } from '@react-navigation/elements';
import {MD3LightTheme} from "react-native-paper";
import { InputOutline } from "react-native-input-outline";
import { Colors, GetCategoryColor } from "../constants/Colors";
import DropDown from "react-native-paper-dropdown";
import { Category } from "../models/Category";
import { CategoryColor, CategoryIcons } from "../constants/Enums";
import ToggleSwitch from 'toggle-switch-react-native'
import { CategoryIcon } from "../constants/Icons";

export default function EditProduct({ route, navigation }: any) {

  const Categories = [
    new Category(1, "Outros", CategoryColor.gray, CategoryIcons.question),
    new Category(5, "Bebidas", CategoryColor.blue, CategoryIcons.drinks),
    new Category(2, "Carne/Peixe", CategoryColor.orange, CategoryIcons.meat),
    new Category(3, "Porções", CategoryColor.yellow, CategoryIcons.portions),
    new Category(4, "Sobremesas", CategoryColor.purple, CategoryIcons.desserts),
  ];

  const txtNameRef = useRef(null);
  const txtPriceRef = useRef(null);
  const txtDescriptionRef = useRef(null);

  const [categoryId, setCategoryId] = useState('1');
  const [category, setCategory] = useState<Category>(Categories[0]);
  const [showCategory, setShowCategory] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const { productId } = route.params ?? {};
  const headerHeight = useHeaderHeight();



  useEffect(() => {
    if (productId && productId > 0) {
      navigation.setOptions({
        title: "Editar Produto",
      });
    }
  })


  function onNameChange() {

  }
  function onPriceChange() {

  }
  function onDescriptionChange() {

  }

  function onCancel() {
    navigation.goBack();
  }

  function onSave() {

  }

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={[styles.container, {height:Dimensions.get('window').height - headerHeight}]}>

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
              maxLength={3}
              
              
            />

            <View style={styles.dropdownContainer}>
              <DropDown
                label={"Categoria"}
                theme={MD3LightTheme}
                mode={"outlined"}
                visible={showCategory}
                showDropDown={() => setShowCategory(true)}
                onDismiss={() => setShowCategory(false)}
                value={categoryId}
                setValue={(value) => { setCategoryId(value); setCategory(Categories.find(x => x.Id == Number.parseInt(value))!) }}
                list={Categories.map(x => ({ label: x.Title, value: x.Id.toString() }))}
                activeColor={Colors.app.tintGreen}
                dropDownItemStyle={{backgroundColor:Colors.app.white}}
                dropDownItemSelectedStyle={{backgroundColor:Colors.app.secondaryTint}}
              />
            </View>

            <InputOutline
              ref={txtPriceRef}
              style={styles.input}
              activeColor={Colors.app.tint}
              placeholder="Preço"
              onChangeText={onPriceChange}
              keyboardType="decimal-pad"
              maxLength={9}
            />

            <InputOutline
              ref={txtDescriptionRef}
              style={[styles.input, {height:100}]}
              activeColor={Colors.app.tint}
              placeholder="Descrição"
              onChangeText={onDescriptionChange}
              numberOfLines={5}
              textAlignVertical={"top"}
              
              
              multiline={true}
              maxLength={255}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    
  },

  imgContainer: {
    width: "100%",
    height: 200,
    maxHeight:"40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    display: "flex",
    marginHorizontal: 20,
    marginBottom: 8,
    justifyContent: "center",
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
    marginTop:"auto",

    width: "100%",
    paddingVertical: 10,
  },

  button: {
    width: "45%",
    height: 50,
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
