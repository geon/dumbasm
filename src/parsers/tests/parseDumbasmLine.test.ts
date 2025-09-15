import { parseDumbasmLine, type DumbasmFragment } from "../parseDumbasmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples<DumbasmFragment>("parseDumbasmLine", [
	{
		input: "nonsense",
		parser: parseDumbasmLine,
		result: createParseError(
			0,
			'No alternative matched.\n\tvariableDeclaration: Expected string "uint8".\n\tvariableLoad: Expected string \"ld\".',
		),
	},
	{
		name: "empty line",
		input: "",
		parser: parseDumbasmLine,
		result: createParseError(
			0,
			'No alternative matched.\n\tvariableDeclaration: Expected string "uint8".\n\tvariableLoad: Expected string \"ld\".',
		),
	},
	{
		input: "uint8 myVariable ; Comment",
		parser: parseDumbasmLine,
		result: createParseResult(26, {
			type: "variableDeclaration",
			value: {
				type: "uint8",
				location: undefined,
				lineNum: 1,
				name: "myVariable",
			},
		}),
	},
]);
