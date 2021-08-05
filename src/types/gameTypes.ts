export interface Game {
  name: string;
  alcFactor: number;
  endFactor: number;
  dexFactor: number;
}

export interface RatedGame extends Game {
  rating: number;
}

export type Games = Array<Game>;

export type RatedGames = Array<RatedGame>;

export interface PointBucket {
  value: number;
  amountOfAllowedGames: number;
}

export type PointBuckets = Array<PointBucket>;

export interface FilledPointBucket extends PointBucket {
  games: RatedGames;
}

export type GamePlan = {
  alcBonus: number,
  endBonus: number,
  dexBonus: number,
  filledPointBuckets: Array<FilledPointBucket>;
}