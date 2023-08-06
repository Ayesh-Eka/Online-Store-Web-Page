import { writable } from 'svelte/store';

export function createSearchStore(initialValue) {
  const { subscribe, set } = writable(initialValue);

  return {
    subscribe,
    setSearch: (value) => set(value),
  };
}