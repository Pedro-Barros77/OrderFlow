import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Table = (props: { id: any, total: number, status: string, onPress: any}) => {
  const { id, total, status, onPress} = props;
  const statusColor = status === 'available' ? 'green' : 'red';

  return (
    <View>
      <TouchableOpacity
        style={styles.table}
        onPress={onPress}
      >
        <View style={{ backgroundColor: statusColor, borderRadius: 8, width: 16, height: 16 }} >
        </View>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.total}>Total: R${total.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  table: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  total: {
    marginTop: 10,
    fontSize: 16,
  },

});

export default Table;
