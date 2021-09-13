import { map } from 'lodash';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllGamePlans } from '../database/gamePlanDb';
import { GamePlan, WithId } from '../types/gameTypes'
import { findCurrentGame, findCurrentGameDay } from '../utils/gamePlanUtils';

export const EventOverView = (): JSX.Element => {
  const [gamePlans, setGamePlans] = useState<Array<GamePlan & WithId>>();

  useEffect(() => {
    (async () => {
      const gamePlans: Array<GamePlan & WithId> = await getAllGamePlans();
      setGamePlans(gamePlans);
    })();
  }, [])

  return <div>
    {map(gamePlans, (gamePlan) => {
    const currentGameDay = findCurrentGameDay(gamePlan);
    const currentGame = findCurrentGame(gamePlan);
    return <Link to={`/game/${gamePlan.id}`} key={gamePlan.alcBonus} className="gameCard w-full block p-4 bg-accent mb-4">
      <div className="cardHead flex justify-between w-full pb-4 headline">
        <h4 className="gameDay">{currentGameDay.name}</h4>
        <div className="game">{currentGame.name}</div>
      </div>
      <div className="cardBody pl-4">
      </div>
    </Link>
    })}
  </div>
}
