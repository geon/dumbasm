import { parseVariableLocation } from "../parseVariableLocation.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseVariableLocation", [
	{
		input: "not a variable location",
		parser: parseVariableLocation,
		result: createParseError(
			0,
			'No alternative matched.\n\tExpected string "regA".\n\tExpected string "regX".\n\tExpected string "regY".\n\tExpected string "reg".\n\tExpected string "zeroPage".',
		),
	},
	{
		input: "reg",
		parser: parseVariableLocation,
		result: createParseResult(3, "reg"),
	},
]);
