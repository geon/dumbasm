import { parseFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseFile", [
	{
		input: "nonsense",
		parser: parseFile,
		result: createParseError(0, "SYNTAX ERROR"),
	},
	{
		name: "empty",
		input: "",
		parser: parseFile,
		result: createParseResult(0, []),
	},
]);
