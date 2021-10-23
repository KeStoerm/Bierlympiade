import { map, times } from 'lodash';
import { PointedGame, Team } from '../../types/gameTypes';
import { BeerLogo } from '../logo/BeerLogo';
import { LongPressButton } from '../longPressButton/LongPressButton';
import './gameCard.scss';

export const GameCard = ({game, open, teams, onTeamWon}: {game: PointedGame, teams: Array<Team>, open: boolean, onTeamWon: (team: Team) => void}): JSX.Element => {
  const classes = open ? "" : "hidden";
  const winningTeam = game.winnerTeam;
  const getTeamColor = (team: Team) => `${team.color}-700`;

  return <div className="gameCard w-full p-4 bg-accent mb-4">
    <div className="cardHead flex justify-between">
      <h4 className="headline w-1/2">{game.name}</h4>
      {winningTeam 
        ? <div className={`headline text-${getTeamColor(winningTeam)}`}>{winningTeam.name} gewinnt!</div>
        : <div className="rating w-1/2 flex justify-end">{times(game.points, (index) => <div className="w-6 h-6"><BeerLogo key={game.name + index} dotted={true} /></div>)}</div>
      }
    </div>
    <div className={classes + " cardBody mt-4"}>
      {map(teams, team => <LongPressButton callback={() => onTeamWon(team)} key={team.name} classNames={`h-20 bg-${getTeamColor(team)} text-white mb-1`}>{`${team.name} gewinnt`}</LongPressButton>)}
    </div>
  </div>
}
