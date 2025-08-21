import { parseEol } from "./combinators/parseEol.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseLookahead } from "./combinators/parseLookahead.js";
import { parseMonad } from "./combinators/parseMonad.js";
import type { Parser } from "./combinators/Parser.js";
import { parseSequence } from "./combinators/parseSequence.js";
import {
	parseVariableDeclaration,
	type ParsedVariableDeclaration,
} from "./parseVariableDeclaration.js";

export type ParsedDumbasmLine = Partial<{
	readonly type: "variableDeclaration";
	readonly variableDeclaration: ParsedVariableDeclaration;
}>;

export const parseDumbasmLine: Parser<ParsedDumbasmLine> = parseMonad(
	parseSequence([
		parseKeyed({
			variableDeclaration: parseVariableDeclaration,
		}),
		parseLookahead(parseEol),
	]),
	([, variableDeclaration]) => {
		return {
			type: "variableDeclaration",
			variableDeclaration,
		};
	},
);
