import { random, size, without } from 'lodash';
import { useState } from 'react';
import './beerLogo.scss';

enum TurnTypes {
  NONE = "",
  IS_TURNED_LEFT = "isTurnedLeft",
  IS_TURNED_RIGHT = "isTurnedRight",
}

const turnTypes = Object.values(TurnTypes);

export const BeerLogo = (): JSX.Element => {
  const [turned, setTurned] = useState<TurnTypes>(TurnTypes.NONE);

  const randomizeTurn = (): void => {
    const availableTurnes = without(turnTypes, turned);

    setTurned(availableTurnes[random(0, size(availableTurnes) - 1)]);
  }

  return <div className={`flex justify-center w-full h-full beerLogo ${turned}`} onClick={randomizeTurn}>
    <div className="spacer w-2/12 "></div>
    <div className="mug w-8/12 self-center border-2 border-t-0 border-gray-400 rounded-b h-full relative">
      <div className="contentWrapper h-full w-full absolute">
        <div className="foam h-1/6 w-full flex overflow-hidden bg-white"></div>
        <div className="beer h-5/6 w-full">
          <div className="bubbleContainer flex justify-around h-full w-full overflow-hidden">
            <div className="bubble w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
            <div className="bubble w-1.5 h-1.5 rounded-full z-10 border border-gray-200 self-center"></div>
            <div className="bubble w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
            <div className="bubble w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
            <div className="bubble w-1.5 h-1.5 rounded-full z-10 border border-gray-200 self-end"></div>
          </div>
        </div>
    </div>
      <div className="shineContainer w-full h-5/6 flex items-end justify-around absolute">
        <div className="glassShine w-1/5 bg-black opacity-20 h-3/4"></div>
        <div className="glassShine w-1/5 bg-black opacity-20 h-3/4"></div>
        <div className="glassShine w-1/5 bg-black opacity-20 h-3/4"></div>
      </div>
    </div>
    <div className="handle w-2/12 self-center border-2 rounded-r border-gray-400 border-l-0 h-1/4"></div>
</div>
}
