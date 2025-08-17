import { parseType } from "../parseType.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseType", [
	{
		input: "not a type",
		parser: parseType,
		result: undefined,
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
