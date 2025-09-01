import { parseLabel } from "../parseLabel.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseLabel", [
	{
		input: "not a label",
		parser: parseLabel,
		result: createParseError(3, 'Expected char ":".'),
	},
	{
		input: "label: ; Code goes here",
		parser: parseLabel,
		result: createParseResult(6, "label"),
	},
]);
