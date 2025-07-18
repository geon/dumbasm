import { parseIdentifier } from "../parseIdentifier.js";
import { testExamples } from "../combinators/tests/testExamples.js";

testExamples("parseIdentifier", [
	{
		input: "#not an identifier",
		parser: parseIdentifier,
		result: undefined,
	},
	{
		input: "hello world",
		parser: parseIdentifier,
		result: {
			consumed: 5,
			parsed: "hello",
		},
	},
]);
