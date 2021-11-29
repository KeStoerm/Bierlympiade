import { find, findIndex } from 'lodash';
import { FilledGameDay, GamePlan, PointedGame } from '../types/gameTypes';

export const findCurrentGameDayIndex = (gamePlan: GamePlan): number =>
  findIndex(gamePlan?.gameDays, (gameDay) => !!find(gameDay.games, game => !game.winnerTeam))

export const findCurrentGameIndexInGameDay = (gamePlan: GamePlan, gameDayIndex: number): number => {
  return findIndex(gamePlan.gameDays[gameDayIndex].games, game => !game.winnerTeam)
}

export const isGamePlanFinished = (gamePlan: GamePlan) => 
  findCurrentGameDayIndex(gamePlan) === -1

export const findCurrentGameDay = (gamePlan: GamePlan): FilledGameDay => gamePlan.gameDays[findCurrentGameDayIndex(gamePlan)];

export const findCurrentGame = (gamePlan: GamePlan): PointedGame => {
  const gameDayIndex = findCurrentGameDayIndex(gamePlan);
  const currentGameIndex = findCurrentGameIndexInGameDay(gamePlan, gameDayIndex);

  return gamePlan.gameDays[gameDayIndex].games[currentGameIndex];
}
