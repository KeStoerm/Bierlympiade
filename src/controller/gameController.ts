import { getDatabase, push, ref } from "firebase/database";
import { omit } from 'lodash';
import { GamePlan } from '../types/gameTypes';

export const saveFinishedGame = (finishedGame: GamePlan) => {
  const remoteDatabase = getDatabase();
  const validFinishedGame = omit(finishedGame, "id")  
  console.log(validFinishedGame);
  push(ref(remoteDatabase, "games"), validFinishedGame);
}