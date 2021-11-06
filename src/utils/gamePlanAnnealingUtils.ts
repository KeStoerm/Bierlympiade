import { compact, map, random, reduce, size, sum, sumBy, without } from "lodash";
import { FilledGameDay, GameDay, GamePlan, Games, PointBuckets } from "../types/gameTypes";
import { generateInitialGamePlan } from "./gamePlanGenerationUtils";
import { removeElementFromArrayAtIndex, switchElementsBetweenArrays, updateInArrayAtIndex } from "./generalUtils";
// @ts-ignore
import simulatedAnnealing from 'simulated-annealing';

interface Tooling {
  toolingCondition: (firstGameDay: FilledGameDay, secondGameDay: FilledGameDay) => boolean,
  toolingFunction: (firstRandomDayIndex: number, secondRandomDayIndex: number, firstRandomGameIndex: number,
    secondRandomGameIndex: number, gameDays: Array<FilledGameDay>) => Array<FilledGameDay>
}

const toolingSwitchElements = (firstRandomDayIndex: number, secondRandomDayIndex: number, firstRandomGameIndex: number,
  secondRandomGameIndex: number, gameDays: Array<FilledGameDay>): Array<FilledGameDay> => {
    const firstRandomDay = gameDays[firstRandomDayIndex];
    const secondRandomDay = gameDays[secondRandomDayIndex];

    const {array1: firstDaySwitchedGames, array2: secondDaySwitchedGames} = switchElementsBetweenArrays(firstRandomDay.games, firstRandomGameIndex, secondRandomDay.games, secondRandomGameIndex);

    const gamePlanWithFirstUpdatedGamePlan = updateInArrayAtIndex(gameDays, firstRandomDayIndex, {...firstRandomDay, games: firstDaySwitchedGames});
    const gamePlanWithSecondUpdatedGamePlan = updateInArrayAtIndex(gamePlanWithFirstUpdatedGamePlan, secondRandomDayIndex, {...secondRandomDay, games: secondDaySwitchedGames});

    return gamePlanWithSecondUpdatedGamePlan;
}

const areBothDaysFilledWithGames = (firstGameDay: FilledGameDay, secondGameDay: FilledGameDay): boolean => size(firstGameDay.games) > 0 && size(secondGameDay.games) > 0;

const toolingMoveElement = (firstRandomDayIndex: number, secondRandomDayIndex: number, firstRandomGameIndex: number,
  secondRandomGameIndex: number, gameDays: Array<FilledGameDay>): Array<FilledGameDay> => {
    const firstRandomDay = gameDays[firstRandomDayIndex];
    const secondRandomDay = gameDays[secondRandomDayIndex];

    const gameToMove = {...firstRandomDay.games[firstRandomGameIndex]};
    const firstDayGamesWithRemovedElement = removeElementFromArrayAtIndex(firstRandomDay.games, firstRandomGameIndex);
    const secondDayGamesWithAddedElement = [...secondRandomDay.games, gameToMove];

    const gamePlanWithFirstUpdatedGamePlan = updateInArrayAtIndex(gameDays, firstRandomDayIndex, {...firstRandomDay, games: firstDayGamesWithRemovedElement});
    const gamePlanWithSecondUpdatedGamePlan = updateInArrayAtIndex(gamePlanWithFirstUpdatedGamePlan, secondRandomDayIndex, {...secondRandomDay, games: secondDayGamesWithAddedElement});

    return gamePlanWithSecondUpdatedGamePlan;
}

const IsFirstDayFilledWithGames = (firstGameDay: FilledGameDay, secondGameDay: FilledGameDay): boolean => size(firstGameDay.games) > 0;

const toolings: Array<Tooling> = [
  {
    toolingCondition: areBothDaysFilledWithGames,
    toolingFunction: toolingSwitchElements,
  },
  {
    toolingCondition: IsFirstDayFilledWithGames,
    toolingFunction: toolingMoveElement,
  },
];


export const determineNewState = (gameDays: Array<FilledGameDay>): Array<FilledGameDay> => {
  const firstRandomDayIndex = random(0, size(gameDays) - 1, false);
  
  const remainingIndexes = without(Array.from(Array(size(gameDays)).keys()), firstRandomDayIndex);
  const secondRandomDayIndex = remainingIndexes[random(0, size(remainingIndexes) - 1, false)];
  
  const firstRandomDay = gameDays[firstRandomDayIndex];
  const secondRandomDay = gameDays[secondRandomDayIndex];
  
  const firstRandomGameIndex = random(0, size(firstRandomDay.games) - 1, false);
  const secondRandomGameIndex = random(0, size(secondRandomDay.games) - 1, false);
  
  const possibleToolings = compact(map(toolings, tooling => tooling.toolingCondition(firstRandomDay, secondRandomDay) ? tooling.toolingFunction : null));

  if(size(possibleToolings) > 0) {
    console.log("use tooling")
    const randomTooling = possibleToolings[random(0, size(possibleToolings) - 1, false)];

    return randomTooling(firstRandomDayIndex, secondRandomDayIndex, firstRandomGameIndex, secondRandomGameIndex, gameDays);
  }

  console.log("do nothing")
  return gameDays;
}

export const determineSeperationScore = (gameDays: Array<FilledGameDay>): number => {
  const maxGameTime = reduce(gameDays, (before, current) => before + current.hoursToBePlayed, 0);
  const totalGameScore = reduce(gameDays, (before, current) => before + sumBy(current.games, "points"), 0);

  return sum(map(gameDays, gameDay => {
    const optiomalPointShare = (gameDay.hoursToBePlayed / maxGameTime) * totalGameScore;
    const currentPointShare = sumBy(gameDay.games, "points");

    return Math.abs(optiomalPointShare - currentPointShare);
  }));
}

export const determineCurrentScore = (gameDays: Array<FilledGameDay>): number => {
  return determineSeperationScore(gameDays);
}

export const determineTemperature = (temp: number): number => {
  return temp * 0.95;
}

export const annealGamePlan = (games: Games, pointBuckets: PointBuckets, gameDays: Array<GameDay>): GamePlan => {
  const initialGamePlan = generateInitialGamePlan(games, pointBuckets, gameDays)

  console.log("current score");
  console.log(initialGamePlan)
  console.log(determineCurrentScore(initialGamePlan.gameDays));

  const annealedGameDays = simulatedAnnealing({
    initialState: initialGamePlan.gameDays,
    tempMax: 15,
    tempMin: 0.001,
    newState: determineNewState,
    getTemp: determineTemperature,
    getEnergy: determineCurrentScore,
  });

  console.log("new score");
  console.log(annealedGameDays);
  console.log(reduce(annealedGameDays[0].games, (prev, curr) => prev + curr.points, 0));
  console.log(reduce(annealedGameDays[1].games, (prev, curr) => prev + curr.points, 0));
  console.log(reduce(annealedGameDays[2].games, (prev, curr) => prev + curr.points, 0));
  console.log(determineCurrentScore(annealedGameDays));

  return {
    ...initialGamePlan,
    gameDays: annealedGameDays,
  }
}