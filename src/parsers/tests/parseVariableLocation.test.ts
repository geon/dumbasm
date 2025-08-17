import { parseVariableLocation } from "../parseVariableLocation.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseVariableLocation", [
	{
		input: "not a variable location",
		parser: parseVariableLocation,
		result: undefined,
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
