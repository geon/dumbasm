import { parseEol } from "./combinators/parseEol.js";
import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseLookahead } from "./combinators/parseLookahead.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { type Parser } from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import {
	parseVariableDeclaration,
	type ParsedVariableDeclaration,
} from "./parseVariableDeclaration.js";

export type DumbasmFragment = {
	readonly type: "variableDeclaration";
	readonly value: ParsedVariableDeclaration;
};

export const parseDumbasmLine: Parser<DumbasmFragment> = parseSequenceIndex(1, [
	parseOptional(parseWhitespace),
	parseKeyed({
		variableDeclaration: parseVariableDeclaration,
	}),
	parseOptional(parseWhitespace),
	parseLookahead(parseEol),
]);
