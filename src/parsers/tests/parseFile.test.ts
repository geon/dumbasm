import { parseFile } from "../parseFile.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError } from "../combinators/Parser.js";

testExamples("parseFile", [
	{
		input: "nonsense",
		parser: parseFile,
		result: createParseError(0, "SYNTAX ERROR"),
	},
]);
