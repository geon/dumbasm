import {
	parseVariableLoad,
	type ParsedVariableLoad,
} from "../parseVariableLoad.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples<ParsedVariableLoad>("parseVariableLoad", [
	{
		input: "not a load",
		parser: parseVariableLoad,
		result: createParseError(0, 'Expected string "ld".'),
	},
	{
		input: "ld myVariable #$ab",
		parser: parseVariableLoad,
		result: createParseResult(18, {
			variable: "myVariable",
			addressingMode: {
				type: "immediate",
				value: 0xab,
			},
		}),
	},
]);
