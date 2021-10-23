import { FilledGameDay, Game, GameDay, GamePlan, Games, PointBuckets, PointedGame, RatedGame, RatedGames } from "../types/gameTypes";
import { flatten, head, map, partition, random, reduce, shuffle, size, sortBy, tail, take, takeRight, zip } from "lodash";

const generateBonus = (): number => 1 + random(0.0, 1.01);

const rateGame = (game: Game, alcBonus: number, endBonus: number, dexBonus: number): RatedGame => ({
  ...game,
  rating: game.alcFactor * alcBonus + game.dexFactor * dexBonus + game.endFactor * endBonus,
})

const pointGames = (sortedRatedGames: RatedGames, sortedBuckets: PointBuckets): Array<PointedGame> => {
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

const generateGameDays = (pointedGames: Array<PointedGame>, gameDays: Array<GameDay>): Array<FilledGameDay> => {
  const totalPoints = reduce(pointedGames, (acc, game) => acc + game.points, 0);
  const totalHours = reduce(gameDays, (acc, day) => acc + day.hoursToBePlayed, 0);
  const averagePointScore = totalPoints / pointedGames.length;
  
  const [lowerGames, upperGames] = partition(pointedGames, game => game.points < averagePointScore);
  let games = flatten(zip(shuffle(lowerGames), shuffle(upperGames)));
  const result: Array<FilledGameDay> = map(gameDays, (gameDay) => {
    const allowedPoints = (gameDay.hoursToBePlayed / totalHours) * totalPoints;
    let gamesForTheDay: Array<PointedGame> = [];
    let pointsForTheDay = 0;

    do {
      const gameForTheDay = head(games)!;
      gamesForTheDay = [...gamesForTheDay, gameForTheDay];
      pointsForTheDay += gameForTheDay!.points;
      games = tail(games);
    } while (games.length >= 1 && allowedPoints - pointsForTheDay >= (averagePointScore / gameDays.length))

    return {...gameDay, games: gamesForTheDay};
  })

  return result;
}

export const generateGamePlan = (games: Games, buckets: PointBuckets, gameDays: Array<GameDay>): GamePlan => {
  const alcBonus = generateBonus();
  const endBonus = generateBonus();
  const dexBonus = generateBonus();

  const sortedRatedGames: RatedGames = sortBy(map(games, game => rateGame(game, alcBonus, endBonus, dexBonus)), ["rating"]);
  const sortedBuckets: PointBuckets = sortBy(buckets, ["points"])

  const pointedGames: Array<PointedGame> = pointGames(sortedRatedGames, sortedBuckets);

  return {alcBonus, endBonus, dexBonus, gameDays: generateGameDays(pointedGames, gameDays), teams: []};
}