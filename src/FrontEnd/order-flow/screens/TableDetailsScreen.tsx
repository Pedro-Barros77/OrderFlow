import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Table from '../components/Table';


export default function TableDetailsScreen ({ navigation, route }:any) {
  const { tableid, tabletotal, tablestatus } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Mesa {tableid}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>Total consumido até agora:</Text>
        <Text style={styles.detailText}>{tabletotal}</Text>
        <Text style={styles.detailText}>Status da mesa:</Text>
        <Text style={[styles.detailText, { color: tablestatus ? 'red' : 'green' }]}>
          {tablestatus ? 'Ocupada' : 'Livre'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  details: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    fontSize: 18,
    marginVertical: 8,
  },
});

