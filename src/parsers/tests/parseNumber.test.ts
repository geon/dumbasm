import { testExamples } from "../combinators/tests/testExamples.js";
import { parseNumber } from "../parseNumber.js";

testExamples("parseNumber", [
	{
		name: "no match",
		input: "not a number",
		parser: parseNumber,
		result: undefined,
	},
	{
		input: "123",
		parser: parseNumber,
		result: {
			consumed: 3,
			parsed: {
				format: "dec",
				value: 123,
			},
		},
	},
]);
