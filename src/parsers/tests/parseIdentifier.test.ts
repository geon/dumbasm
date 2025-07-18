import { parseIdentifier } from "../parseIdentifier.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { createParseError, createParseResult } from "../combinators/Parser.js";

testExamples("parseIdentifier", [
	{
		input: "#not an identifier",
		parser: parseIdentifier,
		result: createParseError(0, "Expected an identifier"),
	},
	{
		input: "hello world",
		parser: parseIdentifier,
		result: createParseResult(5, "hello"),
	},
	{
		input: "numberSuffix123",
		parser: parseIdentifier,
		result: createParseResult(15, "numberSuffix123"),
	},
]);
