import { parseVariableDeclaration } from "../parseVariableDeclaration.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseVariableDeclaration", [
	{
		input: "not a declaration",
		parser: parseVariableDeclaration,
		result: failParsing(),
	},
	{
		input: "uint8 myVariable",
		parser: parseVariableDeclaration,
		result: {
			consumed: 16,
			parsed: {
				location: undefined,
				type: "uint8",
				name: "myVariable",
			},
		},
	},
]);
