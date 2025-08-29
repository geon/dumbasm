import { parseVariableLocation } from "../parseVariableLocation.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseVariableLocation", [
	{
		input: "not a variable location",
		parser: parseVariableLocation,
		result: failParsing(),
	},
	{
		input: "reg",
		parser: parseVariableLocation,
		result: {
			consumed: 3,
			parsed: "reg",
		},
	},
]);
