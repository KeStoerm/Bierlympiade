import { Link } from "react-router-dom"
import { BeerLogo } from "../components/logo/BeerLogo"
import { gameDays, games, pointBuckets } from "../data/gameData";
import { saveGamePlan } from "../database/gamePlanDb";
import { generateGamePlan } from "../utils/gamePlanGenerationUtils";

export const StartView = (): JSX.Element => {
  const createNewGamePlan = () => {
    const generatedGames = generateGamePlan(games, pointBuckets, gameDays);
    saveGamePlan(generatedGames).then((key) => window.location.href = `/game/${key}`)
  }

  return <div className="main w-full md:w-1/2 flex justify-center flex-col items-center">
    <div className="beerLogoWrapper w-40 h-40 mb-4">
      <BeerLogo dotted={false} />
    </div>
    <h2 className="text-accent text-3xl mb-12 headline">BIERlympiade</h2>
    <button onClick={createNewGamePlan} className="button w-full h-12 bg-accent text-secondary mb-2 flex items-center justify-center">Neue Bierlympiade anlegen</button>
    <Link to="/game" className="button w-full h-12 bg-accent text-secondary mb-2 flex items-center justify-center">Laufende Bierlympiade anzeigen</Link>
    <Link to="/game" className="button w-full h-12 bg-accent text-secondary mb-2 flex items-center justify-center">tbd</Link>
    <Link to="/game" className="button w-full h-12 bg-accent text-secondary mb-2 flex items-center justify-center">tbd</Link>
  </div>
}