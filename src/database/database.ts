import { openDB } from 'idb';

export const stores = {
  gamePlans: "gamePlans"
}

export const createDB = async () => {
  return openDB('gameDb', 1, {
    upgrade: (db) => {
      db.createObjectStore(stores.gamePlans, { autoIncrement: true });
    }
  });
}