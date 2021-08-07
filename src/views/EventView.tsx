import { flatten, map } from "lodash";
import { GameCard } from "../components/gameCard/GameCard"
import { games, pointBuckets } from "../data/gameData";
import { generateGamePlan } from "../utils/gamePlanGenerationUtils"

export const EventView = (): JSX.Element => {
  const generatedGames = generateGamePlan(games, pointBuckets);

  const sortedGames = flatten(map(generatedGames.filledPointBuckets, bucket => map(bucket.games, game => ({game, val: bucket.value}))));

  return <div className="w-screen md:w-1/2 ">
    {map(sortedGames, gameWrapper => <div className="py-4"><GameCard game={gameWrapper.game} points={gameWrapper.val}/></div>)}
  </div>
}