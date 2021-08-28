import { find, findIndex, map } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCard } from "../components/gameCard/GameCard";
import { GameDayAccordion } from "../components/gameDayAccordion/GameDayAccordion";
import { teams } from "../data/gameData";
import { getGamePlanById } from "../database/gamePlanDb";
import { GamePlan } from "../types/gameTypes";

type Params = {
  id: string,
}

export const EventView = (): JSX.Element => {
  const { id } = useParams<Params>();
  const [currentGamePlan, setCurrentGamePlan] = useState<GamePlan>();
  const [currentDayIndex, setCurrentDayIndex] = useState<Number>();
  const [currentGameIndex, setCurrentGameIndex] = useState<Number>();

  useEffect(() => {
    (async () => {
      setCurrentGamePlan(await getGamePlanById(id));
      
      const foundCurrentDayIndex = findIndex(currentGamePlan?.gameDays, (gameDay) => !!find(gameDay.games, game => !game.winnerTeam))
      setCurrentDayIndex(foundCurrentDayIndex);

      const currentDay = currentGamePlan?.gameDays[foundCurrentDayIndex];
      const foundCurrentGameIndex = findIndex(currentDay?.games, game => !game.winnerTeam);
      setCurrentGameIndex(foundCurrentGameIndex);
    })();
  }, []);

  if (!currentGamePlan) {
    return <div></div>;
  }

  return <div className="w-screen md:w-1/2 ">
    {`Alkoholbonus: ${currentGamePlan.alcBonus}`}
    {`Geschicklichkeitsbonus: ${currentGamePlan.dexBonus}`}
    {`Ausdauerbonus: ${currentGamePlan.endBonus}`}
    {map(currentGamePlan.gameDays, (gameDay, index) => <GameDayAccordion open={index === currentDayIndex} gameDay={gameDay} teams={teams}>
      {map(gameDay.games, (game, i) => <GameCard open={i === currentGameIndex} game={game}/>)}
    </GameDayAccordion>)}
  </div>
}
