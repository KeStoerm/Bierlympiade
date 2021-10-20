import { isEmpty, map } from "lodash";
import { useState } from "react";
import { Input } from "../../components/input/Input";
import { Stepper } from "../../components/stepper/Stepper";
import { gameDays, games, pointBuckets } from "../../data/gameData";
import { saveGamePlan } from "../../database/gamePlanDb";
import { Player } from "../../types/gameTypes";
import { generateGamePlan } from "../../utils/gamePlanGenerationUtils";

export const GameCreationView = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentPlayerName, setCurrentPlayerName] = useState<string>();
  const [players, setPlayer] = useState<Array<Player>>([]);

  const createNewGamePlan = () => {
    const generatedGames = generateGamePlan(games, pointBuckets, gameDays);
    saveGamePlan(generatedGames).then((key) => window.location.href = `/game/${key}`)
  }

  const appendPlayer = (player: Player) => {
    setCurrentPlayerName("");
    setPlayer([...players, player]);
  }

  return <div className="flex justify-center flex-col items-center">
    <h2 className="text-accent text-3xl headline mb-12">Neue Bierlympiade</h2>
    <Stepper currentStep={currentStep}>
      <div className="step-add-players">
      <div className="players mt-2 mb-24">
          <h3 className="text-accent text-2xl mb-4">Spieler: </h3>
          {isEmpty(players)
          ? <p className="text-accent">Bisher sind noch keine Spieler angelegt worden</p>
          : map(players, (player) => <div className="player border-accent border-b-2 text-accent px-4 py-1 mb-1">{player.name}</div>)}
        </div>

        <div className="flex mb-12">
          <Input onChange={setCurrentPlayerName} value={currentPlayerName} placeholder="Neuen Spieler anlegen"/>
          <button onClick={() => currentPlayerName && appendPlayer({name: currentPlayerName})} className={`button self-end flex-shrink w-1/4 ml-4 ${!currentPlayerName && "disabled"}`}>
            <i className="fas fa-user-plus"></i>
          </button>
        </div>

        <hr className="border-accent border-b-2 mb-8" />

        <button onClick={() => !isEmpty(players) && setCurrentStep(1)} className={`button w-full ${isEmpty(players) && "disabled"}`}>Fertig</button>
      </div>
      <div className="step-add-players">1</div>
    </Stepper>
  </div>
}