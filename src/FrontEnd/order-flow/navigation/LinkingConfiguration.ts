/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Tables: {
            screens: {
              TablesScreen: 'Tables',
            },
          },
          Products: {
            screens: {
              ProductsScreen: 'Products',
            },
          },
        },
      },
      EditProduct: 'EditProduct',
      Modal: 'modal',
      EditTableScreen: 'EditTableScreen',
      NotFound: '*',
    },
  },
};

export default linking;
