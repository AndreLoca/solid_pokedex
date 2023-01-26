import { Type } from "../interfaces/interfaces";

interface color {
  bg: string;
  fg: string;
}

export const typeToColor = (type: string): color => {
  switch (type) {
    case "bug":
      return { bg: "bg-lime-800", fg: "text-white" };
    case "dragon":
      return { bg: "bg-violet-800", fg: "text-white" };
    case "electric":
      return { bg: "bg-amber-300", fg: "text-black" };
    case "fairy":
      return { bg: "bg-pink-300", fg: "text-white" };
    case "fighting":
      return { bg: "bg-rose-700", fg: "text-white" };
    case "fire":
      return { bg: "bg-red-500", fg: "text-white" };
    case "flying":
      return { bg: "bg-cyan-200", fg: "text-black" };
    case "grass":
      return { bg: "bg-green-500", fg: "text-white" };
    case "ground":
      return { bg: "bg-amber-900", fg: "text-white" };
    case "ghost":
      return { bg: "bg-red-500", fg: "text-white" };
    case "ice":
      return { bg: "bg-cyan-100", fg: "text-black" };
    case "normal":
      return { bg: "bg-slate-200", fg: "text-black" };
    case "poison":
      return { bg: "bg-fuchsia-500", fg: "text-white" };
    case "psychic":
      return { bg: "bg-fuchsia-300", fg: "text-white" };
    case "rock":
      return { bg: "bg-stone-600", fg: "text-white" };
    case "water":
      return { bg: "bg-sky-800", fg: "text-white" };
    default:
      return { bg: "bg-black", fg: "text-white" };
  }
};

export const colorBackground = (pokeTypes: Type[]): string => {
  if (pokeTypes) {
    return typeToColor(pokeTypes[0]?.type.name).bg;
  }

  return "bg-white";
};
