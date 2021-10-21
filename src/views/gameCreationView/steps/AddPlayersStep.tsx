import { isEmpty, map } from "lodash"
import { useState } from "react";
import { Input } from "../../../components/input/Input";
import { Player } from "../../../types/gameTypes"

export const AddPlayersStep = ({players, appendPlayer, onNextClick}: {players: Array<Player>, appendPlayer: (player: Player) => void, onNextClick: () => void}): JSX.Element => {
  const [currentPlayerName, setCurrentPlayerName] = useState<string>();

  const addPlayer = (): void => {
    if(currentPlayerName) {
      setCurrentPlayerName("");
      appendPlayer({name: currentPlayerName})
    }
  }

  return <div className="step-add-players">
  <div className="players mt-2 mb-24">
    <h3 className="text-accent text-2xl mb-4">Spieler: </h3>
    {isEmpty(players)
    ? <p className="text-accent">Bisher sind noch keine Spieler angelegt worden</p>
    : map(players, (player) => <div className="player border-accent border-b-2 text-accent px-4 py-1 mb-1">{player.name}</div>)}
  </div>

  <div className="flex mb-12">
    <Input onChange={setCurrentPlayerName} value={currentPlayerName} placeholder="Neuen Spieler anlegen"/>
    <button onClick={() => currentPlayerName && addPlayer()} className={`button self-end flex-shrink w-1/4 ml-4 ${!currentPlayerName && "disabled"}`}>
      <i className="fas fa-user-plus"></i>
    </button>
  </div>

  <hr className="border-accent border-b-2 mb-8" />

  <button onClick={() => !isEmpty(players) && onNextClick()} className={`button w-full ${isEmpty(players) && "disabled"}`}>Fertig</button>
</div>
}