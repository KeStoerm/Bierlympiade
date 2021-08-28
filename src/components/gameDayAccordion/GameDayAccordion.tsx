import { filter, map, reduce } from "lodash";
import { FilledGameDay, Team } from "../../types/gameTypes";

export const GameDayAccordion = ({open, gameDay, teams, children}: {open: boolean, gameDay: FilledGameDay, teams: Array<Team>, children: JSX.Element[] | JSX.Element}): JSX.Element => {
  const classes = `${open ? '' : 'hidden'}`;
  return <div className={"gameDayAccordion w-full mb-6 none"}>
    <div className="header w-full flex bg-accent headline p-4 mb-6 justify-between">
      <h3 className="name text-left">{gameDay.name}</h3>
      <div className="games text-center">Gespielt: {filter(gameDay.games, game => game.winnerTeam).length} / {gameDay.games.length}</div>
      <div className="points flex justify-end">
        {map(teams, team => <span className="headline px-4" style={({color: team.color})}>
            {reduce(gameDay.games, (acc, game) => game.winnerTeam === team ? acc + game.points : acc, 0)}
          </span>
        )}
        <span className="headline px-4">
          {reduce(gameDay.games, (acc, game) => !game.winnerTeam ? acc + game.points : acc, 0)}
        </span>
      </div>
    </div>
    <div className={classes + " content"}>
      {children}
    </div>
  </div>
}