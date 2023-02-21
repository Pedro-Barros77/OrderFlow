import React, { createRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, DeviceEventEmitter, UIManager, findNodeHandle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppModal from '../components/AppModal';
import { InputOutline } from 'react-native-input-outline';
import { Colors } from '../constants/Colors';

import { DeleteTable, GetTableById, PostTable, PutTable } from '../services/Tables.service';
import { Table } from '../models/Table';
import { PadNumber } from '../constants/Extensions';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function EditTableScreen({ navigation, route }: any) {
  const { tableId, index } = route.params;
  const [name, setName] = useState('');
  const [table, setTable] = useState<Table | null>(null);
  const [ctxMenuVisible, setCtxMenuVisible] = useState(false);
  const isEdit = tableId && tableId > 0

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"info" | "warning" | "error">("info");
  const [modalButtons, setModalButtons] = useState<"ok" | "okcancel" | "yesno" | "close">("ok");
  const [exitOnCloseModal, setExitOnCloseModal] = useState(false);


  React.useEffect(() => {
    if (isEdit) {

      fetchTable();
    }


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
            <View style={{width: 7}} ></View>
            <Text>Excluir</Text>
          </MenuItem>
          <MenuItem onPress={() => ClearForms()}>
            <MaterialCommunityIcons name="broom" size={18} color={Colors.app.tintGreen} />
            <View style={{width: 7}}></View>
            <Text>Limpar Itens</Text>
          </MenuItem>
        </Menu>
      </View>
    );
  }

  async function fetchTable() {
    return GetTableById(tableId)
      .then(response => {
        setTable(response);
        setName(response!.name)
        console.log(response)
      });
  }

  function onNameChange(name: string) {
    setName(name)
  }

  function onCloseOrder() {

  }

  function onSave() {
    const _table = new Table(0, name, 0, []);

    if (!isEdit) {
      PostTable(_table)
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
      _table.id = tableId;
      PutTable(_table, tableId)
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
    console.log("Excluindo!!!!!!!")
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


      <ScrollView>

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
      </ScrollView>
    </SafeAreaView>
  );
};

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
