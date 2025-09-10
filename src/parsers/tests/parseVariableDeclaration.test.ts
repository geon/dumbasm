import {
	parseVariableDeclaration,
	type ParsedVariableDeclaration,
} from "../parseVariableDeclaration.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples<ParsedVariableDeclaration>("parseVariableDeclaration", [
	{
		input: "not a declaration",
		parser: parseVariableDeclaration,
		result: createParseError(0, 'Expected string "uint8".'),
	},
	{
		input: "uint8 myVariable",
		parser: parseVariableDeclaration,
		result: createParseResult(16, {
			location: undefined,
			type: "uint8",
			name: "myVariable",
			lineNum: 1,
		}),
	},
]);
