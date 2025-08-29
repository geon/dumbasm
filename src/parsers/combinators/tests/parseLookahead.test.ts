import { parseChar } from "../parseChar.js";
import { parseLookahead } from "../parseLookahead.js";
import { failParsing } from "../Parser.js";
import { testExamples } from "./testExamples.js";

testExamples("parseLookahead", [
	{
		name: "no match",
		parser: parseLookahead(parseChar("b")),
		input: "abc",
		result: failParsing(),
	},
	{
		name: "match",
		parser: parseLookahead(parseChar("a")),
		input: "abc",
		result: {
			consumed: 0,
			parsed: "a",
		},
	},
]);
