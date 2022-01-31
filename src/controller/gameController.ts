import { User } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import { omit } from 'lodash';
import { GamePlan } from '../types/gameTypes';

export const saveFinishedGame = (finishedGame: GamePlan, user: User) => {
  const remoteDatabase = getDatabase();
  const validFinishedGame = omit(finishedGame, "id");
  push(ref(remoteDatabase, `${user.uid}/games`), validFinishedGame);
}