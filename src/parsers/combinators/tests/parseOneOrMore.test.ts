import { parseOneOrMore } from "../parseOneOrMore.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

testExamples("parseOneOrMore", [
	{
		name: "match",
		parser: parseOneOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
	{
		name: "no match",
		parser: parseOneOrMore(parseChar("b")),
		input: "abc",
		result: undefined,
	},
]);
