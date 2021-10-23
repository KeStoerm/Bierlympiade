import { filter, find, flatten, includes, isEmpty, map, size, without } from "lodash";
import { useState } from "react";
import { Dropdown, DropdownElement } from "../../../components/dropdown/Dropdown";
import { Input } from "../../../components/input/Input";
import { Modal } from "../../../components/modal/Modal";
import { possibleTeamColors } from "../../../data/gameData";
import { Player, Team } from "../../../types/gameTypes";

export const AddTeamsStep = ({players, teams, onNextClick, appendTeam, deleteTeam, appendPlayerToTeam, deletePlayerFromTeam}:
  {players: Array<Player>, teams: Array<Team>, onNextClick: () => void, appendTeam: (team: Team) => void, deleteTeam: (team: Team) => void,
    appendPlayerToTeam: (team: Team, player: Player) => void, deletePlayerFromTeam: (team: Team, player: Player) => void}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>();

  const [currentColor, setCurrentColor] = useState<string>();
  const [currentTeamName, setCurrentTeamName] = useState<string>("");

  const resetState = (): void => {
    setShowModal(false);
    setModalError("");
    setCurrentColor("");
    setCurrentTeamName("");
  }

  const abort = (): void => {
    resetState();
  }

  const removeTeam = (team: Team): void => {
    deleteTeam(team);
  }

  const addTeam = (): void => {
    if(find(teams, team => team.name === currentTeamName)){
      setModalError("Den Teamnamen gibts schon. Bitte gib einen eindeutigen ein.");
      return;
    }

    if(find(teams, team => team.color === currentColor)){
      setModalError("Die Teamfarbe gibts schon. Bitte wähle eine eindeutige.");
      return;
    }

    if(currentTeamName && currentColor) {
      resetState();
      appendTeam({color: currentColor!, name: currentTeamName!, players: []})
    }
  }

  const addPlayerToTeam = (team: Team, player: string) => {
    appendPlayerToTeam(team, {name: player})
  }

  const removePlayerFromTeam = (team: Team, player: Player) => {
    deletePlayerFromTeam(team, player);
  }

  const pickedPlayersNames = map(flatten(map(teams, teams => teams.players)), player => player.name);

  const pickablePlayers = filter(players, player => !includes(pickedPlayersNames, player.name));

  const playerDropdownElements: Array<DropdownElement<string>> = map(pickablePlayers, player => ({
    id: player.name,
    name: player.name,
    item: player.name,
  }))

  const colorDropdownElements: Array<DropdownElement<string>> = map(without(possibleTeamColors, ...map(teams, team => team.color)), (color) => ({
    id: color,
    name: <div className={`w-full h-12 bg-${color}-700`}/>,
    item: color,
  }))

  const isModalFilled = !isEmpty(currentColor) && !isEmpty(currentTeamName);

  return <div className="step-add-teams h-full flex flex-col flex-wrap">
  {showModal
  && <Modal>
    <h3 className="text-accent text-2xl my-4">Team anlegen</h3>
    <Dropdown elements={colorDropdownElements} currentElement={find(colorDropdownElements, (element) => element.item === currentColor)} placeholder="Teamfarbe auswählen" onChange={setCurrentColor}/>
    <div className="mb-4">
      <Input value={currentTeamName} onChange={setCurrentTeamName} placeholder="Teamnamen auswählen" />
    </div>
    <div>{modalError && <p className="text-red-700">{modalError}</p>}</div>
    <div className="flex">
    <button className={`button mr-1 w-full`} onClick={abort}>Abbrechen</button>
    <button onClick={() => isModalFilled && addTeam()} className={`button ml-1 w-full ${!isModalFilled && "disabled"}`}>Team anlegen</button>
    </div>
  </Modal>}
  <div className="teams flex-grow p-4">
    <h3 className="text-accent text-2xl my-4">Teams: </h3>
    {size(teams) < 2 && <button onClick={() => setShowModal(true)} className={`button w-full`}>
      <i className="fas fa-users"></i>
    </button>}
    <div className="teamsList h-3/5 overflow-y-auto mt-4">
      {!isEmpty(teams) 
          && map(teams, (team, index) => <div key={team.name} className={`team text-accent mb-1 ${index > 0 ? 'mt-8' : 'mt-4'}`}>
            <div className={`w-full border-accent border-b-2 px-4 py-1 flex justify-items-start items-center`}>
              <div className={`h-4 mr-4 bg-${team.color}-700 w-4 rounded-full`}></div>
              <div>{team.name}</div>
              <div className="spacer flex-grow"></div>
              <i onClick={() => removeTeam(team)} className="fas fa-times cursor-pointer justify-self-end"></i>
            </div>
            <div className="pl-4">
              {size(pickablePlayers) > 0 && <Dropdown elements={playerDropdownElements} placeholder="Spieler zuweisen" onChange={(player) => addPlayerToTeam(team, player)}/>}
            </div>
            <div className="pl-4">
              {map(team.players, player => <div key={player.name} className="player border-accent border-b-2 text-accent px-4 py-2 mb-1 flex justify-between items-center">
                <span>{player.name}</span>
                <i onClick={() => removePlayerFromTeam(team, player)} className="fas fa-times cursor-pointer"></i>
              </div>)}
            </div>
          </div>)}
    </div>
  </div>

  <div className="stepper-bottom border-accent border-t-2 mt-2 pt-2">
    <button onClick={() => size(teams) > 1 && size(pickablePlayers) === 0 && onNextClick()} className={`button w-full ${size(teams) < 2 || size(pickablePlayers) > 0 ? "disabled" : ""}`}>Speichern</button>
  </div>

</div>
}