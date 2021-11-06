import { FilledGameDay, Game, GameDay, GamePlan, Games, PointBuckets, PointedGame, RatedGame, RatedGames } from "../types/gameTypes";
import { map, random, size, sortBy, tail, take, takeRight } from "lodash";
import { updateInArrayAtIndex } from "./generalUtils";

const generateBonus = (): number => 1 + random(0.0, 1.01);

const rateGame = (game: Game, alcBonus: number, endBonus: number, dexBonus: number): RatedGame => ({
  ...game,
  rating: game.alcFactor * alcBonus + game.dexFactor * dexBonus + game.endFactor * endBonus,
})

export const pointGames = (sortedRatedGames: RatedGames, sortedBuckets: PointBuckets): Array<PointedGame> => {
  const pointBucket = sortedBuckets[0];

  if(size(sortedRatedGames) > pointBucket.amountOfAllowedGames){
    const takenGames = take(sortedRatedGames, pointBucket.amountOfAllowedGames)
    const gamesLeft = takeRight(sortedRatedGames, size(sortedRatedGames) - pointBucket.amountOfAllowedGames)
    const pointedGames = map(takenGames, game => ({...game, points: pointBucket.points}))
    
    return [...pointedGames, ...pointGames(gamesLeft, tail(sortedBuckets))]
  }

  const pointedGames = map(sortedRatedGames, game => ({...game, points: pointBucket.points}));
  return [...pointedGames];
}


export const generateInitialGamePlan = (games: Games, buckets: PointBuckets, gameDays: Array<GameDay>): GamePlan => {
  const alcBonus = generateBonus();
  const endBonus = generateBonus();
  const dexBonus = generateBonus();

  const sortedRatedGames: RatedGames = sortBy(map(games, game => rateGame(game, alcBonus, endBonus, dexBonus)), ["rating"]);
  const sortedBuckets: PointBuckets = sortBy(buckets, ["points"])

  const pointedGames: Array<PointedGame> = pointGames(sortedRatedGames, sortedBuckets);

  const filledGameDays: Array<FilledGameDay> = map(gameDays, gameDay => ({...gameDay, games: []}));
  const filledGameDaysWithFilledFirstDay: Array<FilledGameDay> = updateInArrayAtIndex(filledGameDays, 0, {...filledGameDays[0], games: pointedGames})

  return {alcBonus, endBonus, dexBonus, gameDays: filledGameDaysWithFilledFirstDay, teams: []};
}