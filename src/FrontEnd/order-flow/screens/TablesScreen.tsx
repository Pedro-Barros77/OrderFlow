import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';

import { RootTabScreenProps } from '../types';

import { useState } from 'react';
import Table from '../components/Table';
import TableDetailsScreen from './TableDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

export default function TablesScreen({ navigation }: RootTabScreenProps<'Tables'>) {
  const INITIAL_TABLES = [
    { id: 1, total: 0, status: 'available' },
    { id: 2, total: 20, status: 'available' },
    { id: 3, total: 35, status: 'occupied' },
  ];

  const [tables, setTables] = useState(INITIAL_TABLES);
  

  const AddTable = () => {
    const id = tables.length + 1;
    const table = { id, total: 0, status: 'ocuppied' };
    setTables([...tables, table]);
  };

  const handleTablePress = (table: { id: any; total: any; status: any; }) => {
    navigation.navigate('TableDetailsScreen', {tableid: table.id, tabletotal: table.total, tablestatus: table.status})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mesas</Text>

      <View style={styles.tableList}>
        <FlatList data={tables} keyExtractor={(item: any) => item.id.toString()} numColumns={2} renderItem={({ item }) =>
          <Table id={item.id} total={item.total} status={item.status} onPress={() => handleTablePress(item)} />}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={AddTable}>
        <Text style={styles.addButtonText}>+</Text>
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
    backgroundColor: '#2196F3',
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
  },
  deleteModeButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  deleteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  deleteButton: {
    borderRadius: 25,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});