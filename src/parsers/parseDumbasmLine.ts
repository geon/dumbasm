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
import {
	parseVariableLoad,
	type ParsedVariableLoad,
} from "./parseVariableLoad.js";

export type DumbasmFragment =
	| {
			readonly type: "variableDeclaration";
			readonly value: ParsedVariableDeclaration;
	  }
	| {
			readonly type: "variableLoad";
			readonly value: ParsedVariableLoad;
	  };

export const parseDumbasmLine: Parser<DumbasmFragment> = parseSequenceIndex(1, [
	parseOptional(parseWhitespace),
	parseKeyed({
		variableDeclaration: parseVariableDeclaration,
		variableLoad: parseVariableLoad,
	}),
	parseOptional(parseWhitespace),
	parseOptional(parseComment),
]);
