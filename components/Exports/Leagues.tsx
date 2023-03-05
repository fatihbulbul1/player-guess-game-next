import { StaticImageData } from "next/image";
import stsl from "../../public/stslplayers.json";
import pl from "../../public/plplayers.json";
import bun from "../../public/bundesligatr.json";
import seria from "../../public/serieaplayerstr.json";
import league1 from "../../public/league1playerstr.json";
import laliga from "../../public/laligaplayerstr.json";
import trimages from "./trimages";
import enimages from "./enimages";
import deimages from "./deimages";
import itimages from "./itimages";
import esimages from "./esimages";
import fraimages from "./fraimages";

type Photos = {
  Easy1: StaticImageData;
  Easy2: StaticImageData;
  Easy3: StaticImageData;
  Med1: StaticImageData;
  Med2: StaticImageData;
  Med3: StaticImageData;
  Hard1: StaticImageData;
  Hard2: StaticImageData;
  Hard3: StaticImageData;
};
type League = {
  name: string;
  values: string[];
  photos: Photos;
  league: {
    number: string;
    name: string;
    position: string;
    team: string;
    nations: string[];
    age: string;
    contract: string;
    pd: string;
  }[];
};
const Leagues: League[] = [
  {
    name: "STSL",
    values: ["6.99 mil. €", "2.99 mil. €", "0.99 mil. €"],
    photos: trimages,
    league: stsl,
  },
  {
    name: "PL",
    values: ["59.99 mil. €", "34.99 mil. €", "14.99 mil. €"],
    photos: enimages,
    league: pl,
  },
  {
    name: "LALIGA",
    values: ["39.99 mil. €", "14.99 mil. €", "9.99 mil. €"],
    photos: esimages,
    league: laliga,
  },
  {
    name: "SERIEA",
    values: ["39.99 mil. €", "14.99 mil. €", "5.99 mil. €"],
    photos: itimages,
    league: seria,
  },
  {
    name: "LEAGUE1",
    values: ["24.99 mil. €", "14.99 mil. €", "4.99 mil. €"],
    photos: fraimages,
    league: league1,
  },
  {
    name: "BUN",
    values: ["39.99 mil. €", "14.99 mil. €", "5.99 mil. €"],
    photos: deimages,
    league: bun,
  },
];
export default Leagues;
