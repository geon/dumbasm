import { parseIdentifier } from "../parseIdentifier.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseIdentifier", [
	{
		input: "#not an identifier",
		parser: parseIdentifier,
		result: failParsing(),
	},
]);
