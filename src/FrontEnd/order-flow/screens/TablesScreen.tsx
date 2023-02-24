import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, RefreshControl, ActivityIndicator, DeviceEventEmitter, } from 'react-native';

import { RootTabScreenProps } from '../types';

import React, { useState } from 'react';
import TableCard from '../components/TableCard';
import { Ionicons } from '@expo/vector-icons';
import { FillOdd } from '../constants/Extensions';
import { GetAllTables } from '../services/Tables.service';
import { Table } from '../models/Table';
import { Colors } from '../constants/Colors';

export default function TablesScreen({ navigation }: RootTabScreenProps<'Tables'>) {
  const [tables, setTables] = useState<Array<Table>>([]);
  const [refreshingTables, setRefreshingTables] = useState(false);

  React.useEffect(() => {
    fetchTables();
    
    DeviceEventEmitter.addListener('updatedTables', (e)=>fetchTables())
  }, [])

  async function fetchTables() {
    return GetAllTables()
      .then(list => {
        setTables(list);
      });
  }

  const onRefreshTables = React.useCallback(() => {
    setRefreshingTables(true);

    fetchTables().finally(() => {
      setRefreshingTables(false);
    });
  }, []);

  const handleTablePress = (table: Table, i: number) => {
    navigation.navigate('EditTableScreen', { tableId: table.id, index:i, productId: 0})
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableList}>
        {tables.length > 0 ?
        <FlatList
          columnWrapperStyle={styles.tableContainer}
          data={FillOdd(tables, 3)}
          keyExtractor={(item: any) => item.id.toString()}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshingTables} onRefresh={onRefreshTables} />
          }
          renderItem={({ item, index }) =>
            <TableCard
              id={index + 1}
              name={item.name}
              total={item.total}
              status={item.status}
              onPress={() => handleTablePress(item, index)}
              hidden={item.id == 0}

            />}
            
        />: <ActivityIndicator size="large" color={Colors.app.tint} />}
      </View>

      
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
  tableList: {
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    justifyContent: 'space-evenly',
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
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImageStyle: {

  },

});
