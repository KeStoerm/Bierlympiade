import { map } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCard } from "../components/gameCard/GameCard";
import { GameDayAccordion } from "../components/gameDayAccordion/GameDayAccordion";
import { teams } from "../data/gameData";
import { getGamePlanById, updateGamePlanById } from "../database/gamePlanDb";
import { FilledGameDay, GamePlan, PointedGame, Team } from "../types/gameTypes";
import { findCurrentGameDayIndex, findCurrentGameIndexInGameDay, updateInArrayAtIndex } from '../utils/gamePlanUtils';

type Params = {
  id: string,
}

export const EventView = (): JSX.Element => {
  const { id } = useParams<Params>();
  const [currentGamePlan, setCurrentGamePlan] = useState<GamePlan>();
  const [currentDayIndex, setCurrentDayIndex] = useState<number>();
  const [currentGameIndex, setCurrentGameIndex] = useState<number>();

  const winTeam = (team: Team) => {
    const currentGameDay = currentGamePlan!.gameDays[currentDayIndex || 0];
    const currentGame = currentGameDay.games[currentGameIndex || 0];
    const currentGameAsWon: PointedGame = {...currentGame, winnerTeam: team};

    const gamesWithWonGame = updateInArrayAtIndex(currentGameDay.games, currentGameIndex!, currentGameAsWon);
    const gameDayWithWonGame: FilledGameDay = {...currentGameDay, games: gamesWithWonGame};

    const updatedGamePlan: GamePlan = {...currentGamePlan!, gameDays: updateInArrayAtIndex(currentGamePlan!.gameDays, currentGameIndex!, gameDayWithWonGame)}

    updateGamePlanById(updatedGamePlan, id);
    loadGamePlan();
  };

  const loadGamePlan = async () => {
    const foundGamePlan: GamePlan = await getGamePlanById(id)
      setCurrentGamePlan(foundGamePlan);

      const foundCurrentDayIndex = findCurrentGameDayIndex(foundGamePlan);
      setCurrentDayIndex(foundCurrentDayIndex);

      const foundCurrentGameIndex = findCurrentGameIndexInGameDay(foundGamePlan, foundCurrentDayIndex);
      setCurrentGameIndex(foundCurrentGameIndex);
  }

  useEffect(() => {
    loadGamePlan();
  }, []);

  if (!currentGamePlan) {
    return <div></div>;
  }

  return <div className="">
    {map(currentGamePlan.gameDays, (gameDay, index) => <GameDayAccordion key={gameDay.name} open={index === currentDayIndex} gameDay={gameDay} teams={teams}>
      {map(gameDay.games, (game, i) => <GameCard onTeamWon={(team) => winTeam(team)} key={game.name} open={i === currentGameIndex} game={game}/>)}
    </GameDayAccordion>)}
  </div>
}
