import { zipWith } from 'lodash';
import { GamePlan } from "../types/gameTypes";
import { createDB, stores } from "./database";

export const saveGamePlan = async (gamePlan: GamePlan) => {
  const db = await createDB();
  return db.put(stores.gamePlans, gamePlan);
}

export const getGamePlanById = async (id: string) => {
  const db = await createDB();
  return db.get(stores.gamePlans, Number.parseInt(id));
}

export const updateGamePlanById = async (gamePlan: GamePlan, id: string) => {
  const db = await createDB();
  return db.put(stores.gamePlans, gamePlan, Number.parseInt(id));
}

export const getAllGamePlans = async () => {
  const db = await createDB();
  const keys = await db.getAllKeys(stores.gamePlans);
  const values: GamePlan[] = await db.getAll(stores.gamePlans)
  return zipWith(keys, values, (key, val) => ({...val, id: key}));
}
