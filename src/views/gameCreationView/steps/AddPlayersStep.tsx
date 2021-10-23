import { isEmpty, map } from "lodash"
import { useState } from "react";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { Player } from "../../../types/gameTypes"

export const AddPlayersStep = ({players, appendPlayer, onNextClick, deletePlayer}: {players: Array<Player>, appendPlayer: (player: Player) => void, onNextClick: () => void, deletePlayer: (player: Player) => void}): JSX.Element => {
  const [currentPlayerName, setCurrentPlayerName] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const resetState = (): void => {
    setShowModal(false);
    setCurrentPlayerName("");
  }

  const addPlayer = (): void => {
    if(currentPlayerName) {
      resetState();
      appendPlayer({name: currentPlayerName})
    }
  }

  const removePlayer = (player: Player): void => {
    deletePlayer(player);
  }

  const abort = (): void => {
    resetState();
  }

  return <div className="step-add-players h-full flex flex-col flex-wrap">
  {showModal
  && <Modal>
    <Input onChange={setCurrentPlayerName} value={currentPlayerName} placeholder="Neuen Spieler anlegen"/>
    <div className="flex">
      <button className={`button mt-4 mr-1 w-full`} onClick={abort}>Abbrechen</button>
      <button className={`${!currentPlayerName && "disabled"} button mt-4 ml-1 w-full`} onClick={() => currentPlayerName && addPlayer()}>Speichern</button>
    </div>
  </Modal>}
  <div className="players flex-grow p-4">
    <h3 className="text-accent text-2xl my-4">Spieler: </h3>
    <button onClick={() => setShowModal(true)} className={`button w-full`}>
      <i className="fas fa-user-plus"></i>
    </button>
    <div className="playersList h-3/5 overflow-y-auto mt-4">
      {!isEmpty(players)
      && map(players, (player) => <div className="player border-accent border-b-2 text-accent px-4 py-2 mb-1 flex justify-between items-center">
        <span>{player.name}</span>
        <i onClick={() => removePlayer(player)} className="fas fa-times cursor-pointer"></i>
      </div>)}
    </div>
  </div>

  <div className="stepper-bottom border-accent border-t-2 mt-2 pt-2">
    <button onClick={() => !isEmpty(players) && onNextClick()} className={`button w-full ${isEmpty(players) && "disabled"}`}>Fertig</button>
  </div>

</div>
}