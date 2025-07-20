import { parseWhitespace } from "../parseWhitespace.js";
import { testExamples } from "./testExamples.js";

testExamples("parseWhitespace", [
	{
		name: "no match",
		parser: parseWhitespace,
		input: "-",
		result: undefined,
	},
	{
		name: "match space",
		parser: parseWhitespace,
		input: " ",
		result: {
			consumed: 1,
			parsed: " ",
		},
	},
	{
		name: "match tab",
		parser: parseWhitespace,
		input: "\t",
		result: {
			consumed: 1,
			parsed: "\t",
		},
	},
]);
