import { times } from 'lodash';
import { PointedGame } from '../../types/gameTypes';
import { BeerLogo } from '../logo/BeerLogo';
import './gameCard.scss';

export const GameCard = ({game, open}: {game: PointedGame, open: boolean}): JSX.Element => {
  const classes = open ? "" : "hidden";
  return <div className="gameCard w-full p-4 bg-accent mb-4">
    <div className="cardHead flex justify-between">
      <h4 className="headline w-1/2">{game.name}</h4>
      <div className="rating w-1/2 flex justify-end">{times(game.points, (index) => <div className="w-6 h-6"><BeerLogo key={game.name + index} dotted={true} /></div>)}</div>
    </div>
    <div className={classes + " cardBody mt-4"}>
      <button className="w-full h-20 bg-red-700 text-white text-right flex justify-center items-center mb-4">Rot gewinnt</button>
      <button className="w-full h-20 bg-green-700 text-white text-left flex justify-center items-center">Grün gewinnt</button>
    </div>
  </div>
}