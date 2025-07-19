import { parseOneOrMore } from "../parseOneOrMore.js";
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
		name: "match",
		parser: parseOneOrMore(parseWhitespace),
		input: " \t\r\n\v\f",
		result: {
			consumed: 6,
			parsed: [" ", "\t", "\r", "\n", "\v", "\f"],
		},
	},
]);
