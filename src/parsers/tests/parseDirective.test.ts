import { parseDirective } from "../parseDirective.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseDirective", [
	{
		input: "not a directive",
		parser: parseDirective,
		result: createParseError(0, 'Expected char ".".'),
	},
	{
		input: ". lonely dot",
		parser: parseDirective,
		result: createParseError(1, "Expected an identifier"),
	},
	{
		input: ".byte $ad",
		parser: parseDirective,
		result: createParseResult(9, ".byte $ad"),
	},
	{
		name: "multiple lines",
		input: ".multiple\nlines",
		parser: parseDirective,
		result: createParseResult(9, ".multiple"),
	},
]);
