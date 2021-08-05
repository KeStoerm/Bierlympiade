import { FilledPointBucket, Game, GamePlan, Games, PointBuckets, RatedGame, RatedGames } from "../types/gameTypes";
import { map, random, size, sortBy, tail, take, takeRight } from "lodash";

const generateBonus = (): number => 1 + random(0.0, 1.01);

const rateGame = (game: Game, alcBonus: number, endBonus: number, dexBonus: number): RatedGame => ({
  ...game,
  rating: game.alcFactor * alcBonus + game.dexFactor * dexBonus + game.endFactor * endBonus,
})

const fillBuckets = (sortedRatedGames: RatedGames, sortedBuckets: PointBuckets): Array<FilledPointBucket> => {
  const pointBucket = sortedBuckets[0];

  if(size(sortedRatedGames) > pointBucket.amountOfAllowedGames){
    const takenGames = take(sortedRatedGames, pointBucket.amountOfAllowedGames)
    const gamesLeft = takeRight(sortedRatedGames, size(sortedRatedGames) - pointBucket.amountOfAllowedGames)
    
    return [{...pointBucket, games: takenGames}, ...fillBuckets(gamesLeft, tail(sortedBuckets))]
  }

  return [{...pointBucket, games: sortedRatedGames}];
}

export const generateGamePlan = (games: Games, buckets: PointBuckets): GamePlan => {
  const alcBonus = generateBonus();
  const endBonus = generateBonus();
  const dexBonus = generateBonus();

  const sortedRatedGames: RatedGames = sortBy(map(games, game => rateGame(game, alcBonus, endBonus, dexBonus)), ["rating"]);
  const sortedBuckets: PointBuckets = sortBy(buckets, ["value"])

  const filledPointBuckets: Array<FilledPointBucket> = fillBuckets(sortedRatedGames, sortedBuckets);

  return {
    filledPointBuckets,
    alcBonus,
    endBonus,
    dexBonus,
  }
}