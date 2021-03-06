export interface WithId {
  id: IDBValidKey,
}

export interface Player {
  name: string,
}

export interface Team {
  name: string,
  color: string,
  players: Array<Player>,
}

export interface Game {
  name: string;
  alcFactor: number;
  endFactor: number;
  dexFactor: number;
}

export interface RatedGame extends Game {
  rating: number;
}

export interface PointedGame extends RatedGame {
  points: number;
  winnerTeam?: Team;
}

export type Games = Array<Game>;

export type RatedGames = Array<RatedGame>;

export type PointedGames = Array<PointedGame>;

export interface PointBucket {
  points: number;
  amountOfAllowedGames: number;
}

export type PointBuckets = Array<PointBucket>;

export interface GameDay {
  name: string,
  hoursToBePlayed: number,
}

export interface FilledGameDay extends GameDay {
  games: PointedGames
}

export type GamePlan = {
  alcBonus: number,
  endBonus: number,
  dexBonus: number,
  gameDays: Array<FilledGameDay>,
  teams: Array<Team>,
}
