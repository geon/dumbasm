import { parseIdentifier } from "../parseIdentifier.js";
import { testExamples } from "../combinators/tests/testExamples.js";
import { failParsing } from "../combinators/Parser.js";

testExamples("parseIdentifier", [
	{
		input: "#not an identifier",
		parser: parseIdentifier,
		result: failParsing(),
	},
	{
		input: "hello world",
		parser: parseIdentifier,
		result: {
			consumed: 5,
			parsed: "hello",
		},
	},
	{
		input: "numberSuffix123",
		parser: parseIdentifier,
		result: {
			consumed: 15,
			parsed: "numberSuffix123",
		},
	},
	{
		input: "123numberPrefix",
		parser: parseIdentifier,
		result: failParsing(),
	},
	{
		input: "x",
		parser: parseIdentifier,
		result: {
			consumed: 1,
			parsed: "x",
		},
	},
]);
