import { Games, PointBuckets } from "../types/gameTypes";

export const games: Games = [
  {
    name: "easy Game",
    alcFactor: 1,
    dexFactor: 1,
    endFactor: 1,
  },
  {
    name: "alk Game",
    alcFactor: 10,
    dexFactor: 3,
    endFactor: 1,
  },
  {
    name: "dex Game",
    alcFactor: 3,
    dexFactor: 10,
    endFactor: 1,
  },
  {
    name: "end Game",
    alcFactor: 1,
    dexFactor: 3,
    endFactor: 10,
  },
  {
    name: "medi alk Game",
    alcFactor: 5,
    dexFactor: 2,
    endFactor: 2,
  },
  {
    name: "diff game Game",
    alcFactor: 5,
    dexFactor: 5,
    endFactor: 5,
  },
  {
    name: "fast hard Game",
    alcFactor: 1,
    dexFactor: 6,
    endFactor: 6,
  },
  {
    name: "easy mid Game",
    alcFactor: 3,
    dexFactor: 2,
    endFactor: 2,
  },
  {
    name: "drink heavy dex Game",
    alcFactor: 6,
    dexFactor: 4,
    endFactor: 1,
  },
  {
    name: "good overall Game",
    alcFactor: 3,
    dexFactor: 5,
    endFactor: 2,
  },
  {
    name: "hard Game",
    alcFactor: 8,
    dexFactor: 8,
    endFactor: 8,
  },
]

export const pointBuckets: PointBuckets = [
  {
    value: 2,
    amountOfAllowedGames: 2
  },
  {
    value: 3,
    amountOfAllowedGames: 4
  },
  {
    value: 5,
    amountOfAllowedGames: 3
  },
  {
    value: 7,
    amountOfAllowedGames: 2
  },
]