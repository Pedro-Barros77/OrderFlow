import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, DeviceEventEmitter, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppModal from '../components/AppModal';
import { InputOutline } from 'react-native-input-outline';
import { Colors } from '../constants/Colors';

import { DeleteTable, GetTableById, PostTable, PutTable } from '../services/Tables.service';
import { Table } from '../models/Table';
import { Added, FormatCurrency, PadNumber } from '../constants/Extensions';

import { Menu, MenuItem } from 'react-native-material-menu';
import { Item } from '../models/Item';
import { ItemStatus } from '../constants/Enums';
import TableItemCard from '../components/TableItemCard';
import { GetProductById } from '../services/Products.service';
import { Product } from '../models/Product';
import HorizontalDivider from '../components/HorizontalDivider';
import { Category } from '../models/Category';

export default function EditTableScreen({ navigation, route }: any) {
  const { tableId, index, productId } = route.params;
  const [name, setName] = useState('');
  const [total, setTotal] = useState(0);
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

  const p = new Product(1, "", "", new Category(1, "", 1, 1), 0, "", false);
  const t = new Table(1,"", 0, []);

  const items_teste = [
    new Item(1, 1, 2, p, t, 1, 0, 6, ItemStatus.Pendente, false, ""),
    new Item(2, 1, 2, p, t, 4, 5.5, 0, ItemStatus.Preparando, false, ""),
    new Item(3, 1, 2, p, t, 1, 0, 0, ItemStatus.Pronto, false, "Não acompanha talheres"),
    new Item(4, 1, 2, p, t, 1, 0, 0, ItemStatus.Entregue, true, ""),
    // new Item(5, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Entregue, true, ""),
    // new Item(6, 1, 2, undefined, undefined, 1, 0, 0, ItemStatus.Entregue, true, ""),
  ]
  const [items, setItems] = useState(items_teste);


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
    onProductSelected();
  }, [productId])

  React.useEffect(() => {
    if (isEdit) {
      navigation.setOptions({
        title: "Mesa " + PadNumber(index + 1, 2),
        headerRight: headerContextMenu,
      });
    }
  }, [ctxMenuVisible])

  React.useEffect(() => {
    setTotal(getTotal());
  }, [table]);

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
      .then(table => {
        if(table!.items.length > 0)
          setItems(table!.items);
        setTable(table);
        setName(table!.name)
      });
  }

  const onRefreshItems = React.useCallback(() => {
    setRefreshingItems(true);

    fetchTable().finally(() => {
      setRefreshingItems(false);
    });
  }, []);

  function getItem(id: number): Item {
    return items.find(x => x.id == id)!;
  }
  function updateItemStatus(status: ItemStatus, id: number) {
    getItem(id).status = status;
  }
  function updateItemCount(count: number, id: number) {
    getItem(id).count = count;
    setTotal(getTotal());
  }
  function updateItemPaid(paid: boolean, id: number) {
    getItem(id).paid = paid;
    setTotal(getTotal());
  }
  function updateItemDiscount(value: number, id: number) {
    getItem(id).discount = value;
    setTotal(getTotal());
  }
  function updateItemAdditional(value: number, id: number) {
    getItem(id).additional = value;
    setTotal(getTotal());
  }
  function updateItemNote(value: string, id: number) {
    getItem(id).note = value;
  }
  function removeItem(id: number) {
    setItems(items.filter(x => x.id !== id));
    setTotal(getTotal());
  }

  function getTotal(): number {
    return items.map(item => item.paid ? 0 : (item.product!.price * item.count) + item.additional - item.discount)
      .reduce((a, b) => a + b) ?? 0;
  }


  function onNameChange(name: string) {
    setName(name)
  }

  function onAddProduct(){
    navigation.navigate("SelectProduct", {isSelect: true});
  }

  function onProductSelected(){
    if(productId == undefined || productId <= 0) return;

    GetProductById(productId).then(p => {
      setItems(Added(items, new Item(items.length > 0 ? items[items.length -1].id+1 : 1, p!.id, table!.id, p!, table!, 1, 0,0,ItemStatus.Pendente,false,'')));
      console.log("Adicionado com sucesso!");
    });
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
    <SafeAreaView style={[styles.container, { height: "100%" }]}>

      <AppModal onClose={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} visible={showModal} title={modalTitle} message={modalMessage} buttons={modalButtons} modalType={modalType} onYes={() => { onConfirmDelete(); if (exitOnCloseModal) onGoBack() }} onNo={() => { setShowModal(false); if (exitOnCloseModal) onGoBack() }} />

      <InputOutline
        style={styles.input}
        activeColor={Colors.app.tint}
        placeholder="Nome"
        onChangeText={onNameChange}
        value={name}
        maxLength={3}
      />
      <View style={styles.addItemRow}>
        <TouchableOpacity style={styles.addItemButton} onPress={onAddProduct}>
          <Text style={styles.addItemText} >Add Produto</Text>
          <MaterialCommunityIcons name="plus-circle" size={35} color={Colors.app.tintGreen} />
        </TouchableOpacity>
      </View>


      <HorizontalDivider label="Pedidos" />
      {items.length > 0 ?
        <FlatList
          contentContainerStyle={{ justifyContent: "center" }}
          data={items}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={refreshingItems} onRefresh={onRefreshItems} />
          }
          renderItem={({ item }) => {
            return (
              <TableItemCard
                item={item}
                onChangeStatus={updateItemStatus}
                onChangeCount={updateItemCount}
                onChangeDiscount={updateItemDiscount}
                onChangeAdditional={updateItemAdditional}
                onChangeNote={updateItemNote}
                onChangePaid={updateItemPaid}
                onRemove={removeItem}
              />
            );
          }}
          keyExtractor={(item, index) => item?.id?.toString()}
        /> : <ActivityIndicator size="large" color={Colors.app.tint} />}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.app.tintGreen }]} onPress={onSave} activeOpacity={.7}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalText, { color: Colors.app.darkGray, fontWeight: "normal" }]}>Total:</Text>
          <Text style={styles.totalText}>{FormatCurrency(total)}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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

  totalContainer: {
    width: "45%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
  },

  totalText: {
    color: Colors.app.currencyGreen,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },

  addItemText: {
    marginRight: 5,
    fontSize: 15,
    color: Colors.app.tintGreen
  },

  addItemButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight:20,
  },

  addItemRow:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-end",
  },

});
