import { parseType } from "../parseType.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseType", [
	{
		input: "not a type",
		parser: parseType,
		result: createParseError(0, 'Expected string "uint8".'),
	},
	{
		input: "uint8 myVariable",
		parser: parseType,
		result: createParseResult(5, "uint8"),
	},
]);
