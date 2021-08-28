import { GamePlan } from "../types/gameTypes";
import { createDB, stores } from "./database";

export const saveGamePlan = async (gamePlan: GamePlan) => {
  const db = await createDB();
  return db.put(stores.gamePlans, gamePlan)
}

export const getGamePlanById = async (id: string) => {
  const db = await createDB();
  return db.get(stores.gamePlans, Number.parseInt(id));
}