import { getAuth } from 'firebase/auth';
import { map } from 'lodash';
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { saveFinishedGame } from '../controller/gameController';
import { getAllGamePlans } from '../database/gamePlanDb';
import { GamePlan, WithId } from '../types/gameTypes'
import { findCurrentGame, findCurrentGameDay, isGamePlanFinished } from '../utils/gamePlanUtils';

export const EventOverView = (): JSX.Element => {
  const auth = getAuth();
  const [gamePlans, setGamePlans] = useState<Array<GamePlan & WithId>>();
  const [user, loading] = useAuthState(auth);

  const isSaveEnabled = user && !loading;

  useEffect(() => {
    (async () => {
      const gamePlans: Array<GamePlan & WithId> = await getAllGamePlans();
      setGamePlans(gamePlans);
    })();
  }, [])

  return <div>
    {map(gamePlans, (gamePlan) => {
    const isPlanFinished = isGamePlanFinished(gamePlan);
    const currentGameDayName = isPlanFinished ? "" : findCurrentGameDay(gamePlan).name;
    const currentGameName = isPlanFinished ? "" : findCurrentGame(gamePlan).name;
    return <Link to={`/game/${gamePlan.id}`} key={gamePlan.alcBonus} className="gameCard w-full block p-4 bg-accent mb-4">
      <div className="cardHead flex justify-between w-full pb-4 headline">
        <h4 className="gameDay">{currentGameDayName}</h4>
        <div className="game">{currentGameName}</div>
        <button onClick={() => isSaveEnabled && saveFinishedGame(gamePlan, user!)} disabled={!isSaveEnabled}>speichern</button>
      </div>
      <div className="cardBody pl-4">
      </div>
    </Link>
    })}
  </div>
}
