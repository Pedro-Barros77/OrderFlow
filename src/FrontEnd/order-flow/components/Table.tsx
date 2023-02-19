import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const Table = (props: { id: any, total: number, status: string, onPress: any, onLongPress: any }) => {
  const { id, total, status, onPress, onLongPress } = props;
  const statusColor = status === 'available' ? 'green' : 'red';

  return (
    <View>
      <TouchableOpacity
        style={styles.table}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Image
          source={require('../assets/images/table.png')}
          style={styles.buttonImageStyle}
        />
        <View style={styles.statusStyle}>
        </View>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.total}>Total: R${total.toFixed(2)}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.removeButton} onPress={onLongPress}>
        <Ionicons name="trash" size={24} color="#FFF" />
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
    
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor:"red",
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 50,
    width:25,
    height:25, 
    right:40, 
    bottom:80,
   
  },
  total: {
    marginTop: 10,
    fontSize: 16,
  },
  removeButton: {
    position: 'absolute',
    bottom: 50,
    right: 16,
    backgroundColor: '#F44336',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImageStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'stretch',

  },
  statusStyle:{
    backgroundColor:"red",
    borderRadius: 8, 
    width: 16, 
    height: 16,
    left:50, 
    bottom:80,
  },

});

export default Table;
