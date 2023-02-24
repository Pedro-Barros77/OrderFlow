import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator, Modal, DeviceEventEmitter } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MD3LightTheme } from "react-native-paper";
import { InputOutline } from "react-native-input-outline";
import { Colors, GetCategoryColor } from "../constants/Colors";
import DropDown from "react-native-paper-dropdown";
import { Category } from "../models/Category";
import { CategoryColor, CategoryDisplay, CategoryIcons, IconDisplay } from "../constants/Enums";
import ToggleSwitch from 'toggle-switch-react-native'
import { CategoryIcon } from "../constants/Icons";
import { DeleteProduct, GetProductById, PostProduct, PutProduct } from "../services/Products.service";
import { DeleteCategory, GetAllCategories, GetCategoryById, PostCategory, PutCategory } from "../services/Categories.service";
import { Product } from "../models/Product";
import AppModal from "../components/AppModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function EditCategory({ route, navigation }: any) {

  const [title, setTitle] = useState('');

  const [showColor, setShowColor] = useState(false);
  const [colorTheme, setColorTheme] = useState(CategoryColor.gray);

  const [showIcon, setShowIcon] = useState(false);
  const [icon, setIcon] = useState(CategoryIcons.question);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"info" | "warning" | "error">("info");
  const [modalButtons, setModalButtons] = useState<"ok" | "okcancel" | "yesno" | "close">("ok");
  const [exitOnCloseModal, setExitOnCloseModal] = useState(false);

  const colorsEnumValues = Object.values(CategoryColor);
  const themeColors = colorsEnumValues.slice(0, colorsEnumValues.length/2)
  const themeValues = colorsEnumValues.slice(colorsEnumValues.length/2)

  const colorsMap = themeColors.map(function(item, i) {
    return {label: (CategoryDisplay as any)[item.toString()], value: themeValues[i]};
  });

  const iconsEnumValues = Object.values(CategoryIcons);
  const icons = iconsEnumValues.slice(0, iconsEnumValues.length/2)
  const iconsValues = iconsEnumValues.slice(iconsEnumValues.length/2)

  const iconsMap = icons.map(function(item, i) {
    return {label: (IconDisplay as any)[item.toString()], value: iconsValues[i]};
  });


  const { categoryId } = route.params ?? {};

  function getCategory(id: number) {
    GetCategoryById(id)
      .then(category => {
        if (category != null) {
          setTitle(category.title);
          setColorTheme(category.colorTheme);
          setIcon(category.categoryIcon);
        }
        else {
          setModalType("error");
          setModalButtons("close");
          setModalTitle("Categoria não encontrado");
          setModalMessage("A categoria que você está tentando editar não foi encontrado na base de dados...");
          setShowModal(true);
          setExitOnCloseModal(true);
        }
      }).catch(err => {
        setExitOnCloseModal(true);
        modalError();
      });
  }



  useEffect(() => {
    if (categoryId && categoryId > 0) {
      navigation.setOptions({
        title: "Editar Categoria",
      });
      getCategory(categoryId);
    }
  }, [])

  function ClearForms() {
    setTitle("");
    setColorTheme(1);
    setIcon(1);
  }


  function onTitleChange(value: string) {
    setTitle(value);
  }
  function onSelectColor(value: number) {
    setColorTheme(value)
  }
  function onSelectIcon(value: number) {
    setIcon(value)
  }

  function onGoBack(updatedCategories: boolean = true) {
    if (updatedCategories)
      DeviceEventEmitter.emit('updateCategories', {});
    ClearForms();
    navigation.goBack();
  }

  function modalError() {
    setModalType("error");
    setModalButtons("close");
    setModalTitle("Ops!...");
    setModalMessage("Ocorreu um erro inesperado :(");
    setShowModal(true);
  }

  function onDelete() {
    setModalType("warning");
    setModalButtons("yesno");
    setModalTitle("Atenção!");
    setModalMessage(`Tem certeza que deseja excluir a categoria "${title}"?`);
    setShowModal(true);
    setExitOnCloseModal(false);
  }

  function onConfirmDelete() {
    DeleteCategory(categoryId)
      .then(res => {
        if (res.success) {
          setModalType("info");
          setModalButtons("ok");
          setModalTitle("Sucesso!");
          setModalMessage("Categoria excluída com Sucesso!");
          setShowModal(true);
          setExitOnCloseModal(true);
        }
        else {
          setExitOnCloseModal(false);
          modalError();
        }
      })
      .catch(err => {
        setExitOnCloseModal(false);
        modalError();
      });
  }

  function onSave() {
    const category = new Category(0, title, colorTheme, icon);

    if (categoryId <= 0 || categoryId == undefined) {
      PostCategory(category)
        .then(res => {
          if (res.success) {
            setModalType("info");
            setModalButtons("ok");
            setModalTitle("Sucesso!");
            setModalMessage("Categoria cadastrada com Sucesso!");
            setShowModal(true);
            ClearForms();
            setExitOnCloseModal(true);
          }
          else {
            setExitOnCloseModal(false);
            modalError();
          }
        })
        .catch(err => {
          setExitOnCloseModal(false);
          modalError();
        });
    }
    else {
      category.id = categoryId;
      PutCategory(category, categoryId)
        .then(res => {
          if (res.success) {
            setModalType("info");
            setModalButtons("ok");
            setModalTitle("Sucesso!");
            setModalMessage("Categoria atualizada com Sucesso!");
            setShowModal(true);
            setExitOnCloseModal(true);
          }
          else {
            setExitOnCloseModal(false);
            modalError();
          }
        })
        .catch(err => {
          setExitOnCloseModal(false);
          modalError();
        });
    }
  }

  return (
    <SafeAreaView>

      <AppModal onClose={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} visible={showModal} title={modalTitle} message={modalMessage} buttons={modalButtons} modalType={modalType} onYes={() => { onConfirmDelete(); if (exitOnCloseModal) onGoBack() }} onNo={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} />


      <ScrollView>

        <View style={styles.container}>

          <View style={styles.formContainer}>

            <View style={[styles.imgContainer, { backgroundColor: GetCategoryColor(colorTheme) }]}>
              <CategoryIcon catIcon={icon} size={90} color={GetCategoryColor(colorTheme, true)}></CategoryIcon>
            </View>

            <InputOutline
              style={styles.input}
              activeColor={Colors.app.tint}
              placeholder="Titulo"
              onChangeText={onTitleChange}
              value={title}
              maxLength={50}
            />

            <View style={styles.dropdownContainer}>
              <DropDown
                label={"Cor"}
                theme={MD3LightTheme}
                mode={"outlined"}
                visible={showColor}
                showDropDown={() => setShowColor(true)}
                onDismiss={() => setShowColor(false)}
                value={colorTheme}
                setValue={onSelectColor}
                list={colorsMap}
                activeColor={Colors.app.tintGreen}
                dropDownStyle={styles.dropDownBox}
                dropDownItemStyle={{ backgroundColor: Colors.app.white }}
                dropDownItemSelectedStyle={{ backgroundColor: Colors.app.secondaryTint }}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <DropDown
                label={"Icone"}
                theme={MD3LightTheme}
                mode={"outlined"}
                visible={showIcon}
                showDropDown={() => setShowIcon(true)}
                onDismiss={() => setShowIcon(false)}
                value={icon}
                setValue={onSelectIcon}
                list={iconsMap}
                activeColor={Colors.app.tintGreen}
                dropDownStyle={styles.dropDownBox}
                dropDownItemStyle={{ backgroundColor: Colors.app.white }}
                dropDownItemSelectedStyle={{ backgroundColor: Colors.app.secondaryTint }}
              />
            </View>

            {categoryId > 0 ?
              <TouchableOpacity style={styles.btnDelete} activeOpacity={0.7} onPress={onDelete}>
                <Text style={styles.labelDelete}>Excluir Categoria</Text>
                <MaterialCommunityIcons style={styles.iconDelete} name="trash-can-outline" size={24} color={Colors.app.white} />
              </TouchableOpacity>
              : null}

          </View>

          <View style={styles.buttonsContainer}>

            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.redCancel }]} onPress={() => onGoBack(false)} activeOpacity={.7}>
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
    maxHeight: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  formContainer: {
    display: "flex",
    justifyContent: "flex-end",
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

  dropDownBox: {
    transform: [{ translateY: -50 }]
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
    marginTop: "auto",

    width: "100%",
    paddingVertical: 10,
  },

  btnDelete: {
    width: "38%",
    height: 35,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginRight: 20,
    backgroundColor: Colors.app.redCancel,
    alignSelf: "flex-end",
  },

  labelDelete: {
    color: Colors.app.white,
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },

  iconDelete: {
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