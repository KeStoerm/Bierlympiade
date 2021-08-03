import './beerLogo.scss';

export const BeerLogo = (): JSX.Element => {
  return <div className="flex justify-center w-full h-full">
    <div className="mug w-5/6 self-center border-2 border-t-0 border-gray-400 rounded-b h-full">
      <div className="foam h-1/6 w-full flex overflow-hidden bg-white"></div>
      <div className="beer h-5/6 w-full relative">
        <div className="shineContainer w-full h-full flex justify-around absolute">
          <div className="glassShine w-1/5 bg-black opacity-20 h-3/4 self-center"></div>
          <div className="glassShine w-1/5 bg-black opacity-20 h-3/4 self-center"></div>
          <div className="glassShine w-1/5 bg-black opacity-20 h-3/4 self-center"></div>
        </div>

        <div className="bubbleContainer flex justify-around h-full w-full absolute overflow-hidden">
          <div className="bubble bubble1 w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
          <div className="bubble bubble2 w-1 h-1 rounded-full z-10 border border-gray-200 self-center"></div>
          <div className="bubble bubble3 w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
          <div className="bubble bubble4 w-1 h-1 rounded-full z-10 border border-gray-200 self-end"></div>
        </div>
      </div>
    </div>
    <div className="handle w-1/6 self-center border-2 rounded-r border-gray-400 border-l-0 h-1/4"></div>
  </div>
}
