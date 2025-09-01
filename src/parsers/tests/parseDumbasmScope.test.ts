import { parseDumbasmScope } from "../parseDumbasmScope.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError } from "../combinators/Parser.js";

testExamples("parseDumbasmScope", [
	{
		input: "360 noscope",
		parser: parseDumbasmScope,
		result: createParseError(0, "Expected scope."),
	},
]);
