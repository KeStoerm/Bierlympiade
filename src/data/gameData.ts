import { GameDay, Games, PointBuckets, Team } from "../types/gameTypes";

export const games: Games = [
  {
    name: "Russisch Roulette",
    alcFactor: 2,
    dexFactor: 1,
    endFactor: 1,
  },
  {
    name: "Gruppenflunkyball",
    alcFactor: 8,
    dexFactor: 7,
    endFactor: 3,
  },
  {
    name: "Kalüngeln",
    alcFactor: 2,
    dexFactor: 5,
    endFactor: 1,
  },
  {
    name: "Brett vorm Kopf",
    alcFactor: 4,
    dexFactor: 2,
    endFactor: 1,
  },
  {
    name: "Looping Louey",
    alcFactor: 10,
    dexFactor: 8,
    endFactor: 1,
  },
  {
    name: "Männer-Gemeinschaftslüge",
    alcFactor: 4,
    dexFactor: 7,
    endFactor: 3,
  },
  {
    name: "Promillepoker",
    alcFactor: 6,
    dexFactor: 4,
    endFactor: 2,
  },
  {
    name: "Gegenstände raten",
    alcFactor: 1,
    dexFactor: 4,
    endFactor: 2,
  },
  {
    name: "Dodgeball",
    alcFactor: 3,
    dexFactor: 7,
    endFactor: 8,
  },
  {
    name: "Bottleflip",
    alcFactor: 2,
    dexFactor: 6,
    endFactor: 2,
  },
  {
    name: "Alkoholanschlag",
    alcFactor: 4,
    dexFactor: 1,
    endFactor: 1,
  },
  {
    name: "Bierpong",
    alcFactor: 5,
    dexFactor: 5,
    endFactor: 2,
  },
  {
    name: "Kronkorken-Curling",
    alcFactor: 2,
    dexFactor: 10,
    endFactor: 3,
  },
  {
    name: "Staffelsauf",
    alcFactor: 5,
    dexFactor: 1,
    endFactor: 10,
  },
]

export const gameDays: Array<GameDay> = [
  {
    name: "Freitag",
    hoursToBePlayed: 5,
  },
  {
    name: "Samstag",
    hoursToBePlayed: 13,
  },
  {
    name: "Sonntag",
    hoursToBePlayed: 13,
  },
]

export const pointBuckets: PointBuckets = [
  {
    points: 1,
    amountOfAllowedGames: 3
  },
  {
    points: 2,
    amountOfAllowedGames: 4
  },
  {
    points: 3,
    amountOfAllowedGames: 4
  },
  {
    points: 4,
    amountOfAllowedGames: 2
  },
  {
    points: 6,
    amountOfAllowedGames: 1
  },
]

export const teams: Array<Team> = [
  {
    name: "Team-Rot", 
    color: "red"
  },
  {
    name: "Team-Rot", 
    color: "blue"
  }
]
