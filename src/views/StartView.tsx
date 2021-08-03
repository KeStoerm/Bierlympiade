import { BeerLogo } from "../components/logo/BeerLogo"

export const StartView = (): JSX.Element => {
  return <div className="main w-full md:w-1/2 flex justify-center flex-col items-center">
    <div className="beerLogoWrapper w-32 h-32 mb-4">
      <BeerLogo />
    </div>
    <h2 className="text-accent text-3xl mb-12 headline">BIERlympiade</h2>
    <button className="button w-full h-12 bg-accent text-secondary mb-2">Neue Beerlympiade anlegen</button>
    <button className="button w-full h-12 bg-accent text-secondary mb-2">tbd</button>
    <button className="button w-full h-12 bg-accent text-secondary mb-2">tbd</button>
    <button className="button w-full h-12 bg-accent text-secondary mb-2">tbd</button>
  </div>
}