import { parseDirective } from "../parseDirective.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseDirective", [
	{
		input: "not a directive",
		parser: parseDirective,
		result: undefined,
	},
	{
		input: ". lonly dot",
		parser: parseDirective,
		result: undefined,
	},
	{
		input: ".byte $ad",
		parser: parseDirective,
		result: {
			consumed: 9,
			parsed: ".byte $ad",
		},
	},
	{
		name: "multiple lines",
		input: ".multiple\nlines",
		parser: parseDirective,
		result: {
			consumed: 9,
			parsed: ".multiple",
		},
	},
]);
