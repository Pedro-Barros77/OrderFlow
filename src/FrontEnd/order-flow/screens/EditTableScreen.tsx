import React, { createRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, DeviceEventEmitter, UIManager, findNodeHandle, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppModal from '../components/AppModal';
import { InputOutline } from 'react-native-input-outline';
import { Colors } from '../constants/Colors';

import { DeleteTable, GetTableById, PostTable, PutTable } from '../services/Tables.service';
import { Table } from '../models/Table';
import { PadNumber } from '../constants/Extensions';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Item } from '../models/Item';
import { ItemStatus } from '../constants/Enums';
import TableItemCard from '../components/TableItemCard';
import { GetProductById } from '../services/Products.service';
import { Product } from '../models/Product';

export default function EditTableScreen({ navigation, route }: any) {
  const { tableId, index } = route.params;
  const [name, setName] = useState('');
  const [table, setTable] = useState<Table | null>(null);
  const [ctxMenuVisible, setCtxMenuVisible] = useState(false);
  const isEdit = tableId && tableId > 0

  const [refreshingItems, setRefreshingItems] = React.useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"info" | "warning" | "error">("info");
  const [modalButtons, setModalButtons] = useState<"ok" | "okcancel" | "yesno" | "close">("ok");
  const [exitOnCloseModal, setExitOnCloseModal] = useState(false);

  const items = [
    new Item(1, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Pendente, false, ""),
    new Item(2, 1, 2, undefined, undefined, 2, 0, 0, ItemStatus.Preparando, false, ""),
    new Item(3, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Pronto, false, "Não acompanha talheres"),
    new Item(4, 1, 2, undefined, undefined, 3, 0, 0, ItemStatus.Entregue, true, ""),
    new Item(5, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Entregue, true, ""),
    new Item(6, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Entregue, true, ""),
  ]


  React.useEffect(() => {
    //debug
    let product: Product | undefined;
    GetProductById(4).then(p => {
      product = p!;
      
      items.forEach(item => {
        item.product = product;
        item.productId = product!.id;
      });
      if (isEdit) {
        fetchTable();
      }
    })





  }, [])
  React.useEffect(() => {
    if (isEdit) {
      navigation.setOptions({
        title: "Mesa " + PadNumber(index + 1, 2),
        headerRight: headerContextMenu,
      });

    }


  }, [ctxMenuVisible])


  function headerContextMenu() {
    return (
      <View>
        <Menu
          visible={ctxMenuVisible}
          anchor={
            <TouchableOpacity onPress={() => setCtxMenuVisible(true)}>
              <MaterialCommunityIcons name="dots-vertical" size={35} color={Colors.app.tintGreen} />
            </TouchableOpacity>
          }
          onRequestClose={() => setCtxMenuVisible(false)}
        >
          <MenuItem onPress={() => onDelete()} style={{ width: '100%' }}>
            <MaterialCommunityIcons name="delete" size={18} color={Colors.app.redCancel} />
            <View style={{ width: 7 }} ></View>
            <Text>Excluir</Text>
          </MenuItem>
          <MenuItem onPress={() => ClearForms()}>
            <MaterialCommunityIcons name="broom" size={18} color={Colors.app.tintGreen} />
            <View style={{ width: 7 }}></View>
            <Text>Limpar Itens</Text>
          </MenuItem>
        </Menu>
      </View>
    );
  }

  async function fetchTable() {
    return GetTableById(tableId)
      .then(response => {
        response!.items = items;
        setTable(response);
        setName(response!.name)
      });
  }

  const onRefreshItems = React.useCallback(() => {
    setRefreshingItems(true);

    fetchTable().finally(() => {
      setRefreshingItems(false);
    });
  }, []);

  function onNameChange(name: string) {
    setName(name)
  }

  function onCloseOrder() {

  }

  function onSave() {
    table!.name = name;

    if (!isEdit) {
      PostTable(table!)
        .then(res => {
          if (res.success) {
            setModalType("info");
            setModalButtons("ok");
            setModalTitle("Sucesso!");
            setModalMessage("Mesa cadastrada com Sucesso!");
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
      table!.id = tableId;
      PutTable(table!, tableId)
        .then(res => {
          if (res.success) {
            setModalType("info");
            setModalButtons("ok");
            setModalTitle("Sucesso!");
            setModalMessage("Mesa atualizada com Sucesso!");
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

  function onGoBack(updatedTables: boolean = true) {
    if (updatedTables) {

      DeviceEventEmitter.emit('updatedTables', {});
    }
    ClearForms();
    navigation.goBack();
  }

  function ClearForms() {
    setName("");
    setTable(null);
    setCtxMenuVisible(false)
  }

  function onDelete() {
    setModalType("warning");
    setModalButtons("yesno");
    setModalTitle("Atenção!");
    setModalMessage(`Tem certeza que deseja excluir esta mesa?`);
    setShowModal(true);
    setExitOnCloseModal(false);
    setCtxMenuVisible(false)
  }

  function onConfirmDelete() {
    DeleteTable(tableId)
      .then(res => {
        if (res.success) {
          setModalType("info");
          setModalButtons("ok");
          setModalTitle("Sucesso!");
          setModalMessage("Mesa excluída com Sucesso!");
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

  function modalError() {
    setModalType("error");
    setModalButtons("close");
    setModalTitle("Ops!...");
    setModalMessage("Ocorreu um erro inesperado :(");
    setShowModal(true);
  }

  return (
    <SafeAreaView>

      <AppModal onClose={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} visible={showModal} title={modalTitle} message={modalMessage} buttons={modalButtons} modalType={modalType} onYes={() => { onConfirmDelete(); if (exitOnCloseModal) onGoBack() }} onNo={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} />


      <View style={styles.container}>

        <View style={styles.formContainer}>

          <InputOutline
            style={styles.input}
            activeColor={Colors.app.tint}
            placeholder="Nome"
            onChangeText={onNameChange}
            value={name}
            maxLength={3}
          />

        </View>

        <SafeAreaView style={styles.itemsContainer}>
          {items.length > 0 ?
            <FlatList
              contentContainerStyle={{ justifyContent: "center" }}
              data={table?.items}
              numColumns={1}
              refreshControl={
                <RefreshControl refreshing={refreshingItems} onRefresh={onRefreshItems} />
              }
              renderItem={({ item }) => {
                return (
                  <TableItemCard
                    item={item}
                  />
                );
              }}
              keyExtractor={(item, index) => item?.id?.toString()}
            /> : <ActivityIndicator size="large" color={Colors.app.tint} />}
        </SafeAreaView>

        <View style={styles.buttonsContainer}>
          {isEdit ?
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.redCancel }]} onPress={onCloseOrder} activeOpacity={.7}>
              <Text style={styles.buttonText}>Fechar Mesa</Text>
            </TouchableOpacity>
            : null}
          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.tintGreen }]} onPress={onSave} activeOpacity={.7}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",

  },

  formContainer: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems:"center",
  },
  input: {
    display: "flex",
    alignSelf: "center",
    width: "90%",
    height: 50,
    backgroundColor: Colors.app.white,
    marginVertical: 10,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "auto",
    backgroundColor: Colors.app.defaultBackgroundGray,

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


  itemsContainer: {
    // height: "80%",
  },

});
