import { Link } from "react-router-dom"
import { BeerLogo } from "../components/logo/BeerLogo"


export const StartView = (): JSX.Element => {

  return <div className="main h-full flex justify-center flex-col items-center p-4">
    <div className="beerLogoWrapper w-40 h-40 mb-4">
      <BeerLogo dotted={false} />
    </div>
    <h2 className="text-accent text-3xl mb-12 headline">BIERlympiade</h2>
    <Link to="/create" className="button w-full mb-2">Neue Bierlympiade anlegen</Link>
    <Link to="/games" className="button w-full mb-2">Laufende Bierlympiade anzeigen</Link>
    <Link to="/game" className="button w-full mb-2">tbd</Link>
    <Link to="/game" className="button w-full mb-2">tbd</Link>
  </div>
}
