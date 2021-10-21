import { find, isEmpty, map, size, without } from "lodash";
import { useState } from "react";
import { Dropdown, DropdownElement } from "../../components/dropdown/Dropdown";
import { Input } from "../../components/input/Input";
import { Stepper } from "../../components/stepper/Stepper";
import { gameDays, games, pointBuckets, possibleTeamColors } from "../../data/gameData";
import { saveGamePlan } from "../../database/gamePlanDb";
import { Player, Team } from "../../types/gameTypes";
import { generateGamePlan } from "../../utils/gamePlanGenerationUtils";
import { AddPlayersStep } from "./steps/AddPlayersStep";

export const GameCreationView = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [players, setPlayer] = useState<Array<Player>>([]);
  const [teams, setTeams] = useState<Array<Team>>([]);

  const [currentColor, setCurrentColor] = useState<string>();
  const [currentTeamName, setCurrentTeamName] = useState<string>();
  
  const createNewGamePlan = () => {
    const generatedGames = generateGamePlan(games, pointBuckets, gameDays);
    saveGamePlan(generatedGames).then((key) => window.location.href = `/game/${key}`)
  }

  const appendPlayer = (player: Player) => {
    setPlayer([...players, player]);
  }

  const appendTeam = (team: Team) => {
    setCurrentColor("");
    setCurrentTeamName("");
    setTeams([...teams, team]);
  }

  const dropdownElements: Array<DropdownElement<string>> = map(without(possibleTeamColors, ...map(teams, team => team.color)), (color) => ({
    name: <div className={`w-full h-12 bg-${color}-400`}/>,
    item: color,
  }))

  return <div className="flex justify-center flex-col items-center">
    <h2 className="text-accent text-3xl headline mb-12">Neue Bierlympiade</h2>
    <Stepper currentStep={currentStep}>
      <AddPlayersStep players={players} onNextClick={() => setCurrentStep(1)} appendPlayer={appendPlayer}/>
      <div className="step-add-teams">
        <div className="teams mt-2 mb-24">
          <h3 className="text-accent text-2xl mb-4">Teams: </h3>
          {isEmpty(teams)
          ? <p className="text-accent">Bisher sind noch keine Teams angelegt worden</p>
          : map(teams, (team) => <div className="team border-accent border-b-2 text-accent px-4 py-1 mb-1 flex"><span className={`h-6 w-6 mr-4 bg-${team.color}-400`}></span><span>{team.name}</span></div>)}
        </div>
        <Dropdown elements={dropdownElements} currentElement={find(dropdownElements, (element) => element.item === currentColor)} placeholder="Teamfarbe auswählen" onChange={setCurrentColor}/>
        <div className="mb-4">
          <Input value={currentTeamName} onChange={setCurrentTeamName} placeholder="Teamnamen auswählen" />
        </div>
        <button onClick={() => !isEmpty(currentColor) && !isEmpty(currentTeamName) && appendTeam({color: currentColor!, name: currentTeamName!, players: []})} className={`button mb-12 w-full ${isEmpty(players) && "disabled"}`}>Team anlegen</button>

        <hr className="border-accent border-b-2 mb-8" />

        <button onClick={() => size(teams) > 1 && setCurrentStep(2)} className={`button w-full ${isEmpty(players) && "disabled"}`}>Fertig</button>
      </div>
    </Stepper>
  </div>
}