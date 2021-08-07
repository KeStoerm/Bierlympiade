import { times } from 'lodash';
import { RatedGame } from '../../types/gameTypes';
import { BeerLogo } from '../logo/BeerLogo';
import './gameCard.scss';

export const GameCard = ({game, points}: {game: RatedGame, points: number}): JSX.Element => {
  return <div className="gameCard w-full p-4 bg-accent m">
    <div className="cardHead flex justify-between mb-4">
      <h4 className="headline w-1/2">{game.name}</h4>
      <div className="rating w-1/2 flex justify-end">{times(points, () => <div className="w-6 h-6"><BeerLogo dotted={true} /></div>)}</div>
    </div>
    <div className="cardBody">
      <button className="w-full h-20 bg-red-700 text-white text-right flex justify-center items-center mb-4">Rot gewinnt</button>
      <button className="w-full h-20 bg-green-700 text-white text-left flex justify-center items-center">Grün gewinnt</button>
    </div>
  </div>
}