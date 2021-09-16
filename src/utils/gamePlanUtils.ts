import { find, findIndex, take, takeRight } from 'lodash';
import { FilledGameDay, GamePlan, PointedGame } from '../types/gameTypes';

export const findCurrentGameDayIndex = (gamePlan: GamePlan): number =>
  findIndex(gamePlan?.gameDays, (gameDay) => !!find(gameDay.games, game => !game.winnerTeam))

export const findCurrentGameIndexInGameDay = (gamePlan: GamePlan, gameDayIndex: number): number =>
  findIndex(gamePlan.gameDays[gameDayIndex].games, game => !game.winnerTeam)

export const findCurrentGameDay = (gamePlan: GamePlan): FilledGameDay => gamePlan.gameDays[findCurrentGameDayIndex(gamePlan)];

export const findCurrentGame = (gamePlan: GamePlan): PointedGame => {
  const gameDayIndex = findCurrentGameDayIndex(gamePlan);

  return gamePlan.gameDays[gameDayIndex].games[findCurrentGameIndexInGameDay(gamePlan, gameDayIndex)];
}

export const updateInArrayAtIndex = <T>(array: Array<T>, index: number, element: T): Array<T> =>
  [...take(array, index), element, ...takeRight(array, array.length - index - 1)];