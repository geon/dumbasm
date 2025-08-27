import { parseOneOrMore, parseZeroOrMore } from "../parseSome.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";

testExamples<readonly string[]>("parseSome", [
	{
		name: "parseOneOrMore > match",
		parser: parseOneOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
	{
		name: "parseZeroOrMore > match",
		parser: parseZeroOrMore(parseChar("a")),
		input: "aabc",
		result: {
			consumed: 2,
			parsed: ["a", "a"],
		},
	},
]);
