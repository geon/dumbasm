import { parseOneOrMore, parseZeroOrMore } from "../parseSome.js";
import { parseChar } from "../parseChar.js";
import { testExamples } from "./testExamples.js";
import { createParseResult } from "../Parser.js";

testExamples<readonly string[]>("parseSome", [
	{
		name: "parseOneOrMore > match",
		parser: parseOneOrMore(parseChar("a")),
		input: "aabc",
		result: createParseResult(2, ["a", "a"]),
	},
	{
		name: "parseZeroOrMore > match",
		parser: parseZeroOrMore(parseChar("a")),
		input: "aabc",
		result: createParseResult(2, ["a", "a"]),
	},
]);
