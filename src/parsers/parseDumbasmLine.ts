import { parseKeyed } from "./combinators/parseKeyed.js";
import { parseOptional } from "./combinators/parseOptional.js";
import { type Parser } from "./combinators/Parser.js";
import { parseSequenceIndex } from "./combinators/parseSequenceIndex.js";
import { parseWhitespace } from "./combinators/parseWhitespace.js";
import { parseComment } from "./parseComment.js";
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
	parseOptional(parseComment),
]);
