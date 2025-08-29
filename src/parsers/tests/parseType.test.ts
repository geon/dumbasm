import { parseType } from "../parseType.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseType", [
	{
		input: "not a type",
		parser: parseType,
		result: failParsing(),
	},
	{
		input: "uint8 myVariable",
		parser: parseType,
		result: {
			consumed: 5,
			parsed: "uint8",
		},
	},
]);
