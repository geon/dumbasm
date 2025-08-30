import { parseDumbasmScope } from "../parseDumbasmScope.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseDumbasmScope", [
	{
		input: "360 noscope",
		parser: parseDumbasmScope,
		result: createParseError(0, "Expected scope."),
	},
	{
		input: "{}",
		parser: parseDumbasmScope,
		result: createParseResult(2, []),
	},
	{
		name: "{\\n}",
		input: "{\n}",
		parser: parseDumbasmScope,
		result: createParseResult(3, []),
	},
	{
		name: "whitespace outside",
		input: " {} ",
		parser: parseDumbasmScope,
		result: createParseResult(4, []),
	},
	{
		input: "{} ; trailing comment",
		parser: parseDumbasmScope,
		result: createParseResult(21, []),
	},
]);
