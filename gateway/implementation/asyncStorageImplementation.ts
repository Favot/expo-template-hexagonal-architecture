import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StorageClient, StorageKey } from '../services/storageClient';

export const secureStorageClient: StorageClient = {
  getItem: async (key: StorageKey) => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error('Error reading from storage:', error);
      throw error;
    }
  },

  setItem: async (key: StorageKey, value: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error('Error writing to storage:', error);
      throw error;
    }
  },

  removeItem: async (key: StorageKey) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  },

  clear: async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.clear();
      } else {
        // SecureStore doesn't have a clear method, so we need to handle this differently
        console.warn('Clear operation not supported in SecureStore');
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
