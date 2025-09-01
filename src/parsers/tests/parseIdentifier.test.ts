import { parseIdentifier } from "../parseIdentifier.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError } from "../combinators/Parser.js";

testExamples("parseIdentifier", [
	{
		input: "#not an identifier",
		parser: parseIdentifier,
		result: createParseError(0, "Expected an identifier"),
	},
]);
