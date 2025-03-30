import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock dependencies before importing them
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock react-native Platform
type PlatformOSType = 'web' | 'ios' | 'android' | 'windows' | 'macos';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'web' as PlatformOSType, // default to web, we'll change this in tests
  },
}));

// Import after mocks
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StorageKey } from '../services/storageClient';
import { secureStorageClient } from './asyncStorageImplementation';

const testKey: StorageKey = 'session';
const testValue = 'test-value';
let originalPlatform: PlatformOSType;

describe('secureStorageClient web', () => {
  // Use a valid storage key from our type-safe implementation

  const mockLocalStorage: Storage = {
    store: {} as Record<string, string>,
    getItem: jest.fn((key: string) => mockLocalStorage.store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      mockLocalStorage.store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete mockLocalStorage.store[key];
    }),
    clear: jest.fn(() => {
      mockLocalStorage.store = {};
    }),
    key: jest.fn((index: number) => Object.keys(mockLocalStorage.store)[index] || null),
    get length() {
      return Object.keys(this.store).length;
    },
  };

  global.localStorage = mockLocalStorage;

  beforeEach(() => {
    // Reset all mocks but keep localStorage mock
    jest.clearAllMocks();

    // Clear localStorage mock state
    mockLocalStorage.clear();
    mockLocalStorage.store = {};

    // Store original platform
    originalPlatform = Platform.OS;

    // Mock console methods to avoid noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore platform and console
    Platform.OS = originalPlatform;
    jest.restoreAllMocks();
  });

  describe('Web Platform', () => {
    beforeEach(() => {
      Platform.OS = 'web' as PlatformOSType;
    });

    describe('getItem', () => {
      it('should get item from localStorage', async () => {
        localStorage.setItem(testKey, testValue);
        const result = await secureStorageClient.getItem(testKey);
        expect(result).toBe(testValue);
        expect(SecureStore.getItemAsync).not.toHaveBeenCalled();
      });

      it('should return null when item does not exist', async () => {
        const result = await secureStorageClient.getItem(testKey);
        expect(result).toBeNull();
      });

      it('should throw error when localStorage throws', async () => {
        const error = new Error('Storage error');
        jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
          throw error;
        });
        await expect(secureStorageClient.getItem(testKey)).rejects.toThrow(error);
      });
    });

    describe('setItem', () => {
      it('should set item in localStorage', async () => {
        await secureStorageClient.setItem(testKey, testValue);
        expect(mockLocalStorage.store[testKey]).toBe(testValue);
        expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
      });

      it('should throw error when localStorage throws', async () => {
        const error = new Error('Storage error');
        jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
          throw error;
        });
        await expect(secureStorageClient.setItem(testKey, testValue)).rejects.toThrow(error);
      });
    });

    describe('removeItem', () => {
      it('should remove item from localStorage', async () => {
        mockLocalStorage.store[testKey] = testValue;
        await secureStorageClient.removeItem(testKey);
        expect(mockLocalStorage.store[testKey]).toBeUndefined();
        expect(SecureStore.deleteItemAsync).not.toHaveBeenCalled();
      });

      it('should throw error when localStorage throws', async () => {
        const error = new Error('Storage error');
        jest.spyOn(localStorage, 'removeItem').mockImplementation(() => {
          throw error;
        });
        await expect(secureStorageClient.removeItem(testKey)).rejects.toThrow(error);
      });
    });

    describe('clear', () => {
      it('should clear localStorage', async () => {
        mockLocalStorage.store[testKey] = testValue;
        await secureStorageClient.clear();
        expect(Object.keys(mockLocalStorage.store).length).toBe(0);
      });

      it('should throw error when localStorage throws', async () => {
        const error = new Error('Storage error');
        jest.spyOn(localStorage, 'clear').mockImplementation(() => {
          throw error;
        });
        await expect(secureStorageClient.clear()).rejects.toThrow(error);
      });
    });
  });
});

describe('secureStorageClient native', () => {
  beforeEach(() => {
    // Reset all mocks but keep localStorage mock
    jest.clearAllMocks();

    // Store original platform
    originalPlatform = Platform.OS;

    // Mock console methods to avoid noise
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore platform and console
    Platform.OS = originalPlatform;
    jest.restoreAllMocks();
  });
  describe('Native Platform', () => {
    beforeEach(() => {
      Platform.OS = 'ios' as PlatformOSType;
      // Reset SecureStore mocks for each test
      jest.mocked(SecureStore.getItemAsync).mockReset();
      jest.mocked(SecureStore.setItemAsync).mockReset();
      jest.mocked(SecureStore.deleteItemAsync).mockReset();
    });

    describe('getItem', () => {
      it('should get item using SecureStore', async () => {
        const mockGetItem = jest.mocked(SecureStore.getItemAsync);
        mockGetItem.mockResolvedValueOnce(testValue);

        const result = await secureStorageClient.getItem(testKey);

        expect(result).toBe(testValue);
        expect(mockGetItem).toHaveBeenCalledWith(testKey);
        expect(mockGetItem).toHaveBeenCalledTimes(1);
      });

      it('should return null when item does not exist', async () => {
        const mockGetItem = jest.mocked(SecureStore.getItemAsync);
        mockGetItem.mockResolvedValueOnce(null);

        const result = await secureStorageClient.getItem(testKey);

        expect(result).toBeNull();
        expect(mockGetItem).toHaveBeenCalledWith(testKey);
        expect(mockGetItem).toHaveBeenCalledTimes(1);
      });

      it('should throw error when SecureStore throws', async () => {
        const mockGetItem = jest.mocked(SecureStore.getItemAsync);
        mockGetItem.mockRejectedValueOnce(new Error('SecureStore error'));

        await expect(secureStorageClient.getItem(testKey)).rejects.toThrow('SecureStore error');
        expect(mockGetItem).toHaveBeenCalledWith(testKey);
        expect(mockGetItem).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
          'Error reading from storage:',
          expect.any(Error)
        );
      });
    });

    describe('setItem', () => {
      it('should set item using SecureStore', async () => {
        const mockSetItem = jest.mocked(SecureStore.setItemAsync);
        mockSetItem.mockResolvedValueOnce(undefined);

        await secureStorageClient.setItem(testKey, testValue);

        expect(mockSetItem).toHaveBeenCalledWith(testKey, testValue);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
      });

      it('should throw error when SecureStore throws', async () => {
        const mockSetItem = jest.mocked(SecureStore.setItemAsync);
        mockSetItem.mockRejectedValueOnce(new Error('SecureStore error'));

        await expect(secureStorageClient.setItem(testKey, testValue)).rejects.toThrow(
          'SecureStore error'
        );
        expect(mockSetItem).toHaveBeenCalledWith(testKey, testValue);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Error writing to storage:', expect.any(Error));
      });
    });

    describe('removeItem', () => {
      it('should remove item using SecureStore', async () => {
        const mockDeleteItem = jest.mocked(SecureStore.deleteItemAsync);
        mockDeleteItem.mockResolvedValueOnce(undefined);

        await secureStorageClient.removeItem(testKey);

        expect(mockDeleteItem).toHaveBeenCalledWith(testKey);
        expect(mockDeleteItem).toHaveBeenCalledTimes(1);
      });

      it('should throw error when SecureStore throws', async () => {
        const mockDeleteItem = jest.mocked(SecureStore.deleteItemAsync);
        mockDeleteItem.mockRejectedValueOnce(new Error('SecureStore error'));

        await expect(secureStorageClient.removeItem(testKey)).rejects.toThrow('SecureStore error');
        expect(mockDeleteItem).toHaveBeenCalledWith(testKey);
        expect(mockDeleteItem).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
          'Error removing from storage:',
          expect.any(Error)
        );
      });
    });

    describe('clear', () => {
      it('should log warning for unsupported clear operation', async () => {
        const warnSpy = jest.spyOn(console, 'warn');
        warnSpy.mockImplementationOnce(() => {});

        await secureStorageClient.clear();

        expect(warnSpy).toHaveBeenCalledWith('Clear operation not supported in SecureStore');
        expect(warnSpy).toHaveBeenCalledTimes(1);
      });

      it('should throw error when clearing fails', async () => {
        const warnSpy = jest.spyOn(console, 'warn');
        warnSpy.mockImplementationOnce(() => {
          throw new Error('Clear error');
        });

        await expect(secureStorageClient.clear()).rejects.toThrow('Clear error');
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('Error clearing storage:', expect.any(Error));
      });
    });
  });
});
