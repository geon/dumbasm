import { failParsing } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { parseNumber } from "../parseNumber.js";

testExamples("parseNumber", [
	{
		name: "no match",
		input: "not a number",
		parser: parseNumber,
		result: failParsing(),
	},
	{
		input: "123",
		parser: parseNumber,
		result: {
			consumed: 3,
			parsed: 123,
		},
	},
]);
