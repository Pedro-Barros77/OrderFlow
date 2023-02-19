import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, Modal } from 'react-native';

import { RootTabScreenProps } from '../types';

import { useState } from 'react';
import Table from '../components/Table';
import { Ionicons } from '@expo/vector-icons';

export default function TablesScreen({ navigation }: RootTabScreenProps<'Tables'>) {
  const INITIAL_TABLES = [
    { id: 1, total: 0, status: 'available' },
    { id: 2, total: 20, status: 'available' },
    { id: 3, total: 35, status: 'occupied' },
  ];

  const [tables, setTables] = useState(INITIAL_TABLES);

  const handleRemoveTable = (table: { id: any; total: any; status: any; }) => {
    const newList = tables.filter((item) => item.id !== table.id);
    setTables(newList);
  };


  const AddTable = () => {
    const id = tables.length + 1;
    const table = { id, total: 0, status: 'ocuppied' };
    setTables([...tables, table]);
  };

  const handleTablePress = (table: { id: any; total: any; status: any; }) => {
    navigation.navigate('TableDetailsScreen', { tableid: table.id, tabletotal: table.total, tablestatus: table.status})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mesas</Text>

      <View style={styles.tableList}>
        <FlatList data={tables} keyExtractor={(item: any) => item.id.toString()} numColumns={2} renderItem={({ item }) =>
          <Table id={item.id} total={item.total} status={item.status} onPress={() => handleTablePress(item)} onLongPress={() => handleRemoveTable(item)} />}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={AddTable}>
        <Ionicons name="ios-add-circle-outline" size={48} color="#000" />
      </TouchableOpacity>
    </View >


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  addButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
    lineHeight: 24,
  },
  tableList: {
    flex: 1,
    padding: 10,
  }, modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 24,
    lineHeight: 24,

  },
});
