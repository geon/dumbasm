import { parseDumbasmLine } from "../parseDumbasmLine.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseDumbasmLine", [
	{
		input: "nonsense",
		parser: parseDumbasmLine,
		result: failParsing(),
	},
	{
		name: "empty line",
		input: "",
		parser: parseDumbasmLine,
		result: failParsing(),
	},
	{
		input: "uint8 myVariable",
		parser: parseDumbasmLine,
		result: {
			consumed: 16,
			parsed: {
				type: "variableDeclaration",
				value: {
					type: "uint8",
					location: undefined,
					name: "myVariable",
				},
			},
		},
	},
]);
