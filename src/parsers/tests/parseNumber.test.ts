import { createParseError } from "../combinators/Parser.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { parseNumber } from "../parseNumber.js";

testExamples("parseNumber", [
	{
		name: "no match",
		input: "not a number",
		parser: parseNumber,
		result: createParseError(0, "Expected a number."),
	},
]);
