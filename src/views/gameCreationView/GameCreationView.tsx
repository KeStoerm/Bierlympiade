import { filter, findIndex, without } from "lodash";
import { useState } from "react";
import { Stepper } from "../../components/stepper/Stepper";
import { gameDays, games, pointBuckets } from "../../data/gameData";
import { saveGamePlan } from "../../database/gamePlanDb";
import { Player, Team } from "../../types/gameTypes";
import { annealGamePlan } from "../../utils/gamePlanAnnealingUtils";
import { updateInArrayAtIndex } from "../../utils/generalUtils";
import { AddPlayersStep } from "./steps/AddPlayersStep";
import { AddTeamsStep } from "./steps/AddTeamsStep";

export const GameCreationView = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [teams, setTeams] = useState<Array<Team>>([]);
  
  const createNewGamePlan = () => {
    const generatedGames = annealGamePlan(games, pointBuckets, gameDays);
    const gamePlan = {
      ...generatedGames,
      teams: teams,
    }
    saveGamePlan(gamePlan).then((key) => window.location.href = `/game/${key}`)
  }

  const appendPlayer = (player: Player) => {
    setPlayers([...players, player]);
  }

  const deletePlayer = (player: Player) => {
    setPlayers(without(players, player));
  }

  const appendTeam = (team: Team) => {
    setTeams([...teams, team]);
  }

  const deleteTeam = (team: Team) => {
    setTeams(without(teams, team));
  }

  const addPlayerToTeam = (team: Team, player: Player) => {
    const foundTeamIndex = findIndex(teams, t => t.name === team.name);
    const foundTeam = teams[foundTeamIndex];

    const newTeam: Team = {
      ...foundTeam,
      players: [
        ...foundTeam.players,
        player,
      ]
    }

    const newTeams = updateInArrayAtIndex(teams, foundTeamIndex, newTeam);
    setTeams(newTeams);
  }

  const deletePlayerFromTeam = (team: Team, player: Player) => {
    const foundTeamIndex = findIndex(teams, t => t.name === team.name);
    const foundTeam = teams[foundTeamIndex];

    const newPlayers = filter(foundTeam.players, p => p.name !== player.name);

    const newTeam: Team = {
      ...foundTeam,
      players: newPlayers
    }

    const newTeams = updateInArrayAtIndex(teams, foundTeamIndex, newTeam);
    setTeams(newTeams);
  }

  return <div className="flex flex-col h-screen">
    <div className="header w-full py-4 bg-secondary">
      <h2 className="text-accent text-3xl headline text-center">Neue Bierlympiade</h2>
    </div>
    <Stepper className="flex-grow" currentStep={currentStep}>
      <AddPlayersStep players={players} onNextClick={() => setCurrentStep(1)} appendPlayer={appendPlayer} deletePlayer={deletePlayer}/>
      <AddTeamsStep  players={players} teams={teams} appendTeam={appendTeam} deleteTeam={deleteTeam} appendPlayerToTeam={addPlayerToTeam} deletePlayerFromTeam={deletePlayerFromTeam} onNextClick={createNewGamePlan} />
    </Stepper>
  </div>
}