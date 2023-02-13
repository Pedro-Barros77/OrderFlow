import { StyleSheet, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function TablesScreen({ navigation }: RootTabScreenProps<'Tables'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
