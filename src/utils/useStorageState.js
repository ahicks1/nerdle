import { useState } from 'react';

/**
 * An extention of useState that writes the value to localStorage
 * This persists state between page refreshes
 * @param {string} storageKey 
 * @param {any} defaultValue 
 * @returns 
 */
function useStorageState(storageKey, defaultValue) {
  const [state, setState] = useState(() => {
    const existingState = window.localStorage.getItem(storageKey);
    // Catch parsing exceptions and return the default if needed
    try {
      return existingState?JSON.parse(existingState):defaultValue;
    } catch (e) {
      return defaultValue;
    }
  })

  const setValue = value => {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    setState(value);
  }

  // We don't set state here for now, but it might make sense to change that
  const resetValue = () => {
    window.localStorage.removeItem(storageKey)
  }

  return [state, setValue, resetValue];
}
export default useStorageState;