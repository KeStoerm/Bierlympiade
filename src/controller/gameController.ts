import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from "firebase/database";
import { omit } from 'lodash';
import { GamePlan } from '../types/gameTypes';

const firebaseConfig = {
  databaseURL: "https://bierlympiade-70679-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const remoteDatabase = getDatabase(app)

export const saveFinishedGame = (finishedGame: GamePlan) => {
  const validFinishedGame = omit(finishedGame, "id")  
  console.log(validFinishedGame);
  push(ref(remoteDatabase, "games"), validFinishedGame);
}