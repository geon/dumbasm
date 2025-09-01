import { parseAlternatives } from "./combinators/parseAlternatives.js";
import type { Parser } from "./combinators/Parser.js";
import { parseString } from "./combinators/parseString.js";

const validVariableLocations = [
	"regA",
	"regX",
	"regY",
	"reg",
	"zeroPage",
] as const;
export type VariableLocation = (typeof validVariableLocations)[number];

export const parseVariableLocation: Parser<VariableLocation> =
	parseAlternatives(validVariableLocations.map(parseString));
